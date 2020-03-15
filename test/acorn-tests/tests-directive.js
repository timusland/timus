function run(lang) {
    const { getTestRunner } = require('./driver')
    const { getTestWords } = require('../utilities')

    const test = getTestRunner(lang)
    const testWords = getTestWords(lang)

    const { _class, _function, _with } = testWords

    const functionDiff = _function.length - 'function'.length
    const withDiff = _with.length - 'with'.length
    const classDiff = _class.length - 'class'.length

    //------------------------------------------------------------------------
    // No directives
    //------------------------------------------------------------------------

    test('foo', {
        type: 'Program',
        start: 0,
        end: 3,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 3,
                expression: {
                    type: 'Identifier',
                    start: 0,
                    end: 3,
                    name: 'foo'
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`${_function} wrap() { foo }`, {
        type: 'Program',
        start: 0,
        end: 23 + functionDiff,
        body: [
            {
                type: 'FunctionDeclaration',
                start: 0,
                end: 23 + functionDiff,
                id: {
                    type: 'Identifier',
                    start: 9 + functionDiff,
                    end: 13 + functionDiff,
                    name: 'wrap'
                },
                generator: false,
                expression: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    start: 16 + functionDiff,
                    end: 23 + functionDiff,
                    body: [
                        {
                            type: 'ExpressionStatement',
                            start: 18 + functionDiff,
                            end: 21 + functionDiff,
                            expression: {
                                type: 'Identifier',
                                start: 18 + functionDiff,
                                end: 21 + functionDiff,
                                name: 'foo'
                            }
                        }
                    ]
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`!${_function} wrap() { foo }`, {
        type: 'Program',
        start: 0,
        end: 24 + functionDiff,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 24 + functionDiff,
                expression: {
                    type: 'UnaryExpression',
                    start: 0,
                    end: 24 + functionDiff,
                    operator: '!',
                    prefix: true,
                    argument: {
                        type: 'FunctionExpression',
                        start: 1,
                        end: 24 + functionDiff,
                        id: {
                            type: 'Identifier',
                            start: 10 + functionDiff,
                            end: 14 + functionDiff,
                            name: 'wrap'
                        },
                        generator: false,
                        expression: false,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            start: 17 + functionDiff,
                            end: 24 + functionDiff,
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    start: 19 + functionDiff,
                                    end: 22 + functionDiff,
                                    expression: {
                                        type: 'Identifier',
                                        start: 19 + functionDiff,
                                        end: 22 + functionDiff,
                                        name: 'foo'
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test('() => { foo }', {
        type: 'Program',
        start: 0,
        end: 13,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 13,
                expression: {
                    type: 'ArrowFunctionExpression',
                    start: 0,
                    end: 13,
                    id: null,
                    generator: false,
                    expression: false,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        start: 6,
                        end: 13,
                        body: [
                            {
                                type: 'ExpressionStatement',
                                start: 8,
                                end: 11,
                                expression: {
                                    type: 'Identifier',
                                    start: 8,
                                    end: 11,
                                    name: 'foo'
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test('100', {
        type: 'Program',
        start: 0,
        end: 3,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 3,
                expression: {
                    type: 'Literal',
                    start: 0,
                    end: 3,
                    value: 100,
                    raw: '100'
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test('\'use strict\' + 1', {
        type: 'Program',
        start: 0,
        end: 16,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 16,
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 16,
                    left: {
                        type: 'Literal',
                        start: 0,
                        end: 12,
                        value: 'use strict',
                        raw: '\'use strict\''
                    },
                    operator: '+',
                    right: {
                        type: 'Literal',
                        start: 15,
                        end: 16,
                        value: 1,
                        raw: '1'
                    }
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`; 'use strict'; ${_with} ({}) {}`, {
        type: 'Program',
        start: 0,
        end: 28 + withDiff,
        body: [
            {
                type: 'EmptyStatement',
                start: 0,
                end: 1
            },
            {
                type: 'ExpressionStatement',
                start: 2,
                end: 15,
                expression: {
                    type: 'Literal',
                    start: 2,
                    end: 14,
                    value: 'use strict',
                    raw: '\'use strict\''
                }
            },
            {
                type: 'WithStatement',
                start: 16,
                end: 28 + withDiff,
                object: {
                    type: 'ObjectExpression',
                    start: 22 + withDiff,
                    end: 24 + withDiff,
                    properties: []
                },
                body: {
                    type: 'BlockStatement',
                    start: 26 + withDiff,
                    end: 28 + withDiff,
                    body: []
                }
            }
        ],
        sourceType: 'script'
    }, { ecmaVersion: 6 })

    //------------------------------------------------------------------------
    // One directive
    //------------------------------------------------------------------------

    test('\'use strict\'\n foo', {
        type: 'Program',
        start: 0,
        end: 17,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 12,
                expression: {
                    type: 'Literal',
                    start: 0,
                    end: 12,
                    value: 'use strict',
                    raw: '\'use strict\''
                },
                directive: 'use strict'
            },
            {
                type: 'ExpressionStatement',
                start: 14,
                end: 17,
                expression: {
                    type: 'Identifier',
                    start: 14,
                    end: 17,
                    name: 'foo'
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test('\'use strict\'; foo', {
        type: 'Program',
        start: 0,
        end: 17,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 13,
                expression: {
                    type: 'Literal',
                    start: 0,
                    end: 12,
                    value: 'use strict',
                    raw: '\'use strict\''
                },
                directive: 'use strict'
            },
            {
                type: 'ExpressionStatement',
                start: 14,
                end: 17,
                expression: {
                    type: 'Identifier',
                    start: 14,
                    end: 17,
                    name: 'foo'
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`${_function} wrap() { \'use strict\'\n foo }`, {
        type: 'Program',
        start: 0,
        end: 37 + functionDiff,
        body: [
            {
                type: 'FunctionDeclaration',
                start: 0,
                end: 37 + functionDiff,
                id: {
                    type: 'Identifier',
                    start: 9 + functionDiff,
                    end: 13 + functionDiff,
                    name: 'wrap'
                },
                generator: false,
                expression: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    start: 16 + functionDiff,
                    end: 37 + functionDiff,
                    body: [
                        {
                            type: 'ExpressionStatement',
                            start: 18 + functionDiff,
                            end: 30 + functionDiff,
                            expression: {
                                type: 'Literal',
                                start: 18 + functionDiff,
                                end: 30 + functionDiff,
                                value: 'use strict',
                                raw: '\'use strict\''
                            },
                            directive: 'use strict'
                        },
                        {
                            type: 'ExpressionStatement',
                            start: 32 + functionDiff,
                            end: 35 + functionDiff,
                            expression: {
                                type: 'Identifier',
                                start: 32 + functionDiff,
                                end: 35 + functionDiff,
                                name: 'foo'
                            }
                        }
                    ]
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`!${_function} wrap() { \'use strict\'\n foo }`, {
        type: 'Program',
        start: 0,
        end: 38 + functionDiff,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 38 + functionDiff,
                expression: {
                    type: 'UnaryExpression',
                    start: 0,
                    end: 38 + functionDiff,
                    operator: '!',
                    prefix: true,
                    argument: {
                        type: 'FunctionExpression',
                        start: 1,
                        end: 38 + functionDiff,
                        id: {
                            type: 'Identifier',
                            start: 10 + functionDiff,
                            end: 14 + functionDiff,
                            name: 'wrap'
                        },
                        generator: false,
                        expression: false,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            start: 17 + functionDiff,
                            end: 38 + functionDiff,
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    start: 19 + functionDiff,
                                    end: 31 + functionDiff,
                                    expression: {
                                        type: 'Literal',
                                        start: 19 + functionDiff,
                                        end: 31 + functionDiff,
                                        value: 'use strict',
                                        raw: '\'use strict\''
                                    },
                                    directive: 'use strict'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    start: 33 + functionDiff,
                                    end: 36 + functionDiff,
                                    expression: {
                                        type: 'Identifier',
                                        start: 33 + functionDiff,
                                        end: 36 + functionDiff,
                                        name: 'foo'
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test('() => { \'use strict\'\n foo }', {
        type: 'Program',
        start: 0,
        end: 27,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 27,
                expression: {
                    type: 'ArrowFunctionExpression',
                    start: 0,
                    end: 27,
                    id: null,
                    generator: false,
                    expression: false,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        start: 6,
                        end: 27,
                        body: [
                            {
                                type: 'ExpressionStatement',
                                start: 8,
                                end: 20,
                                expression: {
                                    type: 'Literal',
                                    start: 8,
                                    end: 20,
                                    value: 'use strict',
                                    raw: '\'use strict\''
                                },
                                directive: 'use strict'
                            },
                            {
                                type: 'ExpressionStatement',
                                start: 22,
                                end: 25,
                                expression: {
                                    type: 'Identifier',
                                    start: 22,
                                    end: 25,
                                    name: 'foo'
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test('() => \'use strict\'', {
        type: 'Program',
        start: 0,
        end: 18,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 18,
                expression: {
                    type: 'ArrowFunctionExpression',
                    start: 0,
                    end: 18,
                    id: null,
                    generator: false,
                    expression: true,
                    params: [],
                    body: {
                        type: 'Literal',
                        start: 6,
                        end: 18,
                        value: 'use strict',
                        raw: '\'use strict\''
                    }
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test('({ wrap() { \'use strict\'; foo } })', {
        type: 'Program',
        start: 0,
        end: 34,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 34,
                expression: {
                    type: 'ObjectExpression',
                    start: 1,
                    end: 33,
                    properties: [
                        {
                            type: 'Property',
                            start: 3,
                            end: 31,
                            method: true,
                            shorthand: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 3,
                                end: 7,
                                name: 'wrap'
                            },
                            kind: 'init',
                            value: {
                                type: 'FunctionExpression',
                                start: 7,
                                end: 31,
                                id: null,
                                generator: false,
                                expression: false,
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    start: 10,
                                    end: 31,
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            start: 12,
                                            end: 25,
                                            expression: {
                                                type: 'Literal',
                                                start: 12,
                                                end: 24,
                                                value: 'use strict',
                                                raw: '\'use strict\''
                                            },
                                            directive: 'use strict'
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 26,
                                            end: 29,
                                            expression: {
                                                type: 'Identifier',
                                                start: 26,
                                                end: 29,
                                                name: 'foo'
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`(${_class} { wrap() { \'use strict\'; foo } })`, {
        type: 'Program',
        start: 0,
        end: 40 + classDiff,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 40 + classDiff,
                expression: {
                    type: 'ClassExpression',
                    start: 1,
                    end: 39 + classDiff,
                    id: null,
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 7 + classDiff,
                        end: 39 + classDiff,
                        body: [
                            {
                                type: 'MethodDefinition',
                                start: 9 + classDiff,
                                end: 37 + classDiff,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 9 + classDiff,
                                    end: 13 + classDiff,
                                    name: 'wrap'
                                },
                                static: false,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 13 + classDiff,
                                    end: 37 + classDiff,
                                    id: null,
                                    generator: false,
                                    expression: false,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 16 + classDiff,
                                        end: 37 + classDiff,
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                start: 18 + classDiff,
                                                end: 31 + classDiff,
                                                expression: {
                                                    type: 'Literal',
                                                    start: 18 + classDiff,
                                                    end: 30 + classDiff,
                                                    value: 'use strict',
                                                    raw: '\'use strict\''
                                                },
                                                directive: 'use strict'
                                            },
                                            {
                                                type: 'ExpressionStatement',
                                                start: 32 + classDiff,
                                                end: 35 + classDiff,
                                                expression: {
                                                    type: 'Identifier',
                                                    start: 32 + classDiff,
                                                    end: 35 + classDiff,
                                                    name: 'foo'
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }, { ecmaVersion: 6 })

    // Should not decode escape sequence.
    test('\'\\u0075se strict\'', {
        type: 'Program',
        start: 0,
        end: 17,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 17,
                expression: {
                    type: 'Literal',
                    start: 0,
                    end: 17,
                    value: 'use strict',
                    raw: '\'\\u0075se strict\''
                },
                directive: '\\u0075se strict'
            }
        ]
    }, { ecmaVersion: 6 })

    //------------------------------------------------------------------------
    // Two or more directives.
    //------------------------------------------------------------------------

    test('\'use asm\'; \'use strict\'; foo', {
        type: 'Program',
        start: 0,
        end: 28,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 10,
                expression: {
                    type: 'Literal',
                    start: 0,
                    end: 9,
                    value: 'use asm',
                    raw: '\'use asm\''
                },
                directive: 'use asm'
            },
            {
                type: 'ExpressionStatement',
                start: 11,
                end: 24,
                expression: {
                    type: 'Literal',
                    start: 11,
                    end: 23,
                    value: 'use strict',
                    raw: '\'use strict\''
                },
                directive: 'use strict'
            },
            {
                type: 'ExpressionStatement',
                start: 25,
                end: 28,
                expression: {
                    type: 'Identifier',
                    start: 25,
                    end: 28,
                    name: 'foo'
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`${_function} wrap() { \'use asm\'; \'use strict\'; foo }`, {
        type: 'Program',
        start: 0,
        end: 48 + functionDiff,
        body: [
            {
                type: 'FunctionDeclaration',
                start: 0,
                end: 48 + functionDiff,
                id: {
                    type: 'Identifier',
                    start: 9 + functionDiff,
                    end: 13 + functionDiff,
                    name: 'wrap'
                },
                generator: false,
                expression: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    start: 16 + functionDiff,
                    end: 48 + functionDiff,
                    body: [
                        {
                            type: 'ExpressionStatement',
                            start: 18 + functionDiff,
                            end: 28 + functionDiff,
                            expression: {
                                type: 'Literal',
                                start: 18 + functionDiff,
                                end: 27 + functionDiff,
                                value: 'use asm',
                                raw: '\'use asm\''
                            },
                            directive: 'use asm'
                        },
                        {
                            type: 'ExpressionStatement',
                            start: 29 + functionDiff,
                            end: 42 + functionDiff,
                            expression: {
                                type: 'Literal',
                                start: 29 + functionDiff,
                                end: 41 + functionDiff,
                                value: 'use strict',
                                raw: '\'use strict\''
                            },
                            directive: 'use strict'
                        },
                        {
                            type: 'ExpressionStatement',
                            start: 43 + functionDiff,
                            end: 46 + functionDiff,
                            expression: {
                                type: 'Identifier',
                                start: 43 + functionDiff,
                                end: 46 + functionDiff,
                                name: 'foo'
                            }
                        }
                    ]
                }
            }
        ]
    }, { ecmaVersion: 6 })

    //------------------------------------------------------------------------
    // One string after other expressions.
    //------------------------------------------------------------------------

    test('\'use strict\'; foo; \'use asm\'', {
        type: 'Program',
        start: 0,
        end: 28,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 13,
                expression: {
                    type: 'Literal',
                    start: 0,
                    end: 12,
                    value: 'use strict',
                    raw: '\'use strict\''
                },
                directive: 'use strict'
            },
            {
                type: 'ExpressionStatement',
                start: 14,
                end: 18,
                expression: {
                    type: 'Identifier',
                    start: 14,
                    end: 17,
                    name: 'foo'
                }
            },
            {
                type: 'ExpressionStatement',
                start: 19,
                end: 28,
                expression: {
                    type: 'Literal',
                    start: 19,
                    end: 28,
                    value: 'use asm',
                    raw: '\'use asm\''
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`${_function} wrap() { \'use asm\'; foo; \'use strict\' }`, {
        type: 'Program',
        start: 0,
        end: 48 + functionDiff,
        body: [
            {
                type: 'FunctionDeclaration',
                start: 0,
                end: 48 + functionDiff,
                id: {
                    type: 'Identifier',
                    start: 9 + functionDiff,
                    end: 13 + functionDiff,
                    name: 'wrap'
                },
                generator: false,
                expression: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    start: 16 + functionDiff,
                    end: 48 + functionDiff,
                    body: [
                        {
                            type: 'ExpressionStatement',
                            start: 18 + functionDiff,
                            end: 28 + functionDiff,
                            expression: {
                                type: 'Literal',
                                start: 18 + functionDiff,
                                end: 27 + functionDiff,
                                value: 'use asm',
                                raw: '\'use asm\''
                            },
                            directive: 'use asm'
                        },
                        {
                            type: 'ExpressionStatement',
                            start: 29 + functionDiff,
                            end: 33 + functionDiff,
                            expression: {
                                type: 'Identifier',
                                start: 29 + functionDiff,
                                end: 32 + functionDiff,
                                name: 'foo'
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            start: 34 + functionDiff,
                            end: 46 + functionDiff,
                            expression: {
                                type: 'Literal',
                                start: 34 + functionDiff,
                                end: 46 + functionDiff,
                                value: 'use strict',
                                raw: '\'use strict\''
                            }
                        }
                    ]
                }
            }
        ]
    }, { ecmaVersion: 6 })

    //------------------------------------------------------------------------
    // One string in a block.
    //------------------------------------------------------------------------

    test('{ \'use strict\'; }', {
        type: 'Program',
        start: 0,
        end: 17,
        body: [
            {
                type: 'BlockStatement',
                start: 0,
                end: 17,
                body: [
                    {
                        type: 'ExpressionStatement',
                        start: 2,
                        end: 15,
                        expression: {
                            type: 'Literal',
                            start: 2,
                            end: 14,
                            value: 'use strict',
                            raw: '\'use strict\''
                        }
                    }
                ]
            }
        ]
    }, { ecmaVersion: 6 })

    test(`${_function} wrap() { { \'use strict\' } foo }`, {
        type: 'Program',
        start: 0,
        end: 40 + functionDiff,
        body: [
            {
                type: 'FunctionDeclaration',
                start: 0,
                end: 40 + functionDiff,
                id: {
                    type: 'Identifier',
                    start: 9 + functionDiff,
                    end: 13 + functionDiff,
                    name: 'wrap'
                },
                generator: false,
                expression: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    start: 16 + functionDiff,
                    end: 40 + functionDiff,
                    body: [
                        {
                            type: 'BlockStatement',
                            start: 18 + functionDiff,
                            end: 34 + functionDiff,
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    start: 20 + functionDiff,
                                    end: 32 + functionDiff,
                                    expression: {
                                        type: 'Literal',
                                        start: 20 + functionDiff,
                                        end: 32 + functionDiff,
                                        value: 'use strict',
                                        raw: '\'use strict\''
                                    }
                                }
                            ]
                        },
                        {
                            type: 'ExpressionStatement',
                            start: 35 + functionDiff,
                            end: 38 + functionDiff,
                            expression: {
                                type: 'Identifier',
                                start: 35 + functionDiff,
                                end: 38 + functionDiff,
                                name: 'foo'
                            }
                        }
                    ]
                }
            }
        ]
    }, { ecmaVersion: 6 })

    //------------------------------------------------------------------------
    // One string with parentheses.
    //------------------------------------------------------------------------

    test('(\'use strict\'); foo', {
        type: 'Program',
        start: 0,
        end: 19,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 15,
                expression: {
                    type: 'Literal',
                    start: 1,
                    end: 13,
                    value: 'use strict',
                    raw: '\'use strict\''
                }
            },
            {
                type: 'ExpressionStatement',
                start: 16,
                end: 19,
                expression: {
                    type: 'Identifier',
                    start: 16,
                    end: 19,
                    name: 'foo'
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`${_function} wrap() { (\'use strict\'); foo }`, {
        type: 'Program',
        start: 0,
        end: 39 + functionDiff,
        body: [
            {
                type: 'FunctionDeclaration',
                start: 0,
                end: 39 + functionDiff,
                id: {
                    type: 'Identifier',
                    start: 9 + functionDiff,
                    end: 13 + functionDiff,
                    name: 'wrap'
                },
                generator: false,
                expression: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    start: 16 + functionDiff,
                    end: 39 + functionDiff,
                    body: [
                        {
                            type: 'ExpressionStatement',
                            start: 18 + functionDiff,
                            end: 33 + functionDiff,
                            expression: {
                                type: 'Literal',
                                start: 19 + functionDiff,
                                end: 31 + functionDiff,
                                value: 'use strict',
                                raw: '\'use strict\''
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            start: 34 + functionDiff,
                            end: 37 + functionDiff,
                            expression: {
                                type: 'Identifier',
                                start: 34 + functionDiff,
                                end: 37 + functionDiff,
                                name: 'foo'
                            }
                        }
                    ]
                }
            }
        ]
    }, { ecmaVersion: 6 })

    //------------------------------------------------------------------------
    // Complex cases such as the function in a default parameter.
    //------------------------------------------------------------------------

    test(`${_function} a() { \'use strict\' } \'use strict\'; foo`, {
        type: 'Program',
        start: 0,
        end: 47 + functionDiff,
        body: [
            {
                type: 'FunctionDeclaration',
                start: 0,
                end: 29 + functionDiff,
                id: {
                    type: 'Identifier',
                    start: 9 + functionDiff,
                    end: 10 + functionDiff,
                    name: 'a'
                },
                generator: false,
                expression: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    start: 13 + functionDiff,
                    end: 29 + functionDiff,
                    body: [
                        {
                            type: 'ExpressionStatement',
                            start: 15 + functionDiff,
                            end: 27 + functionDiff,
                            expression: {
                                type: 'Literal',
                                start: 15 + functionDiff,
                                end: 27 + functionDiff,
                                value: 'use strict',
                                raw: '\'use strict\''
                            },
                            directive: 'use strict'
                        }
                    ]
                }
            },
            {
                type: 'ExpressionStatement',
                start: 30 + functionDiff,
                end: 43 + functionDiff,
                expression: {
                    type: 'Literal',
                    start: 30 + functionDiff,
                    end: 42 + functionDiff,
                    value: 'use strict',
                    raw: '\'use strict\''
                }
            },
            {
                type: 'ExpressionStatement',
                start: 44 + functionDiff,
                end: 47 + functionDiff,
                expression: {
                    type: 'Identifier',
                    start: 44 + functionDiff,
                    end: 47 + functionDiff,
                    name: 'foo'
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test(`${_function} a(a = ${_function}() { \'use strict\'; foo }) { \'use strict\' }`, {
        type: 'Program',
        start: 0,
        end: 65 + functionDiff + functionDiff,
        body: [
            {
                type: 'FunctionDeclaration',
                start: 0,
                end: 65 + functionDiff + functionDiff,
                id: {
                    type: 'Identifier',
                    start: 9 + functionDiff,
                    end: 10 + functionDiff,
                    name: 'a'
                },
                generator: false,
                expression: false,
                params: [
                    {
                        type: 'AssignmentPattern',
                        start: 11 + functionDiff,
                        end: 47 + functionDiff + functionDiff,
                        left: {
                            type: 'Identifier',
                            start: 11 + functionDiff,
                            end: 12 + functionDiff,
                            name: 'a'
                        },
                        right: {
                            type: 'FunctionExpression',
                            start: 15 + functionDiff,
                            end: 47 + functionDiff + functionDiff,
                            id: null,
                            generator: false,
                            expression: false,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                start: 26 + functionDiff + functionDiff,
                                end: 47 + functionDiff + functionDiff,
                                body: [
                                    {
                                        type: 'ExpressionStatement',
                                        start: 28 + functionDiff + functionDiff,
                                        end: 41 + functionDiff + functionDiff,
                                        expression: {
                                            type: 'Literal',
                                            start: 28 + functionDiff + functionDiff,
                                            end: 40 + functionDiff + functionDiff,
                                            value: 'use strict',
                                            raw: '\'use strict\''
                                        },
                                        directive: 'use strict'
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        start: 42 + functionDiff + functionDiff,
                                        end: 45 + functionDiff + functionDiff,
                                        expression: {
                                            type: 'Identifier',
                                            start: 42 + functionDiff + functionDiff,
                                            end: 45 + functionDiff + functionDiff,
                                            name: 'foo'
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ],
                body: {
                    type: 'BlockStatement',
                    start: 49 + functionDiff + functionDiff,
                    end: 65 + functionDiff + functionDiff,
                    body: [
                        {
                            type: 'ExpressionStatement',
                            start: 51 + functionDiff + functionDiff,
                            end: 63 + functionDiff + functionDiff,
                            expression: {
                                type: 'Literal',
                                start: 51 + functionDiff + functionDiff,
                                end: 63 + functionDiff + functionDiff,
                                value: 'use strict',
                                raw: '\'use strict\''
                            },
                            directive: 'use strict'
                        }
                    ]
                }
            }
        ]
    }, { ecmaVersion: 6 })

    test('(a = () => { \'use strict\'; foo }) => { \'use strict\' }', {
        type: 'Program',
        start: 0,
        end: 53,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 53,
                expression: {
                    type: 'ArrowFunctionExpression',
                    start: 0,
                    end: 53,
                    id: null,
                    generator: false,
                    expression: false,
                    params: [
                        {
                            type: 'AssignmentPattern',
                            start: 1,
                            end: 32,
                            left: {
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                name: 'a'
                            },
                            right: {
                                type: 'ArrowFunctionExpression',
                                start: 5,
                                end: 32,
                                id: null,
                                generator: false,
                                expression: false,
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    start: 11,
                                    end: 32,
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            start: 13,
                                            end: 26,
                                            expression: {
                                                type: 'Literal',
                                                start: 13,
                                                end: 25,
                                                value: 'use strict',
                                                raw: '\'use strict\''
                                            },
                                            directive: 'use strict'
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            start: 27,
                                            end: 30,
                                            expression: {
                                                type: 'Identifier',
                                                start: 27,
                                                end: 30,
                                                name: 'foo'
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        start: 37,
                        end: 53,
                        body: [
                            {
                                type: 'ExpressionStatement',
                                start: 39,
                                end: 51,
                                expression: {
                                    type: 'Literal',
                                    start: 39,
                                    end: 51,
                                    value: 'use strict',
                                    raw: '\'use strict\''
                                },
                                directive: 'use strict'
                            }
                        ]
                    }
                }
            }
        ]
    }, { ecmaVersion: 6 })

}

module.exports = { run }
