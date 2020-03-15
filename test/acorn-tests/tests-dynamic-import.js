function run(lang) {
    const { getTestRunner, getTestFailRunner } = require('./driver')
    const { getTestWords } = require('../utilities')

    const test = getTestRunner(lang)
    const testFail = getTestFailRunner(lang)
    const testWords = getTestWords(lang)

    const { _function, _import, _new, _return, _var, _yield } = testWords

    const functionDiff = _function.length - 'function'.length
    const importDiff = _import.length - 'import'.length
    const newDiff = _new.length - 'new'.length
    const returnDiff = _return.length - 'return'.length
    const varDiff = _var.length - 'var'.length
    const yieldDiff = _yield.length - 'yield'.length

    test(`${_import}('dynamicImport.js')`, {
        type: 'Program',
        start: 0,
        end: 26 + importDiff,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 26 + importDiff,
                expression: {
                    type: 'ImportExpression',
                    start: 0,
                    end: 26 + importDiff,
                    source: {
                        type: 'Literal',
                        start: 7 + importDiff,
                        end: 25 + importDiff,
                        value: 'dynamicImport.js',
                        raw: "'dynamicImport.js'"
                    }
                }
            }
        ],
        sourceType: 'script'
    }, { ecmaVersion: 11 })

    // Assignment is OK.
    test(`${_import}(a = 'dynamicImport.js')`, {
        type: 'Program',
        start: 0,
        end: 30 + importDiff,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 30 + importDiff,
                expression: {
                    type: 'ImportExpression',
                    start: 0,
                    end: 30 + importDiff,
                    source: {
                        type: 'AssignmentExpression',
                        start: 7 + importDiff,
                        end: 29 + importDiff,
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            start: 7 + importDiff,
                            end: 8 + importDiff,
                            name: 'a'
                        },
                        right: {
                            type: 'Literal',
                            start: 11 + importDiff,
                            end: 29 + importDiff,
                            value: 'dynamicImport.js',
                            raw: "'dynamicImport.js'"
                        }
                    }
                }
            }
        ],
        sourceType: 'script'
    }, { ecmaVersion: 11 })

    test(`${_function}* a() { ${_yield} ${_import}('http'); }`, {
        type: 'Program',
        start: 0,
        end: 39 + functionDiff + yieldDiff + importDiff,
        body: [
            {
                type: 'FunctionDeclaration',
                start: 0,
                end: 39 + functionDiff + yieldDiff + importDiff,
                id: {
                    type: 'Identifier',
                    start: 10 + functionDiff,
                    end: 11 + functionDiff,
                    name: 'a'
                },
                expression: false,
                generator: true,
                async: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    start: 14 + functionDiff,
                    end: 39 + functionDiff + yieldDiff + importDiff,
                    body: [
                        {
                            type: 'ExpressionStatement',
                            start: 16 + functionDiff,
                            end: 37 + functionDiff + yieldDiff + importDiff,
                            expression: {
                                type: 'YieldExpression',
                                start: 16 + functionDiff,
                                end: 36 + functionDiff + yieldDiff + importDiff,
                                delegate: false,
                                argument: {
                                    type: 'ImportExpression',
                                    start: 22 + functionDiff + yieldDiff,
                                    end: 36 + functionDiff + yieldDiff + importDiff,
                                    source: {
                                        type: 'Literal',
                                        start: 29 + functionDiff + yieldDiff + importDiff,
                                        end: 35 + functionDiff + yieldDiff + importDiff,
                                        value: 'http',
                                        raw: "'http'"
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ],
        sourceType: 'script'
    }, { ecmaVersion: 11 })

    // `new import(s)` is syntax error, but `new (import(s))` is not.
    test(`${_new} (${_import}(s))`, {
        type: 'Program',
        start: 0,
        end: 15 + newDiff + importDiff,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 15 + newDiff + importDiff,
                expression: {
                    type: 'NewExpression',
                    start: 0,
                    end: 15 + newDiff + importDiff,
                    callee: {
                        type: 'ImportExpression',
                        start: 5 + newDiff,
                        end: 14 + newDiff + importDiff,
                        source: {
                            type: 'Identifier',
                            start: 12 + newDiff + importDiff,
                            end: 13 + newDiff + importDiff,
                            name: 's'
                        }
                    },
                    arguments: []
                }
            }
        ],
        sourceType: 'script'
    }, { ecmaVersion: 11 })

    // `import(s,t)` is syntax error, but `import((s,t))` is not.
    test(`${_import}((s,t))`, {
        type: 'Program',
        start: 0,
        end: 13 + importDiff,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 13 + importDiff,
                expression: {
                    type: 'ImportExpression',
                    start: 0,
                    end: 13 + importDiff,
                    source: {
                        type: 'SequenceExpression',
                        start: 8 + importDiff,
                        end: 11 + importDiff,
                        expressions: [
                            {
                                type: 'Identifier',
                                start: 8 + importDiff,
                                end: 9 + importDiff,
                                name: 's'
                            },
                            {
                                type: 'Identifier',
                                start: 10 + importDiff,
                                end: 11 + importDiff,
                                name: 't'
                            }
                        ]
                    }
                }
            }
        ],
        sourceType: 'script'
    }, { ecmaVersion: 11 })

    testFail(`${_function} failsParse() { ${_return} ${_import}.then(); }`, `Unexpected token (1:${37 + functionDiff + returnDiff + importDiff})`, {
        ecmaVersion: 11
    })

    testFail(`${_var} dynImport = ${_import}; dynImport('http');`, `Unexpected token (1:${22 + varDiff + importDiff})`, {
        ecmaVersion: 11
    })

    testFail(`${_import}('test.js')`, `Unexpected token (1:${6 + importDiff})`, {
        ecmaVersion: 10,
        sourceType: 'module'
    })

    testFail(`${_import}()`, `Unexpected token (1:${7 + importDiff})`, {
        ecmaVersion: 11
    })

    testFail(`${_import}(a, b)`, `Unexpected token (1:${8 + importDiff})`, {
        ecmaVersion: 11
    })

    testFail(`${_import}(...[a])`, `Unexpected token (1:${7 + importDiff})`, {
        ecmaVersion: 11
    })

    testFail(`${_import}(source,)`, `Trailing comma is not allowed in import() (1:${13 + importDiff})`, {
        ecmaVersion: 11
    })

    testFail(`${_new} ${_import}(source)`, `Cannot use new with import() (1:${4 + newDiff})`, {
        ecmaVersion: 11
    })

    testFail(`(${_import})(s)`, `Unexpected token (1:${7 + importDiff})`, {
        ecmaVersion: 11
    })

}

module.exports = { run }
