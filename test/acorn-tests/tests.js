// Tests based on those of Acorn.
// Each test was modified in order to be a generic test
// for any language configuration.
// This was done by making each code a template string with
// the JavaScript words set as variables.

function run(lang) {
    const { getTestRunner, getTestFailRunner } = require('./driver')
    const { getTestWords } = require('../utilities')

    const test = getTestRunner(lang)
    const testFail = getTestFailRunner(lang)
    const testWords = getTestWords(lang)

    const {
        _Object,
        _arguments,
        _await,
        _break,
        _case,
        _catch,
        _continue,
        _debugger,
        _default,
        _delete,
        _do,
        _else,
        _eval,
        _false,
        _finally,
        _for,
        _function,
        _get,
        _if,
        _implements,
        _import,
        _in,
        _instanceof,
        _interface,
        _new,
        _null,
        _package,
        _private,
        _protected,
        _public,
        _return,
        _set,
        _static,
        _switch,
        _this,
        _throw,
        _true,
        _try,
        _typeof,
        _var,
        _void,
        _while,
        _with
    } = testWords

    // To make it easier dealing with positions we also
    // get the words diff.
    const objectDiff = _Object.length - 'Object'.length
    const argumentsDiff = _arguments.length - 'arguments'.length
    const awaitDiff = _await.length - 'await'.length
    const breakDiff = _break.length - 'break'.length
    const caseDiff = _case.length - 'case'.length
    const catchDiff = _catch.length - 'catch'.length
    const continueDiff = _continue.length - 'continue'.length
    const debuggerDiff = _debugger.length - 'debugger'.length
    const defaultDiff = _default.length - 'default'.length
    const deleteDiff = _delete.length - 'delete'.length
    const doDiff = _do.length - 'do'.length
    const elseDiff = _else.length - 'else'.length
    const evalDiff = _eval.length - 'eval'.length
    const falseDiff = _false.length - 'false'.length
    const finallyDiff = _finally.length - 'finally'.length
    const forDiff = _for.length - 'for'.length
    const functionDiff = _function.length - 'function'.length
    const getDiff = _get.length - 'get'.length
    const ifDiff = _if.length - 'if'.length
    const implementsDiff = _implements.length - 'implements'.length
    const importDiff = _import.length - 'import'.length
    const inDiff = _in.length - 'in'.length
    const instanceofDiff = _instanceof.length - 'instanceof'.length
    const interfaceDiff = _interface.length - 'interface'.length
    const newDiff = _new.length - 'new'.length
    const nullDiff = _null.length - 'null'.length
    const packageDiff = _package.length - 'package'.length
    const privateDiff = _private.length - 'private'.length
    const protectedDiff = _protected.length - 'protected'.length
    const publicDiff = _public.length - 'public'.length
    const returnDiff = _return.length - 'return'.length
    const setDiff = _set.length - 'set'.length
    const staticDiff = _static.length - 'static'.length
    const switchDiff = _switch.length - 'switch'.length
    const thisDiff = _this.length - 'this'.length
    const throwDiff = _throw.length - 'throw'.length
    const trueDiff = _true.length - 'true'.length
    const tryDiff = _try.length - 'try'.length
    const typeofDiff = _typeof.length - 'typeof'.length
    const varDiff = _var.length - 'var'.length
    const voidDiff = _void.length - 'void'.length
    const whileDiff = _while.length - 'while'.length
    const withDiff = _with.length - 'with'.length

    test(`${_import} ''`, {
        sourceType: 'module',
        type: 'Program',
        start: 0,
        end: 9 + importDiff,
        body: [
            {
                type: 'ImportDeclaration',
                start: 0,
                end: 9 + importDiff,
                specifiers: [],
                source: {
                    type: 'Literal',
                    start: 7 + importDiff,
                    end: 9 + importDiff,
                    value: '',
                    raw: '\'\''
                }
            }
        ]
    }, {
        ecmaVersion: 5,
        sourceType: 'module'
    })

    testFail(`${_import}('')`, `Unexpected token (1:${6 + importDiff})`, {
        ecmaVersion: 5,
        sourceType: 'module'
    })

    test(`${_new} ${_Object}`, {
        sourceType: 'script',
        type: 'Program',
        start: 0,
        end: 10 + newDiff + objectDiff,
        body: [
            {
                type: 'ExpressionStatement',
                start: 0,
                end: 10 + newDiff + objectDiff,
                expression: {
                    type: 'NewExpression',
                    start: 0,
                    end: 10 + newDiff + objectDiff,
                    callee: {
                        type: 'Identifier',
                        start: 4 + newDiff,
                        end: 10 + newDiff + objectDiff,
                        name: _Object
                    },
                    arguments: []
                }
            }
        ]
    }, {
        allowReserved: 'never'
    })

    test(`${_this}\n`, {
        sourceType: 'script',
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ThisExpression',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4 + thisDiff
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
                        column: 4 + thisDiff
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
                line: 2,
                column: 0
            }
        }
    })

    test(`${_null}\n`, {
        sourceType: 'script',
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: `${_null}`,
                    value: null,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4 + nullDiff
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
                        column: 4 + nullDiff
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
                line: 2,
                column: 0
            }
        }
    })

    test('\n    42\n\n', {
        sourceType: 'script',
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 2,
                            column: 4
                        },
                        end: {
                            line: 2,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
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
                line: 4,
                column: 0
            }
        }
    })

    test('/foobar/', {
        sourceType: 'script',
        type: 'Program',
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 8
            }
        },
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: /foobar/,
                    raw: '/foobar/',
                    regex: {
                        pattern: 'foobar',
                        flags: ''
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
        ]
    })

    test('/[a-z]/g', {
        sourceType: 'script',
        type: 'Program',
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 8
            }
        },
        body: [
            {
                type: 'ExpressionStatement',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                },
                expression: {
                    type: 'Literal',
                    raw: '/[a-z]/g',
                    value: /[a-z]/g,
                    regex: {
                        pattern: '[a-z]',
                        flags: 'g'
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
            }
        ]
    })

    test('(1 + 2 ) * 3', {
        sourceType: 'script',
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Literal',
                            raw: '1',
                            value: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            }
                        },
                        operator: '+',
                        right: {
                            type: 'Literal',
                            raw: '2',
                            value: 2,
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
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    operator: '*',
                    right: {
                        type: 'Literal',
                        raw: '3',
                        value: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 12
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
                            column: 12
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
                        column: 12
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
                column: 12
            }
        }
    })

    test('(1 + 2 ) * 3', {
        sourceType: 'script',
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'ParenthesizedExpression',
                        expression: {
                            type: 'BinaryExpression',
                            left: {
                                type: 'Literal',
                                raw: '1',
                                value: 1,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                }
                            },
                            operator: '+',
                            right: {
                                type: 'Literal',
                                raw: '2',
                                value: 2,
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
                                    column: 1
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
                                column: 8
                            }
                        }
                    },
                    operator: '*',
                    right: {
                        type: 'Literal',
                        raw: '3',
                        value: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 12
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
                            column: 12
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
                        column: 12
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
                column: 12
            }
        }
    }, {
        locations: true,
        preserveParens: true
    })

    test('(x = 23)', {
        start: 0,
        end: 8,
        body: [
            {
                start: 0,
                end: 8,
                expression: {
                    start: 0,
                    end: 8,
                    type: 'ParenthesizedExpression',
                    expression: {
                        start: 1,
                        end: 7,
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            start: 1,
                            end: 2,
                            name: 'x',
                            type: 'Identifier',
                        },
                        right: {
                            start: 5,
                            end: 7,
                            value: 23,
                            raw: '23',
                            type: 'Literal',
                        },
                    },
                },
                type: 'ExpressionStatement',
            }
        ],
        type: 'Program',
    }, { preserveParens: true })

    test('x = []', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ArrayExpression',
                        elements: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
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
    })

    test('x = [ ]', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ArrayExpression',
                        elements: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x = [ 42 ]', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Literal',
                                value: 42,
                                raw: '42',
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
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 10
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
                            column: 10
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
                        column: 10
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
                column: 10
            }
        }
    })

    test('x = [ 42, ]', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ArrayExpression',
                        elements: [
                            {
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
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 11
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
                            column: 11
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
                        column: 11
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
                column: 11
            }
        }
    })

    test('x = [ ,, 42 ]', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ArrayExpression',
                        elements: [
                            null,
                            null,
                            {
                                type: 'Literal',
                                raw: '42',
                                value: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 13
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
                            column: 13
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
                        column: 13
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
                column: 13
            }
        }
    })

    test('x = [ 1, 2, 3, ]', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Literal',
                                raw: '1',
                                value: 1,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            {
                                type: 'Literal',
                                raw: '2',
                                value: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            {
                                type: 'Literal',
                                raw: '3',
                                value: 3,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 16
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
                            column: 16
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
                        column: 16
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
                column: 16
            }
        }
    })

    test('x = [ 1, 2,, 3, ]', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Literal',
                                raw: '1',
                                value: 1,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            {
                                type: 'Literal',
                                raw: '2',
                                value: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            null,
                            {
                                type: 'Literal',
                                raw: '3',
                                value: 3,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 17
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
                            column: 17
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
                        column: 17
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
                column: 17
            }
        }
    })

    test('日本語 = []', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: '日本語',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
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
    })

    test('T‿ = []', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'T‿',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('T‌ = []', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'T‌',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('T‍ = []', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'T‍',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('ⅣⅡ = []', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'ⅣⅡ',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('ⅣⅡ = []', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'ⅣⅡ',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x = {}', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
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
    })

    test('x = { }', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x = { answer: 42 }', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                loc: {
                                    end: {
                                        column: 16,
                                        line: 1
                                    },
                                    start: {
                                        column: 6,
                                        line: 1
                                    }
                                },
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'answer',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '42',
                                    value: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                kind: 'init'
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 18
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
                            column: 18
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
                        column: 18
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
                column: 18
            }
        }
    })

    test(`x = { ${_if}: 42 }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _if,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 8 + ifDiff
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '42',
                                    value: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + ifDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 12 + ifDiff
                                        }
                                    }
                                },
                                kind: 'init',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 12 + ifDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 14 + ifDiff
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
                            column: 14 + ifDiff
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
                        column: 14 + ifDiff
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
                column: 14 + ifDiff
            }
        }
    })

    test(`x = { ${_true}: 42 }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _true,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 10 + trueDiff
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '42',
                                    value: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12 + trueDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 14 + trueDiff
                                        }
                                    }
                                },
                                kind: 'init',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 14 + trueDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 16 + trueDiff
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
                            column: 16 + trueDiff
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
                        column: 16 + trueDiff
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
                column: 16 + trueDiff
            }
        }
    })

    test(`x = { ${_false}: 42 }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _false,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 11 + falseDiff
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '42',
                                    value: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13 + falseDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 15 + falseDiff
                                        }
                                    }
                                },
                                kind: 'init',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 15 + falseDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 17 + falseDiff
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
                            column: 17 + falseDiff
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
                        column: 17 + falseDiff
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
                column: 17 + falseDiff
            }
        }
    })

    test(`x = { ${_null}: 42 }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _null,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 10 + nullDiff
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '42',
                                    value: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12 + nullDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 14 + nullDiff
                                        }
                                    }
                                },
                                kind: 'init',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 14 + nullDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 16 + nullDiff
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
                            column: 16 + nullDiff
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
                        column: 16 + nullDiff
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
                column: 16 + nullDiff
            }
        }
    })

    test('x = { \'answer\': 42 }', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    raw: '\'answer\'',
                                    value: 'answer',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '42',
                                    value: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                kind: 'init',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 20
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
                            column: 20
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
                        column: 20
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
                column: 20
            }
        }
    })

    test('x = { x: 1, x: 2 }', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '1',
                                    value: 1,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                },
                                kind: 'init'
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '2',
                                    value: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                kind: 'init'
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 18
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
                            column: 18
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
                        column: 18
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
                column: 18
            }
        }
    })

    test(`x = { ${_get} width() { ${_return} m_width } }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 36 + getDiff
                                    }
                                },
                                key: {
                                    type: 'Identifier',
                                    name: 'width',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 15 + getDiff
                                        }
                                    }
                                },
                                kind: 'get',
                                value: {
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    expression: false,
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'm_width',
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 27 + getDiff + returnDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 34 + getDiff + returnDiff
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 20 + getDiff
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 34 + getDiff + returnDiff
                                                    }
                                                }
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18 + getDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 36 + getDiff + returnDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 36 + getDiff + returnDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 38 + getDiff + returnDiff
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
                            column: 38 + getDiff + returnDiff
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
                        column: 38 + getDiff + returnDiff
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
                column: 38 + getDiff + returnDiff
            }
        }
    })

    test(`x = { ${_get} undef() {} }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'undef',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 15 + getDiff
                                        }
                                    }
                                },
                                kind: 'get',
                                value: {
                                    type: 'FunctionExpression',
                                    expression: false,
                                    id: null,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18 + getDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 20 + getDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 20 + getDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 22 + getDiff
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
                            column: 22 + getDiff
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
                        column: 22 + getDiff
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
                column: 22 + getDiff
            }
        }
    })

    test(`x = { ${_get} ${_if}() {} }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _if,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 12 + getDiff + ifDiff
                                        }
                                    }
                                },
                                kind: 'get',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 15 + getDiff + ifDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 17 + getDiff + ifDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12 + getDiff + ifDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 17 + getDiff + ifDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 19 + getDiff + ifDiff
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
                            column: 19 + getDiff + ifDiff
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
                        column: 19 + getDiff + ifDiff
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
                column: 19 + getDiff + ifDiff
            }
        }
    })

    test(`x = { ${_get} ${_true}() {} }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _true,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 14 + getDiff + trueDiff
                                        }
                                    }
                                },
                                kind: 'get',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17 + getDiff + trueDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 19 + getDiff + trueDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14 + getDiff + trueDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 19 + getDiff + trueDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 21 + getDiff + trueDiff
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
                            column: 21 + getDiff + trueDiff
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
                        column: 21 + getDiff + trueDiff
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
                column: 21 + getDiff + trueDiff
            }
        }
    })

    test(`x = { ${_get} ${_false}() {} }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _false,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 15 + getDiff + falseDiff
                                        }
                                    }
                                },
                                kind: 'get',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18 + getDiff + falseDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 20 + getDiff + falseDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15 + getDiff + falseDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 20 + getDiff + falseDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 22 + getDiff + falseDiff
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
                            column: 22 + getDiff + falseDiff
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
                        column: 22 + getDiff + falseDiff
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
                column: 22 + getDiff + falseDiff
            }
        }
    })

    test(`x = { ${_get} ${_null}() {} }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _null,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 14 + getDiff + nullDiff
                                        }
                                    }
                                },
                                kind: 'get',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17 + getDiff + nullDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 19 + getDiff + nullDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14 + getDiff + nullDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 19 + getDiff + nullDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 21 + getDiff + nullDiff
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
                            column: 21 + getDiff + nullDiff
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
                        column: 21 + getDiff + nullDiff
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
                column: 21 + getDiff + nullDiff
            }
        }
    })

    test(`x = { ${_get} \'undef\'() {} }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    raw: '\'undef\'',
                                    value: 'undef',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 17 + getDiff
                                        }
                                    }
                                },
                                kind: 'get',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20 + getDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 22 + getDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 22 + getDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 24 + getDiff
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
                            column: 24 + getDiff
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
                        column: 24 + getDiff
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
                column: 24 + getDiff
            }
        }
    })

    test(`x = { ${_get} 10() {} }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    raw: '10',
                                    value: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 12 + getDiff
                                        }
                                    }
                                },
                                kind: 'get',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 15 + getDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 17 + getDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 17 + getDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 19 + getDiff
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
                            column: 19 + getDiff
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
                        column: 19 + getDiff
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
                column: 19 + getDiff
            }
        }
    })

    test(`x = { ${_set} width(w) { m_width = w } }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'width',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 15 + setDiff
                                        }
                                    }
                                },
                                kind: 'set',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16 + setDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 17 + setDiff
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    operator: '=',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'm_width',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 21 + setDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 28 + setDiff
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'w',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 31 + setDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 32 + setDiff
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 21 + setDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 32 + setDiff
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 21 + setDiff
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 32 + setDiff
                                                    }
                                                }
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19 + setDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 34 + setDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 34 + setDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 36 + setDiff
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
                            column: 36 + setDiff
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
                        column: 36 + setDiff
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
                column: 36 + setDiff
            }
        }
    })

    test(`x = { ${_set} ${_if}(w) { m_if = w } }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _if,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 12 + setDiff + ifDiff
                                        }
                                    }
                                },
                                kind: 'set',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13 + setDiff + ifDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 14 + setDiff + ifDiff
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    operator: '=',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'm_if',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 18 + setDiff + ifDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 22 + setDiff + ifDiff
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'w',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 25 + setDiff + ifDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 26 + setDiff + ifDiff
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 18 + setDiff + ifDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 26 + setDiff + ifDiff
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 18 + setDiff + ifDiff
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26 + setDiff + ifDiff
                                                    }
                                                }
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16 + setDiff + ifDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 28 + setDiff + ifDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12 + setDiff + ifDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 28 + setDiff + ifDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 30 + setDiff + ifDiff
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
                            column: 30 + setDiff + ifDiff
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
                        column: 30 + setDiff + ifDiff
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
                column: 30 + setDiff + ifDiff
            }
        }
    })

    test(`x = { ${_set} ${_true}(w) { m_true = w } }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _true,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 14 + setDiff + trueDiff
                                        }
                                    }
                                },
                                kind: 'set',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 15 + setDiff + trueDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16 + setDiff + trueDiff
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    operator: '=',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'm_true',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 20 + setDiff + trueDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 26 + setDiff + trueDiff
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'w',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 29 + setDiff + trueDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 30 + setDiff + trueDiff
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 20 + setDiff + trueDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 30 + setDiff + trueDiff
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 20 + setDiff + trueDiff
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30 + setDiff + trueDiff
                                                    }
                                                }
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18 + setDiff + trueDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 32 + setDiff + trueDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14 + setDiff + trueDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 32 + setDiff + trueDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 34 + setDiff + trueDiff
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
                            column: 34 + setDiff + trueDiff
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
                        column: 34 + setDiff + trueDiff
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
                column: 34 + setDiff + trueDiff
            }
        }
    })

    test(`x = { ${_set} ${_false}(w) { m_false = w } }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _false,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 15 + setDiff + falseDiff
                                        }
                                    }
                                },
                                kind: 'set',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16 + setDiff + falseDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 17 + setDiff + falseDiff
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    operator: '=',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'm_false',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 21 + setDiff + falseDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 28 + setDiff + falseDiff
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'w',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 31 + setDiff + falseDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 32 + setDiff + falseDiff
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 21 + setDiff + falseDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 32 + setDiff + falseDiff
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 21 + setDiff + falseDiff
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 32 + setDiff + falseDiff
                                                    }
                                                }
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19 + setDiff + falseDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 34 + setDiff + falseDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15 + setDiff + falseDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 34 + setDiff + falseDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 36 + setDiff + falseDiff
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
                            column: 36 + setDiff + falseDiff
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
                        column: 36 + setDiff + falseDiff
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
                column: 36 + setDiff + falseDiff
            }
        }
    })

    test(`x = { ${_set} ${_null}(w) { m_null = w } }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _null,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 14 + setDiff + nullDiff
                                        }
                                    }
                                },
                                kind: 'set',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 15 + setDiff + nullDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16 + setDiff + nullDiff
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    operator: '=',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'm_null',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 20 + setDiff + nullDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 26 + setDiff + nullDiff
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'w',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 29 + setDiff + nullDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 30 + setDiff + nullDiff
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 20 + setDiff + nullDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 30 + setDiff + nullDiff
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 20 + setDiff + nullDiff
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30 + setDiff + nullDiff
                                                    }
                                                }
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18 + setDiff + nullDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 32 + setDiff + nullDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14 + setDiff + nullDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 32 + setDiff + nullDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 34 + setDiff + nullDiff
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
                            column: 34 + setDiff + nullDiff
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
                        column: 34 + setDiff + nullDiff
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
                column: 34 + setDiff + nullDiff
            }
        }
    })

    test(`x = { ${_set} \'${_null}\'(w) { m_null = w } }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    raw: `'${_null}'`,
                                    value: _null,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 16 + setDiff + nullDiff
                                        }
                                    }
                                },
                                kind: 'set',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17 + setDiff + nullDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 18 + setDiff + nullDiff
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    operator: '=',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'm_null',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 22 + setDiff + nullDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 28 + setDiff + nullDiff
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'w',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 31 + setDiff + nullDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 32 + setDiff + nullDiff
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 22 + setDiff + nullDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 32 + setDiff + nullDiff
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 22 + setDiff + nullDiff
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 32 + setDiff + nullDiff
                                                    }
                                                }
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20 + setDiff + nullDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 34 + setDiff + nullDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16 + setDiff + nullDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 34 + setDiff + nullDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 36 + setDiff + nullDiff
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
                            column: 36 + setDiff + nullDiff
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
                        column: 36 + setDiff + nullDiff
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
                column: 36 + setDiff + nullDiff
            }
        }
    })

    test(`x = { ${_set} 10(w) { m_null = w } }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    raw: '10',
                                    value: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 12 + setDiff
                                        }
                                    }
                                },
                                kind: 'set',
                                value: {
                                    expression: false,
                                    type: 'FunctionExpression',
                                    id: null,
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13 + setDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 14 + setDiff
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    operator: '=',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'm_null',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 18 + setDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 24 + setDiff
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'w',
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 27 + setDiff
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 28 + setDiff
                                                            }
                                                        }
                                                    },
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 18 + setDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 28 + setDiff
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 18 + setDiff
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 28 + setDiff
                                                    }
                                                }
                                            }
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16 + setDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 30 + setDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 30 + setDiff
                                        }
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 32 + setDiff
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
                            column: 32 + setDiff
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
                        column: 32 + setDiff
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
                column: 32 + setDiff
            }
        }
    })

    test(`x = { ${_get}: 42 }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _get,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 9 + getDiff
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '42',
                                    value: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11 + getDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 13 + getDiff
                                        }
                                    }
                                },
                                kind: 'init'
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 15 + getDiff
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
                            column: 15 + getDiff
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
                        column: 15 + getDiff
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
                column: 15 + getDiff
            }
        }
    })

    test(`x = { ${_set}: 43 }`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: _set,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 9 + setDiff
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    raw: '43',
                                    value: 43,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11 + setDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 13 + setDiff
                                        }
                                    }
                                },
                                kind: 'init'
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 15 + setDiff
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
                            column: 15 + setDiff
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
                        column: 15 + setDiff
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
                column: 15 + setDiff
            }
        }
    })

    test('/* block comment */ 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 20
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 20
                    },
                    end: {
                        line: 1,
                        column: 22
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
                column: 22
            }
        }
    })

    test('42 /*The*/ /*Answer*/', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
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
                        column: 2
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
                column: 21
            }
        }
    })

    test('42 /*the*/ /*answer*/', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
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
                        column: 2
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
                column: 21
            }
        }
    })

    test('/* multiline\ncomment\nshould\nbe\nignored */ 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 5,
                            column: 11
                        },
                        end: {
                            line: 5,
                            column: 13
                        }
                    }
                },
                loc: {
                    start: {
                        line: 5,
                        column: 11
                    },
                    end: {
                        line: 5,
                        column: 13
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
                line: 5,
                column: 13
            }
        }
    })

    test('/*a\r\nb*/ 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 2,
                            column: 4
                        },
                        end: {
                            line: 2,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
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
                line: 2,
                column: 6
            }
        }
    })

    test('/*a\rb*/ 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 2,
                            column: 4
                        },
                        end: {
                            line: 2,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
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
                line: 2,
                column: 6
            }
        }
    })

    test('/*a\nb*/ 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 2,
                            column: 4
                        },
                        end: {
                            line: 2,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
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
                line: 2,
                column: 6
            }
        }
    })

    test('/*a\nc*/ 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 2,
                            column: 4
                        },
                        end: {
                            line: 2,
                            column: 6
                        }
                    }
                },
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 2,
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
                line: 2,
                column: 6
            }
        }
    })

    test('// line comment\n42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 2,
                            column: 0
                        },
                        end: {
                            line: 2,
                            column: 2
                        }
                    }
                },
                loc: {
                    start: {
                        line: 2,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 2
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
                line: 2,
                column: 2
            }
        }
    })

    test('42 // line comment', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
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
                        column: 2
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
                column: 18
            }
        }
    })

    test('// Hello, world!\n42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 2,
                            column: 0
                        },
                        end: {
                            line: 2,
                            column: 2
                        }
                    }
                },
                loc: {
                    start: {
                        line: 2,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 2
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
                line: 2,
                column: 2
            }
        }
    })

    test('// Hello, world!\n', {
        type: 'Program',
        body: [],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 0
            }
        }
    })

    test('// Hallo, world!\n', {
        type: 'Program',
        body: [],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 0
            }
        }
    })

    test('//\n42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 2,
                            column: 0
                        },
                        end: {
                            line: 2,
                            column: 2
                        }
                    }
                },
                loc: {
                    start: {
                        line: 2,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 2
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
                line: 2,
                column: 2
            }
        }
    })

    test('//', {
        type: 'Program',
        body: [],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 2
            }
        }
    })

    test('// ', {
        type: 'Program',
        body: [],
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 3
            }
        }
    })

    test('/**/42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
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
                        column: 4
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
    })

    test('// Hello, world!\n\n//   Another hello\n42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 4,
                            column: 0
                        },
                        end: {
                            line: 4,
                            column: 2
                        }
                    }
                },
                loc: {
                    start: {
                        line: 4,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 2
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
                line: 4,
                column: 2
            }
        }
    })

    test(`${_if} (x) { // Some comment\ndoThat(); }`, {
        type: 'Program',
        body: [
            {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'x',
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 5 + ifDiff
                        }
                    }
                },
                consequent: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'doThat',
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 0
                                        },
                                        end: {
                                            line: 2,
                                            column: 6
                                        }
                                    }
                                },
                                arguments: [],
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 0
                                    },
                                    end: {
                                        line: 2,
                                        column: 8
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 2,
                                    column: 0
                                },
                                end: {
                                    line: 2,
                                    column: 9
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 7 + ifDiff
                        },
                        end: {
                            line: 2,
                            column: 11
                        }
                    }
                },
                alternate: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 11
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
                line: 2,
                column: 11
            }
        }
    })

    test(`${_switch} (answer) { ${_case} 42: /* perfect */ bingo() }`, {
        type: 'Program',
        body: [
            {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer',
                    loc: {
                        start: {
                            line: 1,
                            column: 8 + switchDiff
                        },
                        end: {
                            line: 1,
                            column: 14 + switchDiff
                        }
                    }
                },
                cases: [
                    {
                        type: 'SwitchCase',
                        consequent: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'bingo',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41 + switchDiff + caseDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 46 + switchDiff + caseDiff
                                            }
                                        }
                                    },
                                    arguments: [],
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 41 + switchDiff + caseDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 48 + switchDiff + caseDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 41 + switchDiff + caseDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 48 + switchDiff + caseDiff
                                    }
                                }
                            }
                        ],
                        test: {
                            type: 'Literal',
                            raw: '42',
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23 + switchDiff + caseDiff
                                },
                                end: {
                                    line: 1,
                                    column: 25 + switchDiff + caseDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 18 + switchDiff
                            },
                            end: {
                                line: 1,
                                column: 48 + switchDiff + caseDiff
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
                        column: 50 + switchDiff + caseDiff
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
                column: 50 + switchDiff + caseDiff
            }
        }
    })

    test('0', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0',
                    value: 0,
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
            }
        ],
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
    })

    test('3', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '3',
                    value: 3,
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
            }
        ],
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
    })

    test('5', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '5',
                    value: 5,
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
            }
        ],
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
    })

    test('42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '42',
                    value: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
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
                        column: 2
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
                column: 2
            }
        }
    })

    test('.14', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '.14',
                    value: 0.14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
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
                        column: 3
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
                column: 3
            }
        }
    })

    test('3.14159', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '3.14159',
                    value: 3.14159,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('6.02214179e+23', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '6.02214179e+23',
                    value: 6.02214179e+23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
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
                        column: 14
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
                column: 14
            }
        }
    })

    test('1.492417830e-10', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '1.492417830e-10',
                    value: 1.49241783e-10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
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
                        column: 15
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
                column: 15
            }
        }
    })

    test('0x0', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0x0',
                    value: 0,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
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
                        column: 3
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
                column: 3
            }
        }
    })

    test('0e+100', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0e+100',
                    value: 0,
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
    })

    test('0xabc', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0xabc',
                    value: 2748,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('0xdef', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0xdef',
                    value: 3567,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('0X1A', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0X1A',
                    value: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
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
                        column: 4
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
                column: 4
            }
        }
    })

    test('0x10', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0x10',
                    value: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
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
                        column: 4
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
                column: 4
            }
        }
    })

    test('0x100', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0x100',
                    value: 256,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('0X04', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0X04',
                    value: 4,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
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
                        column: 4
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
                column: 4
            }
        }
    })

    test('02', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '02',
                    value: 2,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
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
                        column: 2
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
                column: 2
            }
        }
    })

    test('012', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '012',
                    value: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
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
                        column: 3
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
                column: 3
            }
        }
    })

    test('0012', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '0012',
                    value: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
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
                        column: 4
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
                column: 4
            }
        }
    })

    test('\'Hello\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\'',
                    value: 'Hello',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test("\"\\n\\r\\t\\v\\b\\f\\\\\\'\\\"\\0\"", {
        type: 'Program',
        body: [
            {
                directive: "\\n\\r\\t\\v\\b\\f\\\\\\'\\\"\\0",
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: "\"\\n\\r\\t\\v\\b\\f\\\\\\'\\\"\\0\"",
                    value: "\n\r\t\u000b\b\f\\'\"\u0000",
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
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
                        column: 22
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
                column: 22
            }
        }
    })

    test('\'\\u0061\'', {
        type: 'Program',
        body: [
            {
                directive: '\\u0061',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'\\u0061\'',
                    value: 'a',
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
    })

    test('\'\\x61\'', {
        type: 'Program',
        body: [
            {
                directive: '\\x61',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'\\x61\'',
                    value: 'a',
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
    })

    test('\'Hello\\nworld\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\nworld',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\nworld\'',
                    value: 'Hello\nworld',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
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
                        column: 14
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
                column: 14
            }
        }
    })

    test('\'Hello\\\nworld\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\\nworld',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\\nworld\'',
                    value: 'Helloworld',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 2,
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
                        line: 2,
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
                line: 2,
                column: 6
            }
        }
    })

    test('\'Hello\\\u2028world\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\\u2028world',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 'Helloworld',
                    raw: '\'Hello\\\u2028world\'',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
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
                        column: 14
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
                column: 14
            }
        }
    })

    test('\'Hello\\\u2029world\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\\u2029world',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 'Helloworld',
                    raw: '\'Hello\\\u2029world\'',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
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
                        column: 14
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
                column: 14
            }
        }
    })

    test('\'Hello\\02World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\02World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\02World\'',
                    value: 'Hello\u0002World',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
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
                        column: 15
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
                column: 15
            }
        }
    })

    test('\'Hello\\012World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\012World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\012World\'',
                    value: 'Hello\nWorld',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
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
                        column: 16
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
                column: 16
            }
        }
    })

    test('\'Hello\\122World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\122World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\122World\'',
                    value: 'HelloRWorld',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
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
                        column: 16
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
                column: 16
            }
        }
    })

    test('\'Hello\\0122World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\0122World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\0122World\'',
                    value: 'Hello\n2World',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
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
                        column: 17
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
                column: 17
            }
        }
    })

    test('\'Hello\\312World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\312World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\312World\'',
                    value: 'HelloÊWorld',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
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
                        column: 16
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
                column: 16
            }
        }
    })

    test('\'Hello\\412World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\412World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\412World\'',
                    value: 'Hello!2World',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
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
                        column: 16
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
                column: 16
            }
        }
    })

    test('\'Hello\\812World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\812World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\812World\'',
                    value: 'Hello812World',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
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
                        column: 16
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
                column: 16
            }
        }
    })

    test('\'Hello\\712World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\712World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\712World\'',
                    value: 'Hello92World',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
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
                        column: 16
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
                column: 16
            }
        }
    })

    test('\'Hello\\0World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\0World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\0World\'',
                    value: 'Hello\u0000World',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
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
                        column: 14
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
                column: 14
            }
        }
    })

    test('\'Hello\\\r\nworld\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\\r\nworld',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\\r\nworld\'',
                    value: 'Helloworld',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 2,
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
                        line: 2,
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
                line: 2,
                column: 6
            }
        }
    })

    test('\'Hello\\1World\'', {
        type: 'Program',
        body: [
            {
                directive: 'Hello\\1World',
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    raw: '\'Hello\\1World\'',
                    value: 'Hello\u0001World',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
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
                        column: 14
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
                column: 14
            }
        }
    })

    test(`${_var} x = /[a-z]/i`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '/[a-z]/i',
                            value: /[a-z]/i,
                            regex: {
                                flags: 'i',
                                pattern: '[a-z]'
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 16 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 16 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16 + varDiff
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
                column: 16 + varDiff
            }
        }
    })

    test(`${_var} x = /[x-z]/i`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            value: /[x-z]/i,
                            raw: '/[x-z]/i',
                            regex: {
                                flags: 'i',
                                pattern: '[x-z]'
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 16 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 16 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16 + varDiff
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
                column: 16 + varDiff
            }
        }
    })

    test(`${_var} x = /[a-c]/i`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '/[a-c]/i',
                            value: /[a-c]/i,
                            regex: {
                                flags: 'i',
                                pattern: '[a-c]'
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 16 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 16 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16 + varDiff
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
                column: 16 + varDiff
            }
        }
    })

    test(`${_var} x = /[P QR]/i`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '/[P QR]/i',
                            value: /[P QR]/i,
                            regex: {
                                flags: 'i',
                                pattern: '[P QR]'
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 17 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 17 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17 + varDiff
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
                column: 17 + varDiff
            }
        }
    })

    test(`${_var} x = /foo\\/bar/`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '/foo\\/bar/',
                            value: /foo\/bar/,
                            regex: {
                                flags: '',
                                pattern: 'foo\\/bar'
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 18 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 18 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18 + varDiff
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
                column: 18 + varDiff
            }
        }
    })

    test(`${_var} x = /=([^=\\s])+/g`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '/=([^=\\s])+/g',
                            value: /=([^=\s])+/g,
                            regex: {
                                flags: 'g',
                                pattern: '=([^=\\s])+'
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 21 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 21 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21 + varDiff
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
                column: 21 + varDiff
            }
        }
    })

    testFail(`${_var} x = /[P QR]/\\u0067`, `Unexpected token (1:${16 + varDiff})`)

    test(`${_new} Button`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'Button',
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + newDiff
                            },
                            end: {
                                line: 1,
                                column: 10 + newDiff
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 10 + newDiff
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
                        column: 10 + newDiff
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
                column: 10 + newDiff
            }
        }
    })

    test(`${_new} Button()`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'Button',
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + newDiff
                            },
                            end: {
                                line: 1,
                                column: 10 + newDiff
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12 + newDiff
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
                        column: 12 + newDiff
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
                column: 12 + newDiff
            }
        }
    })

    test(`${_new} ${_new} foo`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'foo',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + newDiff + newDiff
                                },
                                end: {
                                    line: 1,
                                    column: 11 + newDiff + newDiff
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + newDiff
                            },
                            end: {
                                line: 1,
                                column: 11 + newDiff + newDiff
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11 + newDiff + newDiff
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
                        column: 11 + newDiff + newDiff
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
                column: 11 + newDiff + newDiff
            }
        }
    })

    test(`${_new} ${_new} foo()`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'foo',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + newDiff + newDiff
                                },
                                end: {
                                    line: 1,
                                    column: 11 + newDiff + newDiff
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + newDiff
                            },
                            end: {
                                line: 1,
                                column: 13 + newDiff + newDiff
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13 + newDiff + newDiff
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
                        column: 13 + newDiff + newDiff
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
                column: 13 + newDiff + newDiff
            }
        }
    })

    test(`${_new} foo().bar()`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        object: {
                            type: 'NewExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'foo',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4 + newDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 7 + newDiff
                                    }
                                }
                            },
                            arguments: [],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 9 + newDiff
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'bar',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10 + newDiff
                                },
                                end: {
                                    line: 1,
                                    column: 13 + newDiff
                                }
                            }
                        },
                        computed: false,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13 + newDiff
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15 + newDiff
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
                        column: 15 + newDiff
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
                column: 15 + newDiff
            }
        }
    })

    test(`${_new} foo[bar]`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'foo',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + newDiff
                                },
                                end: {
                                    line: 1,
                                    column: 7 + newDiff
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'bar',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + newDiff
                                },
                                end: {
                                    line: 1,
                                    column: 11 + newDiff
                                }
                            }
                        },
                        computed: true,
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + newDiff
                            },
                            end: {
                                line: 1,
                                column: 12 + newDiff
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12 + newDiff
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
                        column: 12 + newDiff
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
                column: 12 + newDiff
            }
        }
    })

    test(`${_new} foo.bar()`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'foo',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + newDiff
                                },
                                end: {
                                    line: 1,
                                    column: 7 + newDiff
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'bar',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + newDiff
                                },
                                end: {
                                    line: 1,
                                    column: 11 + newDiff
                                }
                            }
                        },
                        computed: false,
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + newDiff
                            },
                            end: {
                                line: 1,
                                column: 11 + newDiff
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13 + newDiff
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
                        column: 13 + newDiff
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
                column: 13 + newDiff
            }
        }
    })

    test(`( ${_new} foo).bar()`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        object: {
                            type: 'NewExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'foo',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6 + newDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 9 + newDiff
                                    }
                                }
                            },
                            arguments: [],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 9 + newDiff
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'bar',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11 + newDiff
                                },
                                end: {
                                    line: 1,
                                    column: 14 + newDiff
                                }
                            }
                        },
                        computed: false,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 14 + newDiff
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16 + newDiff
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
                        column: 16 + newDiff
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
                column: 16 + newDiff
            }
        }
    })

    test('foo(bar, baz)', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    arguments: [
                        {
                            type: 'Identifier',
                            name: 'bar',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        },
                        {
                            type: 'Identifier',
                            name: 'baz',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 12
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
                            column: 13
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
                        column: 13
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
                column: 13
            }
        }
    })

    test('(    foo  )()', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    arguments: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13
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
                        column: 13
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
                column: 13
            }
        }
    })

    test('universe.milkyway', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'Identifier',
                        name: 'universe',
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
                    property: {
                        type: 'Identifier',
                        name: 'milkyway',
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
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
                        column: 17
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
                column: 17
            }
        }
    })

    test('universe.milkyway.solarsystem', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'universe',
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
                        property: {
                            type: 'Identifier',
                            name: 'milkyway',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        computed: false,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'solarsystem',
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 29
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
                        column: 29
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
                column: 29
            }
        }
    })

    test('universe.milkyway.solarsystem.Earth', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'MemberExpression',
                        object: {
                            type: 'MemberExpression',
                            object: {
                                type: 'Identifier',
                                name: 'universe',
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
                            property: {
                                type: 'Identifier',
                                name: 'milkyway',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            },
                            computed: false,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'solarsystem',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        },
                        computed: false,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'Earth',
                        loc: {
                            start: {
                                line: 1,
                                column: 30
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
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
                        column: 35
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
                column: 35
            }
        }
    })

    test('universe[galaxyName, otherUselessName]', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'Identifier',
                        name: 'universe',
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
                    property: {
                        type: 'SequenceExpression',
                        expressions: [
                            {
                                type: 'Identifier',
                                name: 'galaxyName',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            {
                                type: 'Identifier',
                                name: 'otherUselessName',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 37
                            }
                        }
                    },
                    computed: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 38
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
                        column: 38
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
                column: 38
            }
        }
    })

    test('universe[galaxyName]', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'Identifier',
                        name: 'universe',
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
                    property: {
                        type: 'Identifier',
                        name: 'galaxyName',
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    },
                    computed: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
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
                        column: 20
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
                column: 20
            }
        }
    })

    test('universe[42].galaxies', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'universe',
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
                        property: {
                            type: 'Literal',
                            raw: '42',
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        },
                        computed: true,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'galaxies',
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
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
                        column: 21
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
                column: 21
            }
        }
    })

    test('universe(42).galaxies', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'universe',
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
                        arguments: [
                            {
                                type: 'Literal',
                                raw: '42',
                                value: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
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
                                column: 12
                            }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'galaxies',
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
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
                        column: 21
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
                column: 21
            }
        }
    })

    test('universe(42).galaxies(14, 3, 77).milkyway', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            object: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'universe',
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
                                arguments: [
                                    {
                                        type: 'Literal',
                                        raw: '42',
                                        value: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 11
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
                                        column: 12
                                    }
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'galaxies',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            computed: false,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Literal',
                                raw: '14',
                                value: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            },
                            {
                                type: 'Literal',
                                raw: '3',
                                value: 3,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            },
                            {
                                type: 'Literal',
                                raw: '77',
                                value: 77,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
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
                                column: 32
                            }
                        }
                    },
                    property: {
                        type: 'Identifier',
                        name: 'milkyway',
                        loc: {
                            start: {
                                line: 1,
                                column: 33
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
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
                        column: 41
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
                column: 41
            }
        }
    })

    test('earth.asia.Indonesia.prepareForElection(2014)', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        object: {
                            type: 'MemberExpression',
                            object: {
                                type: 'MemberExpression',
                                object: {
                                    type: 'Identifier',
                                    name: 'earth',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 0
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                },
                                property: {
                                    type: 'Identifier',
                                    name: 'asia',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                },
                                computed: false,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'Indonesia',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            computed: false,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        },
                        property: {
                            type: 'Identifier',
                            name: 'prepareForElection',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 39
                                }
                            }
                        },
                        computed: false,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 39
                            }
                        }
                    },
                    arguments: [
                        {
                            type: 'Literal',
                            raw: '2014',
                            value: 2014,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 40
                                },
                                end: {
                                    line: 1,
                                    column: 44
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
                            column: 45
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
                        column: 45
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
                column: 45
            }
        }
    })

    test(`universe.${_if}`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'Identifier',
                        name: 'universe',
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
                    property: {
                        type: 'Identifier',
                        name: _if,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 11 + ifDiff
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11 + ifDiff
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
                        column: 11 + ifDiff
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
                column: 11 + ifDiff
            }
        }
    })

    test(`universe.${_true}`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'Identifier',
                        name: 'universe',
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
                    property: {
                        type: 'Identifier',
                        name: _true,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 13 + trueDiff
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13 + trueDiff
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
                        column: 13 + trueDiff
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
                column: 13 + trueDiff
            }
        }
    })

    test(`universe.${_false}`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'Identifier',
                        name: 'universe',
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
                    property: {
                        type: 'Identifier',
                        name: _false,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 14 + falseDiff
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14 + falseDiff
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
                        column: 14 + falseDiff
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
                column: 14 + falseDiff
            }
        }
    })

    test(`universe.${_null}`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'Identifier',
                        name: 'universe',
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
                    property: {
                        type: 'Identifier',
                        name: _null,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 13 + nullDiff
                            }
                        }
                    },
                    computed: false,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13 + nullDiff
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
                        column: 13 + nullDiff
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
                column: 13 + nullDiff
            }
        }
    })

    test('x++', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    prefix: false,
                    argument: {
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
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
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
                        column: 3
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
                column: 3
            }
        }
    })

    test('x--', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '--',
                    prefix: false,
                    argument: {
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
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
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
                        column: 3
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
                column: 3
            }
        }
    })

    test(`${_eval}++`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    prefix: false,
                    argument: {
                        type: 'Identifier',
                        name: _eval,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4 + evalDiff
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
                            column: 6 + evalDiff
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
                        column: 6 + evalDiff
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
                column: 6 + evalDiff
            }
        }
    })

    test(`${_eval}--`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '--',
                    prefix: false,
                    argument: {
                        type: 'Identifier',
                        name: _eval,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4 + evalDiff
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
                            column: 6 + evalDiff
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
                        column: 6 + evalDiff
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
                column: 6 + evalDiff
            }
        }
    })

    test(`${_arguments}++`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    prefix: false,
                    argument: {
                        type: 'Identifier',
                        name: _arguments,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9 + argumentsDiff
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
                            column: 11 + argumentsDiff
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
                        column: 11 + argumentsDiff
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
                column: 11 + argumentsDiff
            }
        }
    })

    test(`${_arguments}--`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '--',
                    prefix: false,
                    argument: {
                        type: 'Identifier',
                        name: _arguments,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9 + argumentsDiff
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
                            column: 11 + argumentsDiff
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
                        column: 11 + argumentsDiff
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
                column: 11 + argumentsDiff
            }
        }
    })

    test('++x', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 3
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
                            column: 3
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
                        column: 3
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
                column: 3
            }
        }
    })

    test('--x', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '--',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 3
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
                            column: 3
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
                        column: 3
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
                column: 3
            }
        }
    })

    test(`++${_eval}`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: _eval,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 6 + evalDiff
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
                            column: 6 + evalDiff
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
                        column: 6 + evalDiff
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
                column: 6 + evalDiff
            }
        }
    })

    test(`--${_eval}`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '--',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: _eval,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 6 + evalDiff
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
                            column: 6 + evalDiff
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
                        column: 6 + evalDiff
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
                column: 6 + evalDiff
            }
        }
    })

    test(`++${_arguments}`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: _arguments,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 11 + argumentsDiff
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
                            column: 11 + argumentsDiff
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
                        column: 11 + argumentsDiff
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
                column: 11 + argumentsDiff
            }
        }
    })

    test(`--${_arguments}`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UpdateExpression',
                    operator: '--',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: _arguments,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 11 + argumentsDiff
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
                            column: 11 + argumentsDiff
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
                        column: 11 + argumentsDiff
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
                column: 11 + argumentsDiff
            }
        }
    })

    test('+x', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '+',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 2
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
                            column: 2
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
                        column: 2
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
                column: 2
            }
        }
    })

    test('-x', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '-',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 2
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
                            column: 2
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
                        column: 2
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
                column: 2
            }
        }
    })

    test('~x', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '~',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 2
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
                            column: 2
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
                        column: 2
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
                column: 2
            }
        }
    })

    test('!x', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '!',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 2
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
                            column: 2
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
                        column: 2
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
                column: 2
            }
        }
    })

    test(`${_void} x`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: 'void',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 5 + voidDiff
                            },
                            end: {
                                line: 1,
                                column: 6 + voidDiff
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
                            column: 6 + voidDiff
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
                        column: 6 + voidDiff
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
                column: 6 + voidDiff
            }
        }
    })

    test(`${_delete} x`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: 'delete',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 7 + deleteDiff
                            },
                            end: {
                                line: 1,
                                column: 8 + deleteDiff
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
                            column: 8 + deleteDiff
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
                        column: 8 + deleteDiff
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
                column: 8 + deleteDiff
            }
        }
    })

    test(`${_typeof} x`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: 'typeof',
                    prefix: true,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 7 + typeofDiff
                            },
                            end: {
                                line: 1,
                                column: 8 + typeofDiff
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
                            column: 8 + typeofDiff
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
                        column: 8 + typeofDiff
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
                column: 8 + typeofDiff
            }
        }
    })

    test('x * y', {
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
                    operator: '*',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x / y', {
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
                    operator: '/',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x % y', {
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
                    operator: '%',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x + y', {
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
                    operator: '+',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x - y', {
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
                    operator: '-',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x << y', {
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
                    operator: '<<',
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
    })

    test('x >> y', {
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
                    operator: '>>',
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
    })

    test('x >>> y', {
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
                    operator: '>>>',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x < y', {
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
                    operator: '<',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x > y', {
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
                    operator: '>',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x <= y', {
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
                    operator: '<=',
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
    })

    test('x >= y', {
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
                    operator: '>=',
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
    })

    test(`x ${_in} y`, {
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
                    operator: 'in',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 5 + inDiff
                            },
                            end: {
                                line: 1,
                                column: 6 + inDiff
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
                            column: 6 + inDiff
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
                        column: 6 + inDiff
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
                column: 6 + inDiff
            }
        }
    })

    test(`x ${_instanceof} y`, {
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
                    operator: 'instanceof',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 13 + instanceofDiff
                            },
                            end: {
                                line: 1,
                                column: 14 + instanceofDiff
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
                            column: 14 + instanceofDiff
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
                        column: 14 + instanceofDiff
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
                column: 14 + instanceofDiff
            }
        }
    })

    test('x < y < z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '<',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '<',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x == y', {
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
                    operator: '==',
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
    })

    test('x != y', {
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
                    operator: '!=',
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
    })

    test('x === y', {
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
                    operator: '===',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x !== y', {
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
                    operator: '!==',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x & y', {
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
                    operator: '&',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x ^ y', {
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
                    operator: '^',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x | y', {
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
                    operator: '|',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
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
                            column: 5
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
                        column: 5
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
                column: 5
            }
        }
    })

    test('x + y + z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '+',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '+',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x - y + z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '-',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '+',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x + y - z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '+',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '-',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x - y - z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '-',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '-',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x + y * z', {
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
                    operator: '+',
                    right: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        operator: '*',
                        right: {
                            type: 'Identifier',
                            name: 'z',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x + y / z', {
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
                    operator: '+',
                    right: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        operator: '/',
                        right: {
                            type: 'Identifier',
                            name: 'z',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x - y % z', {
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
                    operator: '-',
                    right: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        operator: '%',
                        right: {
                            type: 'Identifier',
                            name: 'z',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x * y * z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '*',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '*',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x * y / z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '*',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '/',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x * y % z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '*',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '%',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x % y * z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '%',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '*',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x << y << z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '<<',
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
                    operator: '<<',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 11
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
                            column: 11
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
                        column: 11
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
                column: 11
            }
        }
    })

    test('x | y | z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '|',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '|',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x & y & z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '&',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '&',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x ^ y ^ z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '^',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '^',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x & y | z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
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
                        operator: '&',
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
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
                                column: 5
                            }
                        }
                    },
                    operator: '|',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x | y ^ z', {
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
                    operator: '|',
                    right: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        operator: '^',
                        right: {
                            type: 'Identifier',
                            name: 'z',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x | y & z', {
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
                    operator: '|',
                    right: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        operator: '&',
                        right: {
                            type: 'Identifier',
                            name: 'z',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x || y', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'LogicalExpression',
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
                    operator: '||',
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
    })

    test('x && y', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'LogicalExpression',
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
                    operator: '&&',
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
    })

    test('x || y || z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'LogicalExpression',
                    left: {
                        type: 'LogicalExpression',
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
                        operator: '||',
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
                    operator: '||',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 11
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
                            column: 11
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
                        column: 11
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
                column: 11
            }
        }
    })

    test('x && y && z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'LogicalExpression',
                    left: {
                        type: 'LogicalExpression',
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
                        operator: '&&',
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
                    operator: '&&',
                    right: {
                        type: 'Identifier',
                        name: 'z',
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 11
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
                            column: 11
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
                        column: 11
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
                column: 11
            }
        }
    })

    test('x || y && z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'LogicalExpression',
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
                    operator: '||',
                    right: {
                        type: 'LogicalExpression',
                        left: {
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
                        operator: '&&',
                        right: {
                            type: 'Identifier',
                            name: 'z',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 11
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
                            column: 11
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
                        column: 11
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
                column: 11
            }
        }
    })

    test('x || y ^ z', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'LogicalExpression',
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
                    operator: '||',
                    right: {
                        type: 'BinaryExpression',
                        left: {
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
                        operator: '^',
                        right: {
                            type: 'Identifier',
                            name: 'z',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 10
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
                            column: 10
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
                        column: 10
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
                column: 10
            }
        }
    })

    test('y ? 1 : 2', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ConditionalExpression',
                    test: {
                        type: 'Identifier',
                        name: 'y',
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
                    consequent: {
                        type: 'Literal',
                        raw: '1',
                        value: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    alternate: {
                        type: 'Literal',
                        raw: '2',
                        value: 2,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x && y ? 1 : 2', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ConditionalExpression',
                    test: {
                        type: 'LogicalExpression',
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
                        operator: '&&',
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
                    consequent: {
                        type: 'Literal',
                        raw: '1',
                        value: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    alternate: {
                        type: 'Literal',
                        raw: '2',
                        value: 2,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 14
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
                            column: 14
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
                        column: 14
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
                column: 14
            }
        }
    })

    test('x = 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
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
                                column: 4
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
    })

    test(`${_eval} = 42`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: _eval,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4 + evalDiff
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
                                column: 7 + evalDiff
                            },
                            end: {
                                line: 1,
                                column: 9 + evalDiff
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
                            column: 9 + evalDiff
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
                        column: 9 + evalDiff
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
                column: 9 + evalDiff
            }
        }
    })

    test(`${_arguments} = 42`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: _arguments,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9 + argumentsDiff
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
                                column: 12 + argumentsDiff
                            },
                            end: {
                                line: 1,
                                column: 14 + argumentsDiff
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
                            column: 14 + argumentsDiff
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
                        column: 14 + argumentsDiff
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
                column: 14 + argumentsDiff
            }
        }
    })

    test('x *= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '*=',
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
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x /= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '/=',
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
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x %= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '%=',
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
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x += 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '+=',
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
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x -= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '-=',
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
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x <<= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '<<=',
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
    })

    test('x >>= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '>>=',
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
    })

    test('x >>>= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '>>>=',
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
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 9
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
                            column: 9
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
                        column: 9
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
                column: 9
            }
        }
    })

    test('x &= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '&=',
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
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x ^= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '^=',
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
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('x |= 42', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '|=',
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
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
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
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('{ foo }', {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Identifier',
                            name: 'foo',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 5
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
                        column: 7
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
                column: 7
            }
        }
    })

    test('{ doThis(); doThat(); }', {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'doThis',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            },
                            arguments: [],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'doThat',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            arguments: [],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 21
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
                        column: 23
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
                column: 23
            }
        }
    })

    test('{}', {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
                body: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 2
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
                column: 2
            }
        }
    })

    test(`${_var} x`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 5 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5 + varDiff
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
                column: 5 + varDiff
            }
        }
    })

    test(`${_var} ${_await}`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _await,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 9 + varDiff + awaitDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 9 + varDiff + awaitDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9 + varDiff + awaitDiff
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
                column: 9 + varDiff + awaitDiff
            }
        }
    })

    test(`${_var} x, y;`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 5 + varDiff
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 8 + varDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 7 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 8 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9 + varDiff
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
                column: 9 + varDiff
            }
        }
    })

    test(`${_var} x = 42`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '42',
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 10 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 10 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10 + varDiff
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
                column: 10 + varDiff
            }
        }
    })

    test(`${_var} ${_eval} = 42, ${_arguments} = 42`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _eval,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 8 + varDiff + evalDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '42',
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11 + varDiff + evalDiff
                                },
                                end: {
                                    line: 1,
                                    column: 13 + varDiff + evalDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 13 + varDiff + evalDiff
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _arguments,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15 + varDiff + evalDiff
                                },
                                end: {
                                    line: 1,
                                    column: 24 + varDiff + evalDiff + argumentsDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '42',
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 27 + varDiff + evalDiff + argumentsDiff
                                },
                                end: {
                                    line: 1,
                                    column: 29 + varDiff + evalDiff + argumentsDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 15 + varDiff + evalDiff
                            },
                            end: {
                                line: 1,
                                column: 29 + varDiff + evalDiff + argumentsDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 29 + varDiff + evalDiff + argumentsDiff
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
                column: 29 + varDiff + evalDiff + argumentsDiff
            }
        }
    })

    test(`${_var} x = 14, y = 3, z = 1977`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 5 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '14',
                            value: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 10 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 10 + varDiff
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 13 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '3',
                            value: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 17 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 12 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 17 + varDiff
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'z',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 20 + varDiff
                                }
                            }
                        },
                        init: {
                            type: 'Literal',
                            raw: '1977',
                            value: 1977,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 27 + varDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 19 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 27 + varDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27 + varDiff
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
                column: 27 + varDiff
            }
        }
    })

    test(`${_var} ${_implements}, ${_interface}, ${_package}`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _implements,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 14 + varDiff + implementsDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 14 + varDiff + implementsDiff
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _interface,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16 + varDiff + implementsDiff
                                },
                                end: {
                                    line: 1,
                                    column: 25 + varDiff + implementsDiff + interfaceDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 16 + varDiff + implementsDiff
                            },
                            end: {
                                line: 1,
                                column: 25 + varDiff + implementsDiff + interfaceDiff
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _package,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 27 + varDiff + implementsDiff + interfaceDiff
                                },
                                end: {
                                    line: 1,
                                    column: 34 + varDiff + implementsDiff + interfaceDiff + packageDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 27 + varDiff + implementsDiff + interfaceDiff
                            },
                            end: {
                                line: 1,
                                column: 34 + varDiff + implementsDiff + interfaceDiff + packageDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 34 + varDiff + implementsDiff + interfaceDiff + packageDiff
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
                column: 34 + varDiff + implementsDiff + interfaceDiff + packageDiff
            }
        }
    })

    test(`${_var} ${_private}, ${_protected}, ${_public}, ${_static}`, {
        type: 'Program',
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _private,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4 + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 11 + varDiff + privateDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + varDiff
                            },
                            end: {
                                line: 1,
                                column: 11 + varDiff + privateDiff
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _protected,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13 + varDiff + privateDiff
                                },
                                end: {
                                    line: 1,
                                    column: 22 + varDiff + privateDiff + protectedDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 13 + varDiff + privateDiff
                            },
                            end: {
                                line: 1,
                                column: 22 + varDiff + privateDiff + protectedDiff
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _public,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24 + varDiff + privateDiff + protectedDiff
                                },
                                end: {
                                    line: 1,
                                    column: 30 + varDiff + privateDiff + protectedDiff + publicDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 24 + varDiff + privateDiff + protectedDiff
                            },
                            end: {
                                line: 1,
                                column: 30 + varDiff + privateDiff + protectedDiff + publicDiff
                            }
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: _static,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32 + varDiff + privateDiff + protectedDiff + publicDiff
                                },
                                end: {
                                    line: 1,
                                    column: 38 + varDiff + privateDiff + protectedDiff + publicDiff + staticDiff
                                }
                            }
                        },
                        init: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 32 + varDiff + privateDiff + protectedDiff + publicDiff
                            },
                            end: {
                                line: 1,
                                column: 38 + varDiff + privateDiff + protectedDiff + publicDiff + staticDiff
                            }
                        }
                    }
                ],
                kind: 'var',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 38 + varDiff + privateDiff + protectedDiff + publicDiff + staticDiff
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
                column: 38 + varDiff + privateDiff + protectedDiff + publicDiff + staticDiff
            }
        }
    })

    test(';', {
        type: 'Program',
        body: [
            {
                type: 'EmptyStatement',
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
            }
        ],
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
    })

    test('x', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
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
            }
        ],
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
    })

    test('x, y', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'SequenceExpression',
                    expressions: [
                        {
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
                        {
                            type: 'Identifier',
                            name: 'y',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 4
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
                            column: 4
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
                        column: 4
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
                column: 4
            }
        }
    })

    test('\\u0061', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'a',
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
    })

    test('a\\u0061', {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'aa',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
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
                        column: 7
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
                column: 7
            }
        }
    })

    test(`${_if} (morning) goodMorning()`, {
        type: 'Program',
        body: [
            {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning',
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + ifDiff
                        }
                    }
                },
                consequent: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'goodMorning',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13 + ifDiff
                                },
                                end: {
                                    line: 1,
                                    column: 24 + ifDiff
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 13 + ifDiff
                            },
                            end: {
                                line: 1,
                                column: 26 + ifDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 13 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 26 + ifDiff
                        }
                    }
                },
                alternate: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 26 + ifDiff
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
                column: 26 + ifDiff
            }
        }
    })

    test(`${_if} (morning) (${_function}(){})`, {
        type: 'Program',
        body: [
            {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning',
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + ifDiff
                        }
                    }
                },
                consequent: {
                    type: 'ExpressionStatement',
                    expression: {
                        expression: false,
                        type: 'FunctionExpression',
                        id: null,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24 + ifDiff + functionDiff
                                },
                                end: {
                                    line: 1,
                                    column: 26 + ifDiff + functionDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 14 + ifDiff
                            },
                            end: {
                                line: 1,
                                column: 26 + ifDiff + functionDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 13 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 27 + ifDiff + functionDiff
                        }
                    }
                },
                alternate: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27 + ifDiff + functionDiff
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
                column: 27 + ifDiff + functionDiff
            }
        }
    })

    test(`${_if} (morning) ${_var} x = 0;`, {
        type: 'Program',
        body: [
            {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning',
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + ifDiff
                        }
                    }
                },
                consequent: {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17 + ifDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 18 + ifDiff + varDiff
                                    }
                                }
                            },
                            init: {
                                type: 'Literal',
                                raw: '0',
                                value: 0,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21 + ifDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 22 + ifDiff + varDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17 + ifDiff + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 22 + ifDiff + varDiff
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    loc: {
                        start: {
                            line: 1,
                            column: 13 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 23 + ifDiff + varDiff
                        }
                    }
                },
                alternate: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23 + ifDiff + varDiff
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
                column: 23 + ifDiff + varDiff
            }
        }
    })

    test(`${_if} (morning) ${_function} a(){}`, {
        type: 'Program',
        body: [
            {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning',
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + ifDiff
                        }
                    }
                },
                consequent: {
                    expression: false,
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        loc: {
                            start: {
                                line: 1,
                                column: 22 + ifDiff + functionDiff
                            },
                            end: {
                                line: 1,
                                column: 23 + ifDiff + functionDiff
                            }
                        }
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 25 + ifDiff + functionDiff
                            },
                            end: {
                                line: 1,
                                column: 27 + ifDiff + functionDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 13 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 27 + ifDiff + functionDiff
                        }
                    }
                },
                alternate: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27 + ifDiff + functionDiff
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
                column: 27 + ifDiff + functionDiff
            }
        }
    })

    test(`${_if} (morning) goodMorning(); ${_else} goodDay()`, {
        type: 'Program',
        body: [
            {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'morning',
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + ifDiff
                        }
                    }
                },
                consequent: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'goodMorning',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13 + ifDiff
                                },
                                end: {
                                    line: 1,
                                    column: 24 + ifDiff
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 13 + ifDiff
                            },
                            end: {
                                line: 1,
                                column: 26 + ifDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 13 + ifDiff
                        },
                        end: {
                            line: 1,
                            column: 27 + ifDiff
                        }
                    }
                },
                alternate: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'goodDay',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 33 + ifDiff + elseDiff
                                },
                                end: {
                                    line: 1,
                                    column: 40 + ifDiff + elseDiff
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 33 + ifDiff + elseDiff
                            },
                            end: {
                                line: 1,
                                column: 42 + ifDiff + elseDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 33 + ifDiff + elseDiff
                        },
                        end: {
                            line: 1,
                            column: 42 + ifDiff + elseDiff
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
                        column: 42 + ifDiff + elseDiff
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
                column: 42 + ifDiff + elseDiff
            }
        }
    })

    test(`${_do} keep(); ${_while} (${_true})`, {
        type: 'Program',
        body: [
            {
                type: 'DoWhileStatement',
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'keep',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3 + doDiff
                                },
                                end: {
                                    line: 1,
                                    column: 7 + doDiff
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 3 + doDiff
                            },
                            end: {
                                line: 1,
                                column: 9 + doDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 3 + doDiff
                        },
                        end: {
                            line: 1,
                            column: 10 + doDiff
                        }
                    }
                },
                test: {
                    type: 'Literal',
                    raw: _true,
                    value: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 18 + doDiff + whileDiff
                        },
                        end: {
                            line: 1,
                            column: 22 + doDiff + whileDiff + trueDiff
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
                        column: 23 + doDiff + whileDiff + trueDiff
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
                column: 23 + doDiff + whileDiff + trueDiff
            }
        }
    })

    test(`${_do} keep(); ${_while} (${_true});`, {
        type: 'Program',
        body: [
            {
                type: 'DoWhileStatement',
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'keep',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3 + doDiff
                                },
                                end: {
                                    line: 1,
                                    column: 7 + doDiff
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 3 + doDiff
                            },
                            end: {
                                line: 1,
                                column: 9 + doDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 3 + doDiff
                        },
                        end: {
                            line: 1,
                            column: 10 + doDiff
                        }
                    }
                },
                test: {
                    type: 'Literal',
                    raw: _true,
                    value: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 18 + doDiff + whileDiff
                        },
                        end: {
                            line: 1,
                            column: 22 + doDiff + whileDiff + trueDiff
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
                        column: 24 + doDiff + whileDiff + trueDiff
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
                column: 24 + doDiff + whileDiff + trueDiff
            }
        }
    })

    test(`${_do} { x++; y--; } ${_while} (x < 10)`, {
        type: 'Program',
        body: [
            {
                type: 'DoWhileStatement',
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'UpdateExpression',
                                operator: '++',
                                prefix: false,
                                argument: {
                                    type: 'Identifier',
                                    name: 'x',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5 + doDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 6 + doDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5 + doDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 8 + doDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5 + doDiff
                                },
                                end: {
                                    line: 1,
                                    column: 9 + doDiff
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'UpdateExpression',
                                operator: '--',
                                prefix: false,
                                argument: {
                                    type: 'Identifier',
                                    name: 'y',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10 + doDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 11 + doDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10 + doDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 13 + doDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10 + doDiff
                                },
                                end: {
                                    line: 1,
                                    column: 14 + doDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 3 + doDiff
                        },
                        end: {
                            line: 1,
                            column: 16 + doDiff
                        }
                    }
                },
                test: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 24 + doDiff + whileDiff
                            },
                            end: {
                                line: 1,
                                column: 25 + doDiff + whileDiff
                            }
                        }
                    },
                    operator: '<',
                    right: {
                        type: 'Literal',
                        raw: '10',
                        value: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 28 + doDiff + whileDiff
                            },
                            end: {
                                line: 1,
                                column: 30 + doDiff + whileDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 24 + doDiff + whileDiff
                        },
                        end: {
                            line: 1,
                            column: 30 + doDiff + whileDiff
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
                        column: 31 + doDiff + whileDiff
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
                column: 31 + doDiff + whileDiff
            }
        }
    })

    test(`{ ${_do} { } ${_while} (${_false});${_false} }`, {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'DoWhileStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5 + doDiff
                                },
                                end: {
                                    line: 1,
                                    column: 8 + doDiff
                                }
                            }
                        },
                        test: {
                            type: 'Literal',
                            raw: _false,
                            value: false,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16 + doDiff + whileDiff
                                },
                                end: {
                                    line: 1,
                                    column: 21 + doDiff + whileDiff + falseDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 23 + doDiff + whileDiff + falseDiff
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            raw: _false,
                            value: false,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23 + doDiff + whileDiff + falseDiff
                                },
                                end: {
                                    line: 1,
                                    column: 28 + doDiff + whileDiff + falseDiff + falseDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 23 + doDiff + whileDiff + falseDiff
                            },
                            end: {
                                line: 1,
                                column: 28 + doDiff + whileDiff + falseDiff + falseDiff
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
                        column: 30 + doDiff + whileDiff + falseDiff + falseDiff
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
                column: 30 + doDiff + whileDiff + falseDiff + falseDiff
            }
        }
    })

    test(`${_while} (${_true}) doSomething()`, {
        type: 'Program',
        body: [
            {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    raw: _true,
                    value: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 7 + whileDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + whileDiff + trueDiff
                        }
                    }
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'doSomething',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13 + whileDiff + trueDiff
                                },
                                end: {
                                    line: 1,
                                    column: 24 + whileDiff + trueDiff
                                }
                            }
                        },
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 13 + whileDiff + trueDiff
                            },
                            end: {
                                line: 1,
                                column: 26 + whileDiff + trueDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 13 + whileDiff + trueDiff
                        },
                        end: {
                            line: 1,
                            column: 26 + whileDiff + trueDiff
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
                        column: 26 + whileDiff + trueDiff
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
                column: 26 + whileDiff + trueDiff
            }
        }
    })

    test(`${_while} (x < 10) { x++; y--; }`, {
        type: 'Program',
        body: [
            {
                type: 'WhileStatement',
                test: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 7 + whileDiff
                            },
                            end: {
                                line: 1,
                                column: 8 + whileDiff
                            }
                        }
                    },
                    operator: '<',
                    right: {
                        type: 'Literal',
                        raw: '10',
                        value: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 11 + whileDiff
                            },
                            end: {
                                line: 1,
                                column: 13 + whileDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 7 + whileDiff
                        },
                        end: {
                            line: 1,
                            column: 13 + whileDiff
                        }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'UpdateExpression',
                                operator: '++',
                                prefix: false,
                                argument: {
                                    type: 'Identifier',
                                    name: 'x',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17 + whileDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 18 + whileDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17 + whileDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 20 + whileDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17 + whileDiff
                                },
                                end: {
                                    line: 1,
                                    column: 21 + whileDiff
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'UpdateExpression',
                                operator: '--',
                                prefix: false,
                                argument: {
                                    type: 'Identifier',
                                    name: 'y',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22 + whileDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 23 + whileDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22 + whileDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 25 + whileDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22 + whileDiff
                                },
                                end: {
                                    line: 1,
                                    column: 26 + whileDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 15 + whileDiff
                        },
                        end: {
                            line: 1,
                            column: 28 + whileDiff
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
                        column: 28 + whileDiff
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
                column: 28 + whileDiff
            }
        }
    })

    test(`${_for}(;;);`, {
        type: 'Program',
        body: [
            {
                type: 'ForStatement',
                init: null,
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement',
                    loc: {
                        start: {
                            line: 1,
                            column: 7 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 8 + forDiff
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
                        column: 8 + forDiff
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
                column: 8 + forDiff
            }
        }
    })

    test(`${_for}(;;){}`, {
        type: 'Program',
        body: [
            {
                type: 'ForStatement',
                init: null,
                test: null,
                update: null,
                body: {
                    type: 'BlockStatement',
                    body: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 7 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 9 + forDiff
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
                        column: 9 + forDiff
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
                column: 9 + forDiff
            }
        }
    })

    test(`${_for}(x = 0;;);`, {
        type: 'Program',
        body: [
            {
                type: 'ForStatement',
                init: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 5 + forDiff
                            }
                        }
                    },
                    right: {
                        type: 'Literal',
                        raw: '0',
                        value: 0,
                        loc: {
                            start: {
                                line: 1,
                                column: 8 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 9 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 9 + forDiff
                        }
                    }
                },
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement',
                    loc: {
                        start: {
                            line: 1,
                            column: 12 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 13 + forDiff
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
                        column: 13 + forDiff
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
                column: 13 + forDiff
            }
        }
    })

    test(`${_for}(${_var} x = 0;;);`, {
        type: 'Program',
        body: [
            {
                type: 'ForStatement',
                init: {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 9 + forDiff + varDiff
                                    }
                                }
                            },
                            init: {
                                type: 'Literal',
                                raw: '0',
                                value: 0,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 13 + forDiff + varDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + forDiff + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 13 + forDiff + varDiff
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 13 + forDiff + varDiff
                        }
                    }
                },
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement',
                    loc: {
                        start: {
                            line: 1,
                            column: 16 + forDiff + varDiff
                        },
                        end: {
                            line: 1,
                            column: 17 + forDiff + varDiff
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
                        column: 17 + forDiff + varDiff
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
                column: 17 + forDiff + varDiff
            }
        }
    })

    test(`${_for}(${_var} x = 0, y = 1;;);`, {
        type: 'Program',
        body: [
            {
                type: 'ForStatement',
                init: {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 9 + forDiff + varDiff
                                    }
                                }
                            },
                            init: {
                                type: 'Literal',
                                raw: '0',
                                value: 0,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 13 + forDiff + varDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8 + forDiff + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 13 + forDiff + varDiff
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'y',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 16 + forDiff + varDiff
                                    }
                                }
                            },
                            init: {
                                type: 'Literal',
                                raw: '1',
                                value: 1,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 20 + forDiff + varDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15 + forDiff + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 20 + forDiff + varDiff
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 20 + forDiff + varDiff
                        }
                    }
                },
                test: null,
                update: null,
                body: {
                    type: 'EmptyStatement',
                    loc: {
                        start: {
                            line: 1,
                            column: 23 + forDiff + varDiff
                        },
                        end: {
                            line: 1,
                            column: 24 + forDiff + varDiff
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
                        column: 24 + forDiff + varDiff
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
                column: 24 + forDiff + varDiff
            }
        }
    })

    test(`${_for}(x = 0; x < 42;);`, {
        type: 'Program',
        body: [
            {
                type: 'ForStatement',
                init: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 5 + forDiff
                            }
                        }
                    },
                    right: {
                        type: 'Literal',
                        raw: '0',
                        value: 0,
                        loc: {
                            start: {
                                line: 1,
                                column: 8 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 9 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 9 + forDiff
                        }
                    }
                },
                test: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 11 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 12 + forDiff
                            }
                        }
                    },
                    operator: '<',
                    right: {
                        type: 'Literal',
                        raw: '42',
                        value: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 15 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 17 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 11 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 17 + forDiff
                        }
                    }
                },
                update: null,
                body: {
                    type: 'EmptyStatement',
                    loc: {
                        start: {
                            line: 1,
                            column: 19 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 20 + forDiff
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
                        column: 20 + forDiff
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
                column: 20 + forDiff
            }
        }
    })

    test(`${_for}(x = 0; x < 42; x++);`, {
        type: 'Program',
        body: [
            {
                type: 'ForStatement',
                init: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 5 + forDiff
                            }
                        }
                    },
                    right: {
                        type: 'Literal',
                        raw: '0',
                        value: 0,
                        loc: {
                            start: {
                                line: 1,
                                column: 8 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 9 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 9 + forDiff
                        }
                    }
                },
                test: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 11 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 12 + forDiff
                            }
                        }
                    },
                    operator: '<',
                    right: {
                        type: 'Literal',
                        raw: '42',
                        value: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 15 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 17 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 11 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 17 + forDiff
                        }
                    }
                },
                update: {
                    type: 'UpdateExpression',
                    operator: '++',
                    prefix: false,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 19 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 20 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 19 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 22 + forDiff
                        }
                    }
                },
                body: {
                    type: 'EmptyStatement',
                    loc: {
                        start: {
                            line: 1,
                            column: 23 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 24 + forDiff
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
                        column: 24 + forDiff
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
                column: 24 + forDiff
            }
        }
    })

    test(`${_for}(x = 0; x < 42; x++) process(x);`, {
        type: 'Program',
        body: [
            {
                type: 'ForStatement',
                init: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 4 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 5 + forDiff
                            }
                        }
                    },
                    right: {
                        type: 'Literal',
                        raw: '0',
                        value: 0,
                        loc: {
                            start: {
                                line: 1,
                                column: 8 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 9 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 9 + forDiff
                        }
                    }
                },
                test: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 11 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 12 + forDiff
                            }
                        }
                    },
                    operator: '<',
                    right: {
                        type: 'Literal',
                        raw: '42',
                        value: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 15 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 17 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 11 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 17 + forDiff
                        }
                    }
                },
                update: {
                    type: 'UpdateExpression',
                    operator: '++',
                    prefix: false,
                    argument: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 19 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 20 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 19 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 22 + forDiff
                        }
                    }
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24 + forDiff
                                },
                                end: {
                                    line: 1,
                                    column: 31 + forDiff
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32 + forDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 33 + forDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 24 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 34 + forDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 24 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 35 + forDiff
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
                        column: 35 + forDiff
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
                column: 35 + forDiff
            }
        }
    })

    test(`${_for}(x ${_in} list) process(x);`, {
        type: 'Program',
        body: [
            {
                type: 'ForInStatement',
                left: {
                    type: 'Identifier',
                    name: 'x',
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 5 + forDiff
                        }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'list',
                    loc: {
                        start: {
                            line: 1,
                            column: 9 + forDiff + inDiff
                        },
                        end: {
                            line: 1,
                            column: 13 + forDiff + inDiff
                        }
                    }
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15 + forDiff + inDiff
                                },
                                end: {
                                    line: 1,
                                    column: 22 + forDiff + inDiff
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23 + forDiff + inDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 24 + forDiff + inDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 15 + forDiff + inDiff
                            },
                            end: {
                                line: 1,
                                column: 25 + forDiff + inDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 15 + forDiff + inDiff
                        },
                        end: {
                            line: 1,
                            column: 26 + forDiff + inDiff
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
                        column: 26 + forDiff + inDiff
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
                column: 26 + forDiff + inDiff
            }
        }
    })

    test(`${_for} (${_var} x ${_in} list) process(x);`, {
        type: 'Program',
        body: [
            {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 10 + forDiff + varDiff
                                    }
                                }
                            },
                            init: null,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9 + forDiff + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 10 + forDiff + varDiff
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    loc: {
                        start: {
                            line: 1,
                            column: 5 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 10 + forDiff + varDiff
                        }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'list',
                    loc: {
                        start: {
                            line: 1,
                            column: 14 + forDiff + varDiff + inDiff
                        },
                        end: {
                            line: 1,
                            column: 18 + forDiff + varDiff + inDiff
                        }
                    }
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20 + forDiff + varDiff + inDiff
                                },
                                end: {
                                    line: 1,
                                    column: 27 + forDiff + varDiff + inDiff
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28 + forDiff + varDiff + inDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 29 + forDiff + varDiff + inDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 20 + forDiff + varDiff + inDiff
                            },
                            end: {
                                line: 1,
                                column: 30 + forDiff + varDiff + inDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 20 + forDiff + varDiff + inDiff
                        },
                        end: {
                            line: 1,
                            column: 31 + forDiff + varDiff + inDiff
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
                        column: 31 + forDiff + varDiff + inDiff
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
                column: 31 + forDiff + varDiff + inDiff
            }
        }
    })

    testFail(`${_var} x; ${_for} (x = 0 ${_in} list) process(x);`, `Invalid left-hand side in for-loop (1:${12 + varDiff + forDiff})`, { ecmaVersion: 6 })
    testFail(`'use strict'; ${_for} (${_var} x = 0 ${_in} list) process(x);`, `for-in loop variable declaration may not have an initializer (1:${19 + forDiff})`)
    testFail(`${_for} (${_var} [x] = 0 ${_in} list) process(x);`, `for-in loop variable declaration may not have an initializer (1:${5 + forDiff})`, { ecmaVersion: 6 })
    testFail(`${_for} (${_var} {x} = 0 ${_in} list) process(x);`, `for-in loop variable declaration may not have an initializer (1:${5 + forDiff})`, { ecmaVersion: 6 })
    testFail(`${_for} (${_var} x = 42 ${_in} list) process(x);`, `for-in loop variable declaration may not have an initializer (1:${5 + forDiff})`, { ecmaVersion: 6 })

    test(`${_for} (${_var} x = 42 ${_in} list) process(x);`, {
        type: 'Program',
        body: [
            {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 10 + forDiff + varDiff
                                    }
                                }
                            },
                            init: {
                                type: 'Literal',
                                raw: '42',
                                value: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 15 + forDiff + varDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9 + forDiff + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 15 + forDiff + varDiff
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    loc: {
                        start: {
                            line: 1,
                            column: 5 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 15 + forDiff + varDiff
                        }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'list',
                    loc: {
                        start: {
                            line: 1,
                            column: 19 + forDiff + varDiff + inDiff
                        },
                        end: {
                            line: 1,
                            column: 23 + forDiff + varDiff + inDiff
                        }
                    }
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25 + forDiff + varDiff + inDiff
                                },
                                end: {
                                    line: 1,
                                    column: 32 + forDiff + varDiff + inDiff
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33 + forDiff + varDiff + inDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 34 + forDiff + varDiff + inDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 25 + forDiff + varDiff + inDiff
                            },
                            end: {
                                line: 1,
                                column: 35 + forDiff + varDiff + inDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 25 + forDiff + varDiff + inDiff
                        },
                        end: {
                            line: 1,
                            column: 36 + forDiff + varDiff + inDiff
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
                        column: 36 + forDiff + varDiff + inDiff
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
                column: 36 + forDiff + varDiff + inDiff
            }
        }
    }, { ecmaVersion: 8, locations: true });

    test(`${_for} (${_var} i = ${_function}() { ${_return} 10 ${_in} [] } ${_in} list) process(x);`, {
        type: 'Program',
        body: [
            {
                type: 'ForInStatement',
                left: {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            id: {
                                type: 'Identifier',
                                name: 'i',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 10 + forDiff + varDiff
                                    }
                                }
                            },
                            init: {
                                async: false,
                                generator: false,
                                expression: false,
                                type: 'FunctionExpression',
                                id: null,
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'Literal',
                                                    raw: '10',
                                                    value: 10,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 33 + forDiff + varDiff + functionDiff + returnDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 35 + forDiff + varDiff + functionDiff + returnDiff
                                                        }
                                                    }
                                                },
                                                operator: 'in',
                                                right: {
                                                    type: 'ArrayExpression',
                                                    elements: [],
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 39 + forDiff + varDiff + functionDiff + returnDiff + inDiff
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 41 + forDiff + varDiff + functionDiff + returnDiff + inDiff
                                                        }
                                                    }
                                                },
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33 + forDiff + varDiff + functionDiff + returnDiff
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 41 + forDiff + varDiff + functionDiff + returnDiff + inDiff
                                                    }
                                                }
                                            },
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 26 + forDiff + varDiff + functionDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 41 + forDiff + varDiff + functionDiff + returnDiff + inDiff
                                                }
                                            }
                                        }
                                    ],
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24 + forDiff + varDiff + functionDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 43 + forDiff + varDiff + functionDiff + returnDiff + inDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13 + forDiff + varDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 43 + forDiff + varDiff + functionDiff + returnDiff + inDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9 + forDiff + varDiff
                                },
                                end: {
                                    line: 1,
                                    column: 43 + forDiff + varDiff + functionDiff + returnDiff + inDiff
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    loc: {
                        start: {
                            line: 1,
                            column: 5 + forDiff
                        },
                        end: {
                            line: 1,
                            column: 43 + forDiff + varDiff + functionDiff + returnDiff + inDiff
                        }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'list',
                    loc: {
                        start: {
                            line: 1,
                            column: 47 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
                        },
                        end: {
                            line: 1,
                            column: 51 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
                        }
                    }
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 53 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
                                },
                                end: {
                                    line: 1,
                                    column: 60 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 61 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 62 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 53 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
                            },
                            end: {
                                line: 1,
                                column: 63 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 53 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
                        },
                        end: {
                            line: 1,
                            column: 64 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
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
                        column: 64 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
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
                column: 64 + forDiff + varDiff + functionDiff + returnDiff + inDiff + inDiff
            }
        }
    }, { ecmaVersion: 8, locations: true });

    test(`${_while} (${_true}) { ${_continue}; }`, {
        type: 'Program',
        body: [
            {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    raw: _true,
                    value: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 7 + whileDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + whileDiff + trueDiff
                        }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ContinueStatement',
                            label: null,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15 + whileDiff + trueDiff
                                },
                                end: {
                                    line: 1,
                                    column: 24 + whileDiff + trueDiff + continueDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 13 + whileDiff + trueDiff
                        },
                        end: {
                            line: 1,
                            column: 26 + whileDiff + trueDiff + continueDiff
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
                        column: 26 + whileDiff + trueDiff + continueDiff
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
                column: 26 + whileDiff + trueDiff + continueDiff
            }
        }
    })

    test(`${_while} (${_true}) { ${_continue} }`, {
        type: 'Program',
        body: [
            {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    raw: _true,
                    value: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 7 + whileDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + whileDiff + trueDiff
                        }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ContinueStatement',
                            label: null,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15 + whileDiff + trueDiff
                                },
                                end: {
                                    line: 1,
                                    column: 23 + whileDiff + trueDiff + continueDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 13 + whileDiff + trueDiff
                        },
                        end: {
                            line: 1,
                            column: 25 + whileDiff + trueDiff + continueDiff
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
                        column: 25 + whileDiff + trueDiff + continueDiff
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
                column: 25 + whileDiff + trueDiff + continueDiff
            }
        }
    })

    test(`done: ${_while} (${_true}) { ${_continue} done }`, {
        type: 'Program',
        body: [
            {
                type: 'LabeledStatement',
                body: {
                    type: 'WhileStatement',
                    test: {
                        type: 'Literal',
                        raw: _true,
                        value: true,
                        loc: {
                            start: {
                                line: 1,
                                column: 13 + whileDiff
                            },
                            end: {
                                line: 1,
                                column: 17 + whileDiff + trueDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ContinueStatement',
                                label: {
                                    type: 'Identifier',
                                    name: 'done',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30 + whileDiff + trueDiff + continueDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 34 + whileDiff + trueDiff + continueDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21 + whileDiff + trueDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 34 + whileDiff + trueDiff + continueDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 19 + whileDiff + trueDiff
                            },
                            end: {
                                line: 1,
                                column: 36 + whileDiff + trueDiff + continueDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 36 + whileDiff + trueDiff + continueDiff
                        }
                    }
                },
                label: {
                    type: 'Identifier',
                    name: 'done',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
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
                        column: 36 + whileDiff + trueDiff + continueDiff
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
                column: 36 + whileDiff + trueDiff + continueDiff
            }
        }
    })

    test(`done: ${_while} (${_true}) { ${_continue} done; }`, {
        type: 'Program',
        body: [
            {
                type: 'LabeledStatement',
                body: {
                    type: 'WhileStatement',
                    test: {
                        type: 'Literal',
                        raw: _true,
                        value: true,
                        loc: {
                            start: {
                                line: 1,
                                column: 13 + whileDiff
                            },
                            end: {
                                line: 1,
                                column: 17 + whileDiff + trueDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ContinueStatement',
                                label: {
                                    type: 'Identifier',
                                    name: 'done',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30 + whileDiff + trueDiff + continueDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 34 + whileDiff + trueDiff + continueDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21 + whileDiff + trueDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 35 + whileDiff + trueDiff + continueDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 19 + whileDiff + trueDiff
                            },
                            end: {
                                line: 1,
                                column: 37 + whileDiff + trueDiff + continueDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 37 + whileDiff + trueDiff + continueDiff
                        }
                    }
                },
                label: {
                    type: 'Identifier',
                    name: 'done',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
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
                        column: 37 + whileDiff + trueDiff + continueDiff
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
                column: 37 + whileDiff + trueDiff + continueDiff
            }
        }
    })

    test(`${_while} (${_true}) { ${_break} }`, {
        type: 'Program',
        body: [
            {
                type: 'WhileStatement',
                test: {
                    type: 'Literal',
                    raw: _true,
                    value: true,
                    loc: {
                        start: {
                            line: 1,
                            column: 7 + whileDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + whileDiff + trueDiff
                        }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'BreakStatement',
                            label: null,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15 + whileDiff + trueDiff
                                },
                                end: {
                                    line: 1,
                                    column: 20 + whileDiff + trueDiff + breakDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 13 + whileDiff + trueDiff
                        },
                        end: {
                            line: 1,
                            column: 22 + whileDiff + trueDiff + breakDiff
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
                        column: 22 + whileDiff + trueDiff + breakDiff
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
                column: 22 + whileDiff + trueDiff + breakDiff
            }
        }
    })

    test(`done: ${_while} (${_true}) { ${_break} done }`, {
        type: 'Program',
        body: [
            {
                type: 'LabeledStatement',
                body: {
                    type: 'WhileStatement',
                    test: {
                        type: 'Literal',
                        raw: _true,
                        value: true,
                        loc: {
                            start: {
                                line: 1,
                                column: 13 + whileDiff
                            },
                            end: {
                                line: 1,
                                column: 17 + whileDiff + trueDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'BreakStatement',
                                label: {
                                    type: 'Identifier',
                                    name: 'done',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27 + whileDiff + trueDiff + breakDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 31 + whileDiff + trueDiff + breakDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21 + whileDiff + trueDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 31 + whileDiff + trueDiff + breakDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 19 + whileDiff + trueDiff
                            },
                            end: {
                                line: 1,
                                column: 33 + whileDiff + trueDiff + breakDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 33 + whileDiff + trueDiff + breakDiff
                        }
                    }
                },
                label: {
                    type: 'Identifier',
                    name: 'done',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
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
                        column: 33 + whileDiff + trueDiff + breakDiff
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
                column: 33 + whileDiff + trueDiff + breakDiff
            }
        }
    })

    test(`done: ${_while} (${_true}) { ${_break} done; }`, {
        type: 'Program',
        body: [
            {
                type: 'LabeledStatement',
                body: {
                    type: 'WhileStatement',
                    test: {
                        type: 'Literal',
                        raw: _true,
                        value: true,
                        loc: {
                            start: {
                                line: 1,
                                column: 13 + whileDiff
                            },
                            end: {
                                line: 1,
                                column: 17 + whileDiff + trueDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'BreakStatement',
                                label: {
                                    type: 'Identifier',
                                    name: 'done',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27 + whileDiff + trueDiff + breakDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 31 + whileDiff + trueDiff + breakDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21 + whileDiff + trueDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 32 + whileDiff + trueDiff + breakDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 19 + whileDiff + trueDiff
                            },
                            end: {
                                line: 1,
                                column: 34 + whileDiff + trueDiff + breakDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 34 + whileDiff + trueDiff + breakDiff
                        }
                    }
                },
                label: {
                    type: 'Identifier',
                    name: 'done',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
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
                        column: 34 + whileDiff + trueDiff + breakDiff
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
                column: 34 + whileDiff + trueDiff + breakDiff
            }
        }
    })

    test(`done: ${_switch} (a) { ${_default}: ${_break} done }`, {
        type: 'Program',
        start: 0,
        end: 40 + switchDiff + defaultDiff + breakDiff,
        body: [
            {
                type: 'LabeledStatement',
                start: 0,
                end: 40 + switchDiff + defaultDiff + breakDiff,
                body: {
                    type: 'SwitchStatement',
                    start: 6,
                    end: 40 + switchDiff + defaultDiff + breakDiff,
                    discriminant: {
                        type: 'Identifier',
                        start: 14 + switchDiff,
                        end: 15 + switchDiff,
                        name: 'a'
                    },
                    cases: [
                        {
                            type: 'SwitchCase',
                            start: 19 + switchDiff,
                            end: 38 + switchDiff + defaultDiff + breakDiff,
                            consequent: [
                                {
                                    type: 'BreakStatement',
                                    start: 28 + switchDiff + defaultDiff,
                                    end: 38 + switchDiff + defaultDiff + breakDiff,
                                    label: {
                                        type: 'Identifier',
                                        start: 34 + switchDiff + defaultDiff + breakDiff,
                                        end: 38 + switchDiff + defaultDiff + breakDiff,
                                        name: 'done'
                                    }
                                }
                            ],
                            test: null
                        }
                    ]
                },
                label: {
                    type: 'Identifier',
                    start: 0,
                    end: 4,
                    name: 'done'
                }
            }
        ]
    }, { locations: false })

    test(`target1: target2: ${_while} (${_true}) { ${_continue} target1; }`, {})
    test(`target1: target2: target3: ${_while} (${_true}) { ${_continue} target1; }`, {})

    test(`(${_function}(){ ${_return} })`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    expression: false,
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: null,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13 + functionDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 19 + functionDiff + returnDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 11 + functionDiff
                            },
                            end: {
                                line: 1,
                                column: 21 + functionDiff + returnDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 21 + functionDiff + returnDiff
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
                        column: 22 + functionDiff + returnDiff
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
                column: 22 + functionDiff + returnDiff
            }
        }
    })

    test(`(${_function}(){ ${_return}; })`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    expression: false,
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: null,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13 + functionDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 20 + functionDiff + returnDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 11 + functionDiff
                            },
                            end: {
                                line: 1,
                                column: 22 + functionDiff + returnDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 22 + functionDiff + returnDiff
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
                        column: 23 + functionDiff + returnDiff
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
                column: 23 + functionDiff + returnDiff
            }
        }
    })

    test(`(${_function}(){ ${_return} x; })`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    expression: false,
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'x',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20 + functionDiff + returnDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 21 + functionDiff + returnDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13 + functionDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 22 + functionDiff + returnDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 11 + functionDiff
                            },
                            end: {
                                line: 1,
                                column: 24 + functionDiff + returnDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 24 + functionDiff + returnDiff
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
                        column: 25 + functionDiff + returnDiff
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
                column: 25 + functionDiff + returnDiff
            }
        }
    })

    test(`(${_function}(){ ${_return} x * y })`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    expression: false,
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20 + functionDiff + returnDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 21 + functionDiff + returnDiff
                                            }
                                        }
                                    },
                                    operator: '*',
                                    right: {
                                        type: 'Identifier',
                                        name: 'y',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24 + functionDiff + returnDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 25 + functionDiff + returnDiff
                                            }
                                        }
                                    },
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20 + functionDiff + returnDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 25 + functionDiff + returnDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13 + functionDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 25 + functionDiff + returnDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 11 + functionDiff
                            },
                            end: {
                                line: 1,
                                column: 27 + functionDiff + returnDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 27 + functionDiff + returnDiff
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
                        column: 28 + functionDiff + returnDiff
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
                column: 28 + functionDiff + returnDiff
            }
        }
    })

    test(`${_with} (x) foo = bar`, {
        type: 'Program',
        body: [
            {
                type: 'WithStatement',
                object: {
                    type: 'Identifier',
                    name: 'x',
                    loc: {
                        start: {
                            line: 1,
                            column: 6 + withDiff
                        },
                        end: {
                            line: 1,
                            column: 7 + withDiff
                        }
                    }
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            name: 'foo',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9 + withDiff
                                },
                                end: {
                                    line: 1,
                                    column: 12 + withDiff
                                }
                            }
                        },
                        right: {
                            type: 'Identifier',
                            name: 'bar',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15 + withDiff
                                },
                                end: {
                                    line: 1,
                                    column: 18 + withDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 9 + withDiff
                            },
                            end: {
                                line: 1,
                                column: 18 + withDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 9 + withDiff
                        },
                        end: {
                            line: 1,
                            column: 18 + withDiff
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
                        column: 18 + withDiff
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
                column: 18 + withDiff
            }
        }
    })

    test(`${_with} (x) foo = bar;`, {
        type: 'Program',
        body: [
            {
                type: 'WithStatement',
                object: {
                    type: 'Identifier',
                    name: 'x',
                    loc: {
                        start: {
                            line: 1,
                            column: 6 + withDiff
                        },
                        end: {
                            line: 1,
                            column: 7 + withDiff
                        }
                    }
                },
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                            type: 'Identifier',
                            name: 'foo',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9 + withDiff
                                },
                                end: {
                                    line: 1,
                                    column: 12 + withDiff
                                }
                            }
                        },
                        right: {
                            type: 'Identifier',
                            name: 'bar',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15 + withDiff
                                },
                                end: {
                                    line: 1,
                                    column: 18 + withDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 9 + withDiff
                            },
                            end: {
                                line: 1,
                                column: 18 + withDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 9 + withDiff
                        },
                        end: {
                            line: 1,
                            column: 19 + withDiff
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
                        column: 19 + withDiff
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
                column: 19 + withDiff
            }
        }
    })

    // Test that innocuous string that evaluates to `use strict` is not promoted to
    // Use Strict directive.
    test(`'use\\x20strict'; ${_with} (x) foo = bar;`, {})

    // Test that innocuous string that evaluates to `use strict` is not promoted to
    // Use Strict directive.
    test(`"use\\x20strict"; ${_with} (x) foo = bar;`, {})

    test(`${_with} (x) { foo = bar }`, {
        type: 'Program',
        body: [
            {
                type: 'WithStatement',
                object: {
                    type: 'Identifier',
                    name: 'x',
                    loc: {
                        start: {
                            line: 1,
                            column: 6 + withDiff
                        },
                        end: {
                            line: 1,
                            column: 7 + withDiff
                        }
                    }
                },
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'AssignmentExpression',
                                operator: '=',
                                left: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11 + withDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 14 + withDiff
                                        }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'bar',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17 + withDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 20 + withDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11 + withDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 20 + withDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11 + withDiff
                                },
                                end: {
                                    line: 1,
                                    column: 20 + withDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 9 + withDiff
                        },
                        end: {
                            line: 1,
                            column: 22 + withDiff
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
                        column: 22 + withDiff
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
                column: 22 + withDiff
            }
        }
    })

    test(`${_switch} (x) {}`, {
        type: 'Program',
        body: [
            {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'x',
                    loc: {
                        start: {
                            line: 1,
                            column: 8 + switchDiff
                        },
                        end: {
                            line: 1,
                            column: 9 + switchDiff
                        }
                    }
                },
                cases: [],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13 + switchDiff
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
                column: 13 + switchDiff
            }
        }
    })

    test(`${_switch} (answer) { ${_case} 42: hi(); ${_break}; }`, {
        type: 'Program',
        body: [
            {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer',
                    loc: {
                        start: {
                            line: 1,
                            column: 8 + switchDiff
                        },
                        end: {
                            line: 1,
                            column: 14 + switchDiff
                        }
                    }
                },
                cases: [
                    {
                        type: 'SwitchCase',
                        consequent: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'hi',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27 + switchDiff + caseDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 29 + switchDiff + caseDiff
                                            }
                                        }
                                    },
                                    arguments: [],
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27 + switchDiff + caseDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 31 + switchDiff + caseDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 27 + switchDiff + caseDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 32 + switchDiff + caseDiff
                                    }
                                }
                            },
                            {
                                type: 'BreakStatement',
                                label: null,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33 + switchDiff + caseDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 39 + switchDiff + caseDiff + breakDiff
                                    }
                                }
                            }
                        ],
                        test: {
                            type: 'Literal',
                            raw: '42',
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23 + switchDiff + caseDiff
                                },
                                end: {
                                    line: 1,
                                    column: 25 + switchDiff + caseDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 18 + switchDiff
                            },
                            end: {
                                line: 1,
                                column: 39 + switchDiff + caseDiff + breakDiff
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
                        column: 41 + switchDiff + caseDiff + breakDiff
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
                column: 41 + switchDiff + caseDiff + breakDiff
            }
        }
    })

    test(`${_switch} (answer) { ${_case} 42: hi(); ${_break}; ${_default}: ${_break} }`, {
        type: 'Program',
        body: [
            {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer',
                    loc: {
                        start: {
                            line: 1,
                            column: 8 + switchDiff
                        },
                        end: {
                            line: 1,
                            column: 14 + switchDiff
                        }
                    }
                },
                cases: [
                    {
                        type: 'SwitchCase',
                        consequent: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'hi',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27 + switchDiff + caseDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 29 + switchDiff + caseDiff
                                            }
                                        }
                                    },
                                    arguments: [],
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27 + switchDiff + caseDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 31 + switchDiff + caseDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 27 + switchDiff + caseDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 32 + switchDiff + caseDiff
                                    }
                                }
                            },
                            {
                                type: 'BreakStatement',
                                label: null,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33 + switchDiff + caseDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 39 + switchDiff + caseDiff + breakDiff
                                    }
                                }
                            }
                        ],
                        test: {
                            type: 'Literal',
                            raw: '42',
                            value: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23 + switchDiff + caseDiff
                                },
                                end: {
                                    line: 1,
                                    column: 25 + switchDiff + caseDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 18 + switchDiff
                            },
                            end: {
                                line: 1,
                                column: 39 + switchDiff + caseDiff + breakDiff
                            }
                        }
                    },
                    {
                        type: 'SwitchCase',
                        consequent: [
                            {
                                type: 'BreakStatement',
                                label: null,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 49 + switchDiff + caseDiff + breakDiff + defaultDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 54 + switchDiff + caseDiff + breakDiff + defaultDiff + breakDiff
                                    }
                                }
                            }
                        ],
                        test: null,
                        loc: {
                            start: {
                                line: 1,
                                column: 40 + switchDiff + caseDiff + breakDiff
                            },
                            end: {
                                line: 1,
                                column: 54 + switchDiff + caseDiff + breakDiff + defaultDiff + breakDiff
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
                        column: 56 + switchDiff + caseDiff + breakDiff + defaultDiff + breakDiff
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
                column: 56 + switchDiff + caseDiff + breakDiff + defaultDiff + breakDiff
            }
        }
    })

    test(`start: ${_for} (;;) ${_break} start`, {
        type: 'Program',
        body: [
            {
                type: 'LabeledStatement',
                body: {
                    type: 'ForStatement',
                    init: null,
                    test: null,
                    update: null,
                    body: {
                        type: 'BreakStatement',
                        label: {
                            type: 'Identifier',
                            name: 'start',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22 + forDiff + breakDiff
                                },
                                end: {
                                    line: 1,
                                    column: 27 + forDiff + breakDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 16 + forDiff
                            },
                            end: {
                                line: 1,
                                column: 27 + forDiff + breakDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 27 + forDiff + breakDiff
                        }
                    }
                },
                label: {
                    type: 'Identifier',
                    name: 'start',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
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
                        column: 27 + forDiff + breakDiff
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
                column: 27 + forDiff + breakDiff
            }
        }
    })

    test(`start: ${_while} (${_true}) ${_break} start`, {
        type: 'Program',
        body: [
            {
                type: 'LabeledStatement',
                body: {
                    type: 'WhileStatement',
                    test: {
                        type: 'Literal',
                        raw: _true,
                        value: true,
                        loc: {
                            start: {
                                line: 1,
                                column: 14 + whileDiff
                            },
                            end: {
                                line: 1,
                                column: 18 + whileDiff + trueDiff
                            }
                        }
                    },
                    body: {
                        type: 'BreakStatement',
                        label: {
                            type: 'Identifier',
                            name: 'start',
                            loc: {
                                start: {
                                    line: 1,
                                    column: 26 + whileDiff + trueDiff + breakDiff
                                },
                                end: {
                                    line: 1,
                                    column: 31 + whileDiff + trueDiff + breakDiff
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 1,
                                column: 20 + whileDiff + trueDiff
                            },
                            end: {
                                line: 1,
                                column: 31 + whileDiff + trueDiff + breakDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 31 + whileDiff + trueDiff + breakDiff
                        }
                    }
                },
                label: {
                    type: 'Identifier',
                    name: 'start',
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
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
                        column: 31 + whileDiff + trueDiff + breakDiff
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
                column: 31 + whileDiff + trueDiff + breakDiff
            }
        }
    })

    test(`${_throw} x;`, {
        type: 'Program',
        body: [
            {
                type: 'ThrowStatement',
                argument: {
                    type: 'Identifier',
                    name: 'x',
                    loc: {
                        start: {
                            line: 1,
                            column: 6 + throwDiff
                        },
                        end: {
                            line: 1,
                            column: 7 + throwDiff
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
                        column: 8 + throwDiff
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
                column: 8 + throwDiff
            }
        }
    })

    test(`${_throw} x * y`, {
        type: 'Program',
        body: [
            {
                type: 'ThrowStatement',
                argument: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                        loc: {
                            start: {
                                line: 1,
                                column: 6 + throwDiff
                            },
                            end: {
                                line: 1,
                                column: 7 + throwDiff
                            }
                        }
                    },
                    operator: '*',
                    right: {
                        type: 'Identifier',
                        name: 'y',
                        loc: {
                            start: {
                                line: 1,
                                column: 10 + throwDiff
                            },
                            end: {
                                line: 1,
                                column: 11 + throwDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 6 + throwDiff
                        },
                        end: {
                            line: 1,
                            column: 11 + throwDiff
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
                        column: 11 + throwDiff
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
                column: 11 + throwDiff
            }
        }
    })

    test(`${_throw} { message: 'Error' }`, {
        type: 'Program',
        body: [
            {
                type: 'ThrowStatement',
                argument: {
                    type: 'ObjectExpression',
                    properties: [
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'message',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8 + throwDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 15 + throwDiff
                                    }
                                }
                            },
                            value: {
                                type: 'Literal',
                                raw: '\'Error\'',
                                value: 'Error',
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17 + throwDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 24 + throwDiff
                                    }
                                }
                            },
                            kind: 'init'
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 6 + throwDiff
                        },
                        end: {
                            line: 1,
                            column: 26 + throwDiff
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
                        column: 26 + throwDiff
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
                column: 26 + throwDiff
            }
        }
    })

    test(`${_try} { } ${_catch} (e) { }`, {
        type: 'Program',
        body: [
            {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 7 + tryDiff
                        }
                    }
                },
                handler: {
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'e',
                        loc: {
                            start: {
                                line: 1,
                                column: 15 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 16 + tryDiff + catchDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 18 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 21 + tryDiff + catchDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 8 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 21 + tryDiff + catchDiff
                        }
                    }
                }
                ,
                finalizer: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21 + tryDiff + catchDiff
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
                column: 21 + tryDiff + catchDiff
            }
        }
    })

    test(`${_try} { } ${_catch} (${_eval}) { }`, {
        type: 'Program',
        body: [
            {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 7 + tryDiff
                        }
                    }
                },
                handler:
                {
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: _eval,
                        loc: {
                            start: {
                                line: 1,
                                column: 15 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 19 + tryDiff + catchDiff + evalDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 21 + tryDiff + catchDiff + evalDiff
                            },
                            end: {
                                line: 1,
                                column: 24 + tryDiff + catchDiff + evalDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 8 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 24 + tryDiff + catchDiff + evalDiff
                        }
                    }
                }
                ,
                finalizer: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 24 + tryDiff + catchDiff + evalDiff
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
                column: 24 + tryDiff + catchDiff + evalDiff
            }
        }
    })

    test(`${_try} { } ${_catch} (${_arguments}) { }`, {
        type: 'Program',
        body: [
            {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 7 + tryDiff
                        }
                    }
                },
                handler:
                {
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: _arguments,
                        loc: {
                            start: {
                                line: 1,
                                column: 15 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 24 + tryDiff + catchDiff + argumentsDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 26 + tryDiff + catchDiff + argumentsDiff
                            },
                            end: {
                                line: 1,
                                column: 29 + tryDiff + catchDiff + argumentsDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 8 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 29 + tryDiff + catchDiff + argumentsDiff
                        }
                    }
                }
                ,
                finalizer: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 29 + tryDiff + catchDiff + argumentsDiff
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
                column: 29 + tryDiff + catchDiff + argumentsDiff
            }
        }
    })

    test(`${_try} { } ${_catch} (e) { say(e) }`, {
        type: 'Program',
        body: [
            {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 7 + tryDiff
                        }
                    }
                },
                handler:
                {
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'e',
                        loc: {
                            start: {
                                line: 1,
                                column: 15 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 16 + tryDiff + catchDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'say',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20 + tryDiff + catchDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 23 + tryDiff + catchDiff
                                            }
                                        }
                                    },
                                    arguments: [
                                        {
                                            type: 'Identifier',
                                            name: 'e',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24 + tryDiff + catchDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25 + tryDiff + catchDiff
                                                }
                                            }
                                        }
                                    ],
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20 + tryDiff + catchDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 26 + tryDiff + catchDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20 + tryDiff + catchDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 26 + tryDiff + catchDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 18 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 28 + tryDiff + catchDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 8 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 28 + tryDiff + catchDiff
                        }
                    }
                }
                ,
                finalizer: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28 + tryDiff + catchDiff
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
                column: 28 + tryDiff + catchDiff
            }
        }
    })

    test(`${_try} { } ${_finally} { cleanup(stuff) }`, {
        type: 'Program',
        body: [
            {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 7 + tryDiff
                        }
                    }
                },
                handler: null,
                finalizer: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'cleanup',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18 + tryDiff + finallyDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 25 + tryDiff + finallyDiff
                                        }
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Identifier',
                                        name: 'stuff',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26 + tryDiff + finallyDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 31 + tryDiff + finallyDiff
                                            }
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18 + tryDiff + finallyDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 32 + tryDiff + finallyDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18 + tryDiff + finallyDiff
                                },
                                end: {
                                    line: 1,
                                    column: 32 + tryDiff + finallyDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 16 + tryDiff + finallyDiff
                        },
                        end: {
                            line: 1,
                            column: 34 + tryDiff + finallyDiff
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
                        column: 34 + tryDiff + finallyDiff
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
                column: 34 + tryDiff + finallyDiff
            }
        }
    })

    test(`${_try} { doThat(); } ${_catch} (e) { say(e) }`, {
        type: 'Program',
        body: [
            {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'doThat',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6 + tryDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 12 + tryDiff
                                        }
                                    }
                                },
                                arguments: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6 + tryDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 14 + tryDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6 + tryDiff
                                },
                                end: {
                                    line: 1,
                                    column: 15 + tryDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 17 + tryDiff
                        }
                    }
                },
                handler:
                {
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'e',
                        loc: {
                            start: {
                                line: 1,
                                column: 25 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 26 + tryDiff + catchDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'say',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 30 + tryDiff + catchDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 33 + tryDiff + catchDiff
                                            }
                                        }
                                    },
                                    arguments: [
                                        {
                                            type: 'Identifier',
                                            name: 'e',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34 + tryDiff + catchDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 35 + tryDiff + catchDiff
                                                }
                                            }
                                        }
                                    ],
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30 + tryDiff + catchDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 36 + tryDiff + catchDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30 + tryDiff + catchDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 36 + tryDiff + catchDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 28 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 38 + tryDiff + catchDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 18 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 38 + tryDiff + catchDiff
                        }
                    }
                }
                ,
                finalizer: null,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 38 + tryDiff + catchDiff
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
                column: 38 + tryDiff + catchDiff
            }
        }
    })

    test(`${_try} { doThat(); } ${_catch} (e) { say(e) } ${_finally} { cleanup(stuff) }`, {
        type: 'Program',
        body: [
            {
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'doThat',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6 + tryDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 12 + tryDiff
                                        }
                                    }
                                },
                                arguments: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6 + tryDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 14 + tryDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6 + tryDiff
                                },
                                end: {
                                    line: 1,
                                    column: 15 + tryDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 4 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 17 + tryDiff
                        }
                    }
                },
                handler:
                {
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'e',
                        loc: {
                            start: {
                                line: 1,
                                column: 25 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 26 + tryDiff + catchDiff
                            }
                        }
                    },
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'say',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 30 + tryDiff + catchDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 33 + tryDiff + catchDiff
                                            }
                                        }
                                    },
                                    arguments: [
                                        {
                                            type: 'Identifier',
                                            name: 'e',
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34 + tryDiff + catchDiff
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 35 + tryDiff + catchDiff
                                                }
                                            }
                                        }
                                    ],
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30 + tryDiff + catchDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 36 + tryDiff + catchDiff
                                        }
                                    }
                                },
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30 + tryDiff + catchDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 36 + tryDiff + catchDiff
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 28 + tryDiff + catchDiff
                            },
                            end: {
                                line: 1,
                                column: 38 + tryDiff + catchDiff
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 18 + tryDiff
                        },
                        end: {
                            line: 1,
                            column: 38 + tryDiff + catchDiff
                        }
                    }
                }
                ,
                finalizer: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'cleanup',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 49 + tryDiff + catchDiff + finallyDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 56 + tryDiff + catchDiff + finallyDiff
                                        }
                                    }
                                },
                                arguments: [
                                    {
                                        type: 'Identifier',
                                        name: 'stuff',
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 57 + tryDiff + catchDiff + finallyDiff
                                            },
                                            end: {
                                                line: 1,
                                                column: 62 + tryDiff + catchDiff + finallyDiff
                                            }
                                        }
                                    }
                                ],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 49 + tryDiff + catchDiff + finallyDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 63 + tryDiff + catchDiff + finallyDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 49 + tryDiff + catchDiff + finallyDiff
                                },
                                end: {
                                    line: 1,
                                    column: 63 + tryDiff + catchDiff + finallyDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 47 + tryDiff + catchDiff + finallyDiff
                        },
                        end: {
                            line: 1,
                            column: 65 + tryDiff + catchDiff + finallyDiff
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
                        column: 65 + tryDiff + catchDiff + finallyDiff
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
                column: 65 + tryDiff + catchDiff + finallyDiff
            }
        }
    })

    test(`${_debugger};`, {
        type: 'Program',
        body: [
            {
                type: 'DebuggerStatement',
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9 + debuggerDiff
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
                column: 9 + debuggerDiff
            }
        }
    })

    test(`${_function} hello() { sayHi(); }`, {
        type: 'Program',
        body: [
            {
                expression: false,
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'hello',
                    loc: {
                        start: {
                            line: 1,
                            column: 9 + functionDiff
                        },
                        end: {
                            line: 1,
                            column: 14 + functionDiff
                        }
                    }
                },
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'sayHi',
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19 + functionDiff
                                        },
                                        end: {
                                            line: 1,
                                            column: 24 + functionDiff
                                        }
                                    }
                                },
                                arguments: [],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19 + functionDiff
                                    },
                                    end: {
                                        line: 1,
                                        column: 26 + functionDiff
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19 + functionDiff
                                },
                                end: {
                                    line: 1,
                                    column: 27 + functionDiff
                                }
                            }
                        }
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 17 + functionDiff
                        },
                        end: {
                            line: 1,
                            column: 29 + functionDiff
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
                        column: 29 + functionDiff
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
                column: 29 + functionDiff
            }
        }
    })

    test(`${_function} ${_eval}() { }`, {
        type: 'Program',
        body: [
            {
                expression: false,
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: _eval,
                    loc: {
                        start: {
                            line: 1,
                            column: 9 + functionDiff
                        },
                        end: {
                            line: 1,
                            column: 13 + functionDiff + evalDiff
                        }
                    }
                },
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 16 + functionDiff + evalDiff
                        },
                        end: {
                            line: 1,
                            column: 19 + functionDiff + evalDiff
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
                        column: 19 + functionDiff + evalDiff
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
                column: 19 + functionDiff + evalDiff
            }
        }
    })

}

module.exports = { run }
