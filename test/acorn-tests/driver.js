const assert = require('assert')
const { parse, AcornNode, AcornSourceLocation, AcornPosition } = require('../../dist/timus.min')

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

            let ast = parse(code, options)

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
                parse(code, options)
            } catch (error) {
                actualMsg = error.message
            }

            assert.equal(actualMsg, expectedMsg, code)
        })
    }
}

module.exports = {
    getTestRunner,
    getTestFailRunner
}
