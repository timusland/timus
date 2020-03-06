const assert = require('assert')
const {
    TimusParser,
    getLanguageSynonym,
    AcornNode,
    AcornSourceLocation,
    AcornPosition
} = require('../../dist/timus-parser')

function walkObject(object, callback) {
    for (const key in object) {
        callback(key, object[key], object)
        const prop = object[key]
        if (typeof prop === 'object' && prop !== null)
            walkObject(prop, callback)
    }
}

function isObject(value) {
    return typeof value === 'object'
        && value !== null
        && Array.isArray(value) === false
}

function isEmptyObject(object) {
    return Object.keys(object).length === 0
}

// The expected AST is an ordinary object. The real AST is
// a Node instance. In order to compare them, we need to set all
// objects to ordinary objects, otherwise we will get a deepStrictEqual
// assertion error.
function mapAstToTest(ast, { locations }) {
    if (locations) {
        delete ast.start
        delete ast.end
    }

    if (!ast.sourceType)
        ast.sourceType = 'script'

    walkObject(ast, (key, prop, object) => {
        if (!isObject(prop))
            return

        if (locations && key !== 'loc') {
            delete prop.start
            delete prop.end
        }

        // For some reason they did not put
        // the locations object `loc` here.
        // To facilitate our implementation we will
        // also remove it from the result for now.
        if ('kind' in prop)
            delete prop.loc

        const shouldChange = prop instanceof AcornNode
            || prop instanceof AcornSourceLocation
            || prop instanceof AcornPosition
        if (shouldChange)
            object[key] = Object.assign({}, prop)
    })

    return Object.assign({}, ast)
}

function getTestRunner(language) {
    return (code, expectedAst, options = { locations: true }) => {
        it('should parse: ' + code, () => {
            options = {
                language,
                ecmaVersion: 5,
                ...options
            }

            let ast = TimusParser.parse(code, options)

            // just checking if it parses without errors
            if (isEmptyObject(expectedAst))
                return

            ast = mapAstToTest(ast, options)
            expectedAst = mapAstToTest(expectedAst, options)
            assert.deepStrictEqual(ast, expectedAst, code)
        })
    }
}

function getTestFailRunner(language) {
    return (code, expectedMsg, options = { locations: true }) => {
        it('should fail: ' + code, () => {
            options = {
                language,
                ecmaVersion: 5,
                ...options
            }
            let actualMsg = ''
            try {
                TimusParser.parse(code, options)
            } catch (error) {
                actualMsg = error.message
            }

            assert.equal(actualMsg, expectedMsg, code)
        })
    }
}

function getTestWords(lang) {
    return {
        // Some words are not keywords but we wanted to translate
        // them anyway for testing.
        _Object: getLanguageSynonym('Object', lang),

        _arguments: getLanguageSynonym('arguments', lang),
        _await: getLanguageSynonym('await', lang),

        _break: getLanguageSynonym('break', lang),

        _case: getLanguageSynonym('case', lang),
        _catch: getLanguageSynonym('catch', lang),
        _continue: getLanguageSynonym('continue', lang),

        _debugger: getLanguageSynonym('debugger', lang),
        _default: getLanguageSynonym('default', lang),
        _delete: getLanguageSynonym('delete', lang),
        _do: getLanguageSynonym('do', lang),

        _else: getLanguageSynonym('else', lang),
        _eval: getLanguageSynonym('eval', lang),

        _false: getLanguageSynonym('false', lang),
        _finally: getLanguageSynonym('finally', lang),
        _for: getLanguageSynonym('for', lang),
        _function: getLanguageSynonym('function', lang),

        _get: getLanguageSynonym('get', lang),

        _if: getLanguageSynonym('if', lang),
        _implements: getLanguageSynonym('implements', lang),
        _import: getLanguageSynonym('import', lang),
        _in: getLanguageSynonym('in', lang),
        _instanceof: getLanguageSynonym('instanceof', lang),
        _interface: getLanguageSynonym('interface', lang),

        _let: getLanguageSynonym('let', lang),

        _new: getLanguageSynonym('new', lang),
        _null: getLanguageSynonym('null', lang),

        _package: getLanguageSynonym('package', lang),
        _private: getLanguageSynonym('private', lang),
        _protected: getLanguageSynonym('protected', lang),
        _public: getLanguageSynonym('public', lang),

        _return: getLanguageSynonym('return', lang),

        _set: getLanguageSynonym('set', lang),
        _static: getLanguageSynonym('static', lang),
        _switch: getLanguageSynonym('switch', lang),

        _this: getLanguageSynonym('this', lang),
        _throw: getLanguageSynonym('throw', lang),
        _true: getLanguageSynonym('true', lang),
        _try: getLanguageSynonym('try', lang),
        _typeof: getLanguageSynonym('typeof', lang),

        _var: getLanguageSynonym('var', lang),
        _void: getLanguageSynonym('void', lang),

        _while: getLanguageSynonym('while', lang),
        _with: getLanguageSynonym('with', lang)
    }
}

module.exports = {
    getTestRunner,
    getTestFailRunner,
    getTestWords
}
