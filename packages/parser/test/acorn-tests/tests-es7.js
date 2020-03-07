// Tests for ECMAScript 7 syntax changes
function run(lang) {
    const { getTestRunner, getTestFailRunner, getTestWords } = require('./driver')

    const test = getTestRunner(lang)
    const testFail = getTestFailRunner(lang)
    const testWords = getTestWords(lang)

    const { _delete, _else, _function, _if, _return, _typeof, _void } = testWords

    const deleteDiff = _delete.length - 'delete'.length
    const elseDiff = _else.length - 'else'.length
    const functionDiff = _function.length - 'function'.length
    const ifDiff = _if.length - 'if'.length
    const returnDiff = _return.length - 'return'.length
    const typeofDiff = _typeof.length - 'typeof'.length
    const voidDiff = _void.length - 'void'.length

    test('x **= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '**=',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    right: {
                        type: 'Literal',
                        raw: '42',
                        value: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            }
        ],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 8
            }
        }
    }, {
        ecmaVersion: 7,
        locations: true
    })

    testFail('x **= 42', 'Unexpected token (1:3)', { ecmaVersion: 6 })

    test('x ** y', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        }
                    },
                    operator: '**',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                }
            }
        ],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 6
            }
        }
    }, {
        ecmaVersion: 7,
        locations: true
    })

    testFail('x ** y', 'Unexpected token (1:3)', { ecmaVersion: 6 })

    // ** has highest precedence
    test('3 ** 5 * 1', {
        type: 'Program',
        start: 0,
        end: 10,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 10,
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 10,
                    left: {
                        type: 'BinaryExpression',
                        start: 0,
                        end: 6,
                        left: {
                            type: 'Literal',
                            start: 0,
                            end: 1,
                            value: 3,
                            raw: '3'
                        },
                        operator: '**',
                        right: {
                            type: 'Literal',
                            start: 5,
                            end: 6,
                            value: 5,
                            raw: '5'
                        }
                    },
                    operator: '*',
                    right: {
                        type: 'Literal',
                        start: 9,
                        end: 10,
                        value: 1,
                        raw: '1'
                    }
                }
            }
        ]
    }, {
        ecmaVersion: 7,
    })

    test('3 % 5 ** 1', {
        type: 'Program',
        start: 0,
        end: 10,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 10,
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 10,
                    left: {
                        type: 'Literal',
                        start: 0,
                        end: 1,
                        value: 3,
                        raw: '3'
                    },
                    operator: '%',
                    right: {
                        type: 'BinaryExpression',
                        start: 4,
                        end: 10,
                        left: {
                            type: 'Literal',
                            start: 4,
                            end: 5,
                            value: 5,
                            raw: '5'
                        },
                        operator: '**',
                        right: {
                            type: 'Literal',
                            start: 9,
                            end: 10,
                            value: 1,
                            raw: '1'
                        }
                    }
                }
            }
        ]
    }, {
        ecmaVersion: 7,
    })

    // Disallowed unary ops
    testFail(`${_delete} o.p ** 2;`, `Unexpected token (1:${11 + deleteDiff})`, { ecmaVersion: 7 })
    testFail(`${_void} 2 ** 2;`, `Unexpected token (1:${7 + voidDiff})`, { ecmaVersion: 7 })
    testFail(`${_typeof} 2 ** 2;`, `Unexpected token (1:${9 + typeofDiff})`, { ecmaVersion: 7 })
    testFail('~3 ** 2;', 'Unexpected token (1:3)', { ecmaVersion: 7 })
    testFail('!1 ** 2;', 'Unexpected token (1:3)', { ecmaVersion: 7 })
    testFail('-2** 2;', 'Unexpected token (1:2)', { ecmaVersion: 7 })
    testFail('+2** 2;', 'Unexpected token (1:2)', { ecmaVersion: 7 })

    // make sure base operand check doesn't affect other operators
    test('-a * 5', {
        type: 'Program',
        start: 0,
        end: 6,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 6,
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 6,
                    left: {
                        type: 'UnaryExpression',
                        start: 0,
                        end: 2,
                        operator: '-',
                        prefix: true,
                        argument: {
                            type: 'Identifier',
                            start: 1,
                            end: 2,
                            name: 'a'
                        }
                    },
                    operator: '*',
                    right: {
                        type: 'Literal',
                        start: 5,
                        end: 6,
                        value: 5,
                        raw: '5'
                    }
                }
            }
        ]
    }, { ecmaVersion: 6 })


    test('(-5) ** y', {
        type: 'Program',
        start: 0,
        end: 9,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 9,
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 9,
                    left: {
                        type: 'UnaryExpression',
                        start: 1,
                        end: 3,
                        operator: '-',
                        prefix: true,
                        argument: {
                            type: 'Literal',
                            start: 2,
                            end: 3,
                            value: 5,
                            raw: '5'
                        }
                    },
                    operator: '**',
                    right: {
                        type: 'Identifier',
                        start: 8,
                        end: 9,
                        name: 'y'
                    }
                }
            }
        ]
    }, {
        ecmaVersion: 7
    })

    test('++a ** 2', {
        type: 'Program',
        start: 0,
        end: 8,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 8,
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 8,
                    left: {
                        type: 'UpdateExpression',
                        start: 0,
                        end: 3,
                        operator: '++',
                        prefix: true,
                        argument: {
                            type: 'Identifier',
                            start: 2,
                            end: 3,
                            name: 'a'
                        }
                    },
                    operator: '**',
                    right: {
                        type: 'Literal',
                        start: 7,
                        end: 8,
                        value: 2,
                        raw: '2'
                    }
                }
            }
        ]
    }, { ecmaVersion: 7 })

    test('a-- ** 2', {
        type: 'Program',
        start: 0,
        end: 8,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 8,
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 8,
                    left: {
                        type: 'UpdateExpression',
                        start: 0,
                        end: 3,
                        operator: '--',
                        prefix: false,
                        argument: {
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            name: 'a'
                        }
                    },
                    operator: '**',
                    right: {
                        type: 'Literal',
                        start: 7,
                        end: 8,
                        value: 2,
                        raw: '2'
                    }
                }
            }
        ]
    }, { ecmaVersion: 7 })

    testFail('x %* y', 'Unexpected token (1:3)', { ecmaVersion: 7 })

    testFail('x %*= y', 'Unexpected token (1:3)', { ecmaVersion: 7 })

    testFail(`${_function} foo(a=2) { 'use strict'; }`, `Illegal 'use strict' directive in function with non-simple parameter list (1:0)`, { ecmaVersion: 7 })
    testFail('(a=2) => { \'use strict\'; }', 'Illegal \'use strict\' directive in function with non-simple parameter list (1:0)', { ecmaVersion: 7 })
    testFail(`${_function} foo({a}) { 'use strict'; }`, 'Illegal \'use strict\' directive in function with non-simple parameter list (1:0)', { ecmaVersion: 7 })
    testFail('({a}) => { \'use strict\'; }', 'Illegal \'use strict\' directive in function with non-simple parameter list (1:0)', { ecmaVersion: 7 })
    test(`${_function} foo(a) { 'use strict'; }`, {}, { ecmaVersion: 7 })

    // Tests for B.3.4 FunctionDeclarations in IfStatement Statement Clauses
    test(`${_if} (x) ${_function} f() {}`, {
        type: 'Program',
        start: 0,
        end: 22 + ifDiff + functionDiff,
        body: [
            {
                type: 'IfStatement',
                start: 0,
                end: 22 + ifDiff + functionDiff,
                test: {
                    type: 'Identifier',
                    start: 4 + ifDiff,
                    end: 5 + ifDiff,
                    name: 'x'
                },
                consequent: {
                    type: 'FunctionDeclaration',
                    start: 7 + ifDiff,
                    end: 22 + ifDiff + functionDiff,
                    id: {
                        type: 'Identifier',
                        start: 16 + ifDiff + functionDiff,
                        end: 17 + ifDiff + functionDiff,
                        name: 'f'
                    },
                    expression: false,
                    generator: false,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        start: 20 + ifDiff + functionDiff,
                        end: 22 + ifDiff + functionDiff,
                        body: []
                    }
                },
                alternate: null
            }
        ]
    }, { ecmaVersion: 7 })

    test(`${_if} (x) ${_function} f() { ${_return} 23; } ${_else} ${_function} f() { ${_return} 42; }`, {
        type: 'Program',
        start: 0,
        end: 67 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff + returnDiff,
        body: [
            {
                type: 'IfStatement',
                start: 0,
                end: 67 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff + returnDiff,
                test: {
                    type: 'Identifier',
                    start: 4 + ifDiff,
                    end: 5 + ifDiff,
                    name: 'x'
                },
                consequent: {
                    type: 'FunctionDeclaration',
                    start: 7 + ifDiff,
                    end: 34 + ifDiff + functionDiff + returnDiff,
                    id: {
                        type: 'Identifier',
                        start: 16 + ifDiff + functionDiff,
                        end: 17 + ifDiff + functionDiff,
                        name: 'f'
                    },
                    expression: false,
                    generator: false,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        start: 20 + ifDiff + functionDiff,
                        end: 34 + ifDiff + functionDiff + returnDiff,
                        body: [
                            {
                                type: 'ReturnStatement',
                                start: 22 + ifDiff + functionDiff,
                                end: 32 + ifDiff + functionDiff + returnDiff,
                                argument: {
                                    type: 'Literal',
                                    start: 29 + ifDiff + functionDiff + returnDiff,
                                    end: 31 + ifDiff + functionDiff + returnDiff,
                                    value: 23,
                                    raw: '23'
                                }
                            }
                        ]
                    }
                },
                alternate: {
                    type: 'FunctionDeclaration',
                    start: 40 + ifDiff + functionDiff + returnDiff + elseDiff,
                    end: 67 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff + returnDiff,
                    id: {
                        type: 'Identifier',
                        start: 49 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff,
                        end: 50 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff,
                        name: 'f'
                    },
                    expression: false,
                    generator: false,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        start: 53 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff,
                        end: 67 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff + returnDiff,
                        body: [
                            {
                                type: 'ReturnStatement',
                                start: 55 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff,
                                end: 65 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff + returnDiff,
                                argument: {
                                    type: 'Literal',
                                    start: 62 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff + returnDiff,
                                    end: 64 + ifDiff + functionDiff + returnDiff + elseDiff + functionDiff + returnDiff,
                                    value: 42,
                                    raw: '42'
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }, { ecmaVersion: 7 })

    testFail(
        `'use strict'; ${_if}(x) ${_function} f() {}`,
        `Unexpected token (1:${20 + ifDiff})`,
        { ecmaVersion: 7 }
    )

    testFail(
        `'use strict'; ${_function} y(x = 1) { 'use strict' }`,
        `Illegal 'use strict' directive in function with non-simple parameter list (1:14)`,
        { ecmaVersion: 7 }
    )

}

module.exports = { run }
