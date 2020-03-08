import {
    Parser,
    tokTypes as tt,
    lineBreak,
    isIdentifierChar,
    keywordTypes
} from 'acorn'

export {
    Node as AcornNode,
    SourceLocation as AcornSourceLocation,
    Position as AcornPosition
} from 'acorn'

function getRegExpWords(regex) {
    return regex.source
        .replace('^(?:', '')
        .replace(')$', '')
        .split('|')
        .map(w => w.trim())
}

export function getLanguageWordsRegExp(jsWordsRegExp, lang) {
    if (!lang)
        return jsWordsRegExp

    const originalWords = getRegExpWords(jsWordsRegExp)
    let words = ''
    for (const jsWord of originalWords) {
        if (jsWord in lang) {
            const synonyms = getLanguageSynonyms(jsWord, lang)
            for (const syn of synonyms)
                words += ' ' + syn
        } else {
            words += ' ' + jsWord // keep the original word
        }
    }

    words = words.trim()
    return new RegExp('^(?:' + words.replace(/ /g, '|') + ')$')
}

export function getLanguageSynonyms(jsWord, lang) {
    if (!lang || !lang.hasOwnProperty(jsWord))
        return [jsWord]
    const aux = lang[jsWord].split('|')
    return aux.map(langWord => langWord.trim())
}

export function getLanguageSynonym(jsWord, lang, alt = 0) {
    if (!lang || !lang.hasOwnProperty(jsWord))
        return jsWord
    const aux = lang[jsWord].split('|')
    return aux.map(langWord => langWord.trim())[alt] || jsWord
}

export function getJavaScriptSynonym(langWord, lang) {
    if (!lang)
        return
    for (const jsWord of Object.keys(lang))
        if (areSynonyms(langWord, jsWord, lang))
            return jsWord
}

export function areSynonyms(langWord, jsWord, lang) {
    if (langWord === jsWord)
        return true
    if (!lang)
        return false
    const synonyms = getLanguageSynonyms(jsWord, lang)
    if (synonyms.includes(langWord))
        return true
    return false
}

export class TimusParser extends Parser {
    constructor(code, options = {}) {
        super(options, code)
        if (options.language)
            this.setLanguage(options.language)
    }

    setLanguage(lang) {
        this.options.language = lang
        this.keywords = getLanguageWordsRegExp(this.keywords, lang)
        this.reservedWords = getLanguageWordsRegExp(this.reservedWords, lang)
        this.reservedWordsStrict = getLanguageWordsRegExp(this.reservedWordsStrict, lang)
        this.reservedWordsStrictBind = getLanguageWordsRegExp(this.reservedWordsStrictBind, lang)
    }

    readWord() {
        const lang = this.options.language
        if (!lang)
            return super.readWord()

        let word = this.readWord1()
        let type = tt.name
        if (this.keywords.test(word)) {
            if (this.containsEsc)
                this.raiseRecoverable(this.start, 'Escape sequence in keyword ' + word)
            word = getJavaScriptSynonym(word, lang) || word // translate it to JavaScript
            type = keywordTypes[word]
        }

        return this.finishToken(type, word)
    }

    isContextual(name) {
        const lang = this.options.language
        if (!lang)
            return super.isContextual(name)
        return this.type === tt.name && areSynonyms(this.value, name, lang) && !this.containsEsc
    }

    isAsyncFunction() {
        const lang = this.options.language
        if (!lang)
            return super.isAsyncFunction()

        if (this.options.ecmaVersion < 8 || !this.isContextual('async'))
            return false

        const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g

        skipWhiteSpace.lastIndex = this.pos
        let skip = skipWhiteSpace.exec(this.input)
        let next = this.pos + skip[0].length

        // check for multiple 'function' synonyms
        const fnSynonyms = getLanguageSynonyms('function', lang)
        const fnSynonym = fnSynonyms.find(syn => {
            const val = this.input.slice(next, next + syn.length)
            return val === syn
        })

        return !lineBreak.test(this.input.slice(this.pos, next))
            && !!fnSynonym
            && (next + fnSynonym.length === this.input.length || !isIdentifierChar(+this.input.charAt(next + fnSynonym.length)))
    }

    parseClassElement(constructorAllowsSuper) {
        const lang = this.options.language
        if (!lang)
            return super.parseClassElement(constructorAllowsSuper)

        if (this.eat(tt.semi)) return null

        let method = this.startNode()
        const tryContextual = (k, noLineBreak = false) => {
            const start = this.start, startLoc = this.startLoc
            if (!this.eatContextual(k))
                return false
            if (this.type !== tt.parenL && (!noLineBreak || !this.canInsertSemicolon()))
                return true
            if (method.key)
                this.unexpected()
            method.computed = false
            method.key = this.startNodeAt(start, startLoc)
            method.key.name = k
            this.finishNode(method.key, 'Identifier')
            return false
        }

        method.kind = 'method'
        method.static = tryContextual('static')
        let isGenerator = this.eat(tt.star)
        let isAsync = false
        if (!isGenerator) {
            if (this.options.ecmaVersion >= 8 && tryContextual('async', true)) {
                isAsync = true
                isGenerator = this.options.ecmaVersion >= 9 && this.eat(tt.star)
            } else if (tryContextual('get')) {
                method.kind = 'get'
            } else if (tryContextual('set')) {
                method.kind = 'set'
            }
        }
        if (!method.key) this.parsePropertyName(method)
        let { key } = method
        let allowsDirectSuper = false

        if (!method.computed && !method.static && (key.type === 'Identifier' && areSynonyms(key.name, 'constructor', lang) ||
            key.type === 'Literal' && areSynonyms(key.value, 'constructor', lang))) {
            if (method.kind !== 'method')
                this.raise(key.start, 'Constructor can\'t have get/set modifier')
            if (isGenerator)
                this.raise(key.start, 'Constructor can\'t be a generator')
            if (isAsync)
                this.raise(key.start, 'Constructor can\'t be an async method')
            method.kind = 'constructor'
            allowsDirectSuper = constructorAllowsSuper
        } else if (method.static && key.type === 'Identifier' && areSynonyms(key.name, 'prototype', lang)) {
            this.raise(key.start, 'Classes may not have a static property named prototype')
        }
        this.parseClassMethod(method, isGenerator, isAsync, allowsDirectSuper)
        if (method.kind === 'get' && method.value.params.length !== 0)
            this.raiseRecoverable(method.value.start, 'getter should have no params')
        if (method.kind === 'set' && method.value.params.length !== 1)
            this.raiseRecoverable(method.value.start, 'setter should have exactly one param')
        if (method.kind === 'set' && method.value.params[0].type === 'RestElement')
            this.raiseRecoverable(method.value.params[0].start, 'Setter cannot use rest params')
        return method
    }

    parseIdent(liberal, isBinding) {
        const lang = this.options.language
        if (!lang)
            return super.parseIdent(liberal, isBinding)

        let node = this.startNode()
        if (this.type === tt.name) {
            node.name = this.value
        } else if (this.type.keyword) {
            node.name = getLanguageSynonym(this.type.keyword, lang)

            // To fix https://github.com/acornjs/acorn/issues/575
            // `class` and `function` keywords push new context into this.context.
            // But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
            // If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
            if ((areSynonyms(node.name, 'class', lang) || areSynonyms(node.name, 'function', lang)) &&
                (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
                this.context.pop()
            }
        } else {
            this.unexpected()
        }

        this.next()
        this.finishNode(node, 'Identifier')
        if (!liberal) {
            this.checkUnreserved(node)
            if (areSynonyms(node.name, 'await', lang) && !this.awaitIdentPos)
                this.awaitIdentPos = node.start
        }
        return node
    }

    checkUnreserved({ start, end, name }) {
        const lang = this.options.language
        if (!lang) {
            super.checkUnreserved({ start, end, name })
            return
        }

        if (this.inGenerator && areSynonyms(name, 'yield', lang))
            this.raiseRecoverable(start, 'Cannot use \'yield\' as identifier inside a generator')
        if (this.inAsync && areSynonyms(name, 'await', lang))
            this.raiseRecoverable(start, 'Cannot use \'await\' as identifier inside an async function')
        if (this.keywords.test(name))
            this.raise(start, `Unexpected keyword '${name}'`)
        if (this.options.ecmaVersion < 6 &&
            this.input.slice(start, end).indexOf('\\') !== -1) return
        const re = this.strict ? this.reservedWordsStrict : this.reservedWords
        if (re.test(name)) {
            if (!this.inAsync && areSynonyms(name, 'await', lang))
                this.raiseRecoverable(start, 'Cannot use keyword \'await\' outside an async function')
            this.raiseRecoverable(start, `The keyword '${name}' is reserved`)
        }
    }

    parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
        const lang = this.options.language
        if (!lang)
            return super.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc)

        if ((isGenerator || isAsync) && this.type === tt.colon)
            this.unexpected()

        if (this.eat(tt.colon)) {
            prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors)
            prop.kind = 'init'
        } else if (this.options.ecmaVersion >= 6 && this.type === tt.parenL) {
            if (isPattern) this.unexpected()
            prop.kind = 'init'
            prop.method = true
            prop.value = this.parseMethod(isGenerator, isAsync)
        } else if (!isPattern && !containsEsc &&
            this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === 'Identifier' &&
            (areSynonyms(prop.key.name, 'get', lang) || areSynonyms(prop.key.name, 'set', lang)) &&
            (this.type !== tt.comma && this.type !== tt.braceR)) {
            if (isGenerator || isAsync)
                this.unexpected()

            // keep kind without translations
            prop.kind = getJavaScriptSynonym(prop.key.name, lang) || prop.key.name

            this.parsePropertyName(prop)
            prop.value = this.parseMethod(false)
            let paramCount = prop.kind === 'get' ? 0 : 1
            if (prop.value.params.length !== paramCount) {
                let start = prop.value.start
                if (prop.kind === 'get')
                    this.raiseRecoverable(start, 'getter should have no params')
                else
                    this.raiseRecoverable(start, 'setter should have exactly one param')
            } else {
                if (prop.kind === 'set' && prop.value.params[0].type === 'RestElement')
                    this.raiseRecoverable(prop.value.params[0].start, 'Setter cannot use rest params')
            }
        } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === 'Identifier') {
            if (isGenerator || isAsync) this.unexpected()
            this.checkUnreserved(prop.key)
            if (areSynonyms(prop.key.name, 'await', lang) && !this.awaitIdentPos)
                this.awaitIdentPos = startPos
            prop.kind = 'init'
            if (isPattern) {
                prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key)
            } else if (this.type === tt.eq && refDestructuringErrors) {
                if (refDestructuringErrors.shorthandAssign < 0)
                    refDestructuringErrors.shorthandAssign = this.start
                prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key)
            } else {
                prop.value = prop.key
            }
            prop.shorthand = true
        } else this.unexpected()
    }

    parseExprAtom(refDestructuringErrors) {
        const lang = this.options.language
        if (!lang)
            return super.parseExprAtom(refDestructuringErrors)

        let canBeArrow = this.potentialArrowAt === this.start
        let node
        switch (this.type) {
            case tt.name:
                let startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc
                let id = this.parseIdent(false)
                if (this.options.ecmaVersion >= 8 && !containsEsc && areSynonyms(id.name, 'async', lang) && !this.canInsertSemicolon() && this.eat(tt._function))
                    return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true)
                if (canBeArrow && !this.canInsertSemicolon()) {
                    if (this.eat(tt.arrow))
                        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false)
                    if (this.options.ecmaVersion >= 8 && areSynonyms(id.name, 'async', lang) && this.type === tt.name && !containsEsc) {
                        id = this.parseIdent(false)
                        if (this.canInsertSemicolon() || !this.eat(tt.arrow))
                            this.unexpected()
                        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true)
                    }
                }
                return id
            case tt._null:
            case tt._true:
            case tt._false:
                node = this.startNode()
                node.value = this.type === tt._null
                    ? null
                    : this.type === tt._true
                // In the original the raw property is the keyword.
                // Here we want it to be the synonym
                node.raw = this.input.slice(this.start, this.end)
                this.next()
                return this.finishNode(node, 'Literal')
            default:
                return super.parseExprAtom(refDestructuringErrors)
        }
    }

    parseSubscripts(base, startPos, startLoc, noCalls) {
        const lang = this.options.language
        if (!lang)
            return super.parseSubscripts(base, startPos, startLoc, noCalls)

        let maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === 'Identifier' && areSynonyms(base.name, 'async', lang) &&
            this.lastTokEnd === base.end && !this.canInsertSemicolon() && areSynonyms(this.input.slice(base.start, base.end), 'async', lang)
        while (true) {
            let element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow)
            if (element === base || element.type === 'ArrowFunctionExpression') return element
            base = element
        }
    }

    isAsyncProp(prop) {
        const lang = this.options.language
        if (!lang)
            return super.isAsyncProp(prop)

        return !prop.computed && prop.key.type === 'Identifier' && areSynonyms(prop.key.name, 'async', lang) &&
            (this.type === tt.name || this.type === tt.num || this.type === tt.string || this.type === tt.bracketL || this.type.keyword || (this.options.ecmaVersion >= 9 && this.type === tt.star)) &&
            !lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
    }

    static parse(input, options) {
        return new this(input, options).parse()
    }

    static tokenizer(input, options) {
        return new this(input, options)
    }
}
