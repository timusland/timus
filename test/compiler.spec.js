const assert = require('assert')
const { transpile } = require('../dist/timus')
const { getTestWords } = require('./utilities')
const languages = require('./languages/index')

describe('transpile', () => {
    run() // plain JavaScript
    for (const lang of languages)
        run(lang)
})

function run(language) {
    const {
        _Object,
        _arguments,
        _await,
        _break,
        _case,
        _catch,
        _class,
        _const,
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
        _let,
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
    } = getTestWords(language)

    test('strings', `'Hello World!'`, `'Hello World!'`)
    test('regular expressions', '/hello|world/', '/hello|world/')
    test('names', 'ConradoCarvalho', 'ConradoCarvalho')
    test('brackets', '[ConradoCarvalho, 10]', '[ConradoCarvalho, 10]')
    test('braces', '{}', '{}')
    test('parenthesis', 'foo()', 'foo()')
    test('commas', 'o = { a: 1, b: 2 }', 'o = { a: 1, b: 2 }')
    test('semicolons', 'a;b;c;', 'a;b;c;')
    test('dots', 'a.b.c', 'a.b.c')
    test('question marks', 'a = b ? c : d', 'a = b ? c : d')
    test('arrows', '() => {}', '() => {}')
    test('arrows', 'a = () => b', 'a = () => b')
    test('ellipsis', 'a = { ... b }', 'a = { ... b }')
    test('back quote', '`template string`', '`template string`')
    test('dollar brace', '`${a}`', '`${a}`')
    test('inc', 'a++', 'a++')
    test('dec', 'a--', 'a--')
    test('exclamations', '!a', '!a')
    test('tildes', '~a', '~a')
    test('or', 'a || b', 'a || b')
    test('and', 'a && b', 'a && b')
    test('bitwise or', 'a | b', 'a | b')
    test('bitwise xor', 'a ^ b', 'a ^ b')
    test('bitwise and', 'a & b', 'a & b')
    test('equality', 'a == b', 'a == b')
    test('equality', 'a === b', 'a === b')
    test('equality', 'a != b', 'a != b')
    test('equality', 'a !== b', 'a !== b')
    test('relational', 'a > b', 'a > b')
    test('relational', 'a < b', 'a < b')
    test('relational', 'a >= b', 'a >= b')
    test('relational', 'a <= b', 'a <= b')
    test('bit shift', 'a >> b', 'a >> b')
    test('bit shift', 'a << b', 'a << b')
    test('bit shift', 'a >>> b', 'a >>> b')
    test('plus', 'a + b', 'a + b')
    test('minus', 'a - b', 'a - b')
    test('modulo', 'a % b', 'a % b')
    test('star', 'a * b', 'a * b')
    test('slash', 'a / b', 'a / b')
    test('starstar', 'a ** b', 'a ** b')
    
    test('kw debugger', `${_debugger}`, 'debugger')
    test('kw if', `${_if} (1) foo()`, 'if (1) foo()')
    test('kw else', `${_if} (1) foo(); ${_else} bar();`, 'if (1) foo(); else bar();')
    test('kw for', `${_for} (;;) foo()`, 'for (;;) foo()')
    test('kw function', `${_function} foo() {}`, 'function foo() {}')
    test('kw function', `a = ${_function}() {}`, 'a = function() {}')
    test('kw true', `${_true}`, 'true')
    test('kw false', `${_false}`, 'false')
    test('kw return', `${_function} foo() { ${_return} 1 }`, 'function foo() { return 1 }')
    test('kw throw', `${_throw} value`, 'throw value')
    test('kw try', `${_try} { foo() } ${_catch}(e) {  }`, 'try { foo() } catch(e) {  }')
    test('kw var', `${_var} a`, 'var a')
    test('kw var', `${_var} a = 1`, 'var a = 1')
    test('kw const', `${_const} a = 1`, 'const a = 1')
    test('kw class', `${_class} A { }`, 'class A { }')
    test('kw let', `${_let} a`, 'let a')

    function test(message, input, output) {
        it('should keep ' + message, () => {
            const res = transpile(input, { language })
            assert.equal(res.sourceText, output)
            assert.equal(res.diagnostics.length, 0)
        })
    }
}

/*
  // Keyword token types.
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _continue: kw("continue"),
  _default: kw("default", beforeExpr),
  _do: kw("do", {isLoop: true, beforeExpr: true}),
  _finally: kw("finally"),
  _switch: kw("switch"),
  _while: kw("while", {isLoop: true}),
  _with: kw("with"),
  _new: kw("new", {beforeExpr: true, startsExpr: true}),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import", startsExpr),
  _null: kw("null", startsExpr),
  _in: kw("in", {beforeExpr: true, binop: 7}),
  _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}),
  _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}),
  _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}),
  _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})
*/