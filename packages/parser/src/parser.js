import { Parser, tokTypes as tt } from 'acorn'

const { keywordTypes, lineBreak, isIdentifierChar } = Parser.acorn

function getRegExpWords(regex) {
    return regex.source
        .replace('^(?:', '')
        .replace(')$', '')
        .split('|')
        .map(w => w.trim())
}

function getLanguageWordsRegExp(jsWordsRegExp, lang) {
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
    if (!lang || !lang[jsWord])
        return [jsWord]
    const aux = lang[jsWord].split('|')
    return aux.map(langWord => langWord.trim())
}

export function getLanguageSynonym(jsWord, lang, alt = 0) {
    if (!lang || !lang[jsWord])
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
