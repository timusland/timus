function run(lang) {
    const { getTestRunner, getTestFailRunner, getTestWords } = require('./driver')

    const test = getTestRunner(lang)
    const testFail = getTestFailRunner(lang)
    const testWords = getTestWords(lang)

    const { _await, _function, _return } = testWords

    // To make it easier dealing with positions we also
    // get the words diff.
    const awaitDiff = _await.length - 'await'.length
    const functionDiff = _function.length - 'function'.length
    const returnDiff = _return.length - 'return'.length

    testFail(`${_await} 1`, `Unexpected token (1:${6 + awaitDiff})`, {
        ecmaVersion: 8
    })

    test(`${_await} 1`, {
        type: 'Program',
        start: 0,
        end: 7 + awaitDiff,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 7 + awaitDiff,
                expression: {
                    type: 'AwaitExpression',
                    start: 0,
                    end: 7 + awaitDiff,
                    argument: {
                        type: 'Literal',
                        start: 6 + awaitDiff,
                        end: 7 + awaitDiff,
                        value: 1,
                        raw: '1'
                    }
                }
            }
        ]
    }, { allowAwaitOutsideFunction: true, ecmaVersion: 8 })

    testFail(`${_function} foo() {${_return} ${_await} 1}`, `Unexpected token (1:${29 + functionDiff + returnDiff + awaitDiff})`, {
        ecmaVersion: 8
    })

    testFail(`${_function} foo() {${_return} ${_await} 1}`, `Unexpected token (1:${29 + functionDiff + returnDiff + awaitDiff})`, {
        allowAwaitOutsideFunction: true,
        ecmaVersion: 8
    })
}

module.exports = { run }
