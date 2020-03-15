const { getLanguageSynonym } = require('../dist/timus')

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
        _class: getLanguageSynonym('class', lang),
        _const: getLanguageSynonym('const', lang),
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
        _with: getLanguageSynonym('with', lang),

        _yield: getLanguageSynonym('yield', lang)
    }
}

module.exports = { getTestWords }
