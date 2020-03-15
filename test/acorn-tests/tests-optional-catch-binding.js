function run(lang) {
    const { getTestRunner } = require('./driver')
    const { getTestWords } = require('../utilities')

    const test = getTestRunner(lang)
    const testWords = getTestWords(lang)

    const { _catch, _try } = testWords

    const catchDiff = _catch.length - 'catch'.length
    const tryDiff = _try.length - 'try'.length

    test(`${_try} {} ${_catch} {}`, {
        type: 'Program',
        start: 0,
        end: 15 + tryDiff + catchDiff,
        body: [
            {
                type: 'TryStatement',
                start: 0,
                end: 15 + tryDiff + catchDiff,
                block: {
                    type: 'BlockStatement',
                    start: 4 + tryDiff,
                    end: 6 + tryDiff,
                    body: []
                },
                handler: {
                    type: 'CatchClause',
                    start: 7 + tryDiff,
                    end: 15 + tryDiff + catchDiff,
                    param: null,
                    body: {
                        type: 'BlockStatement',
                        start: 13 + tryDiff + catchDiff,
                        end: 15 + tryDiff + catchDiff,
                        body: []
                    }
                },
                finalizer: null
            }
        ],
        sourceType: 'script'
    }, { ecmaVersion: 10 })

}

module.exports = { run }
