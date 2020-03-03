const assert = require('assert')
const {
    getLanguageSynonyms,
    getLanguageSynonym,
    getJavaScriptSynonym,
    areSynonyms
} = require('../dist/timus-parser')

describe('getLanguageSynonyms', () => {
    it('should return a list of the JS word synonyms defined in the lang argument', () => {
        const lang = {
            'function': 'fn|f',
            'return': 'rtn'
        }

        let result = getLanguageSynonyms('function', lang)
        assert.deepStrictEqual(result, ['fn', 'f'])
        result = getLanguageSynonyms('return', lang)
        assert.deepStrictEqual(result, ['rtn'])
    })

    it('should return an array with the JS word if there are no synonyms defined in the lang argument', () => {
        // we should consider the original word in case there are no synonyms defined
        // that's why we expect an array with the JS word passed
        const lang = {}
        const result = getLanguageSynonyms('if', lang)
        assert.deepStrictEqual(result, ['if'])
    })

    it('should handle lang argument undefined', () => {
        // this is very similar to the case that there are no synonyms for the JS word
        // in the lang argument
        const result = getLanguageSynonyms('if')
        assert.deepStrictEqual(result, ['if'])
    })
})

describe('getLanguageSynonym', () => {
    it('should return the JS word synonym defined in the lang argument', () => {
        const lang = {
            'function': 'fn|f',
            'return': 'rtn'
        }

        let result = getLanguageSynonym('function', lang)
        assert.equal(result, 'fn')
        result = getLanguageSynonym('return', lang)
        assert.equal(result, 'rtn')
    })

    it('should return the specified JS word synonym defined in the lang argument', () => {
        // in case there are multiple synonyms defined we should be able to specify
        // which one we are looking for, passing a third argument
        const lang = {
            'function': 'fn|f',
            'return': 'rtn',
            'new': 'novo |    nova'
        }

        let result = getLanguageSynonym('function', lang, 1)
        assert.equal(result, 'f')
        // an out of range position should return the JS word passed
        result = getLanguageSynonym('function', lang, 2)
        assert.equal(result, 'function')
        result = getLanguageSynonym('new', lang)
        assert.equal(result, 'novo')
        result = getLanguageSynonym('new', lang, 1)
        assert.equal(result, 'nova')
    })

    it('should return the JS word in case there are no synonyms', () => {
        const lang = {
            'function': 'fn|f',
            'return': 'rtn'
        }

        let result = getLanguageSynonym('while', lang)
        assert.equal(result, 'while')
        // lang argument undefined
        result = getLanguageSynonym('if')
        assert.equal(result, 'if')
    })
})

describe('getJavaScriptSynonym', () => {
    it('should return the language synonym defined in the lang argument', () => {
        const lang = {
            'function': 'fn|f',
            'return': 'rtn'
        }

        let result = getJavaScriptSynonym('fn', lang)
        assert.equal(result, 'function')
        result = getJavaScriptSynonym('f', lang)
        assert.equal(result, 'function')
        result = getJavaScriptSynonym('rtn', lang)
        assert.equal(result, 'return')
    })

    it('should return undefined if there are no synonyms for the lang word', () => {
        const lang = {
            'function': 'fn|f',
            'return': 'rtn'
        }

        let result = getJavaScriptSynonym('xx', lang)
        assert.equal(result, undefined)
        result = getJavaScriptSynonym('yy')
        assert.equal(result, undefined)
    })
})

describe('areSynonyms', () => {
    it('should return true if both words are synonyms in the lang argument', () => {
        const lang = {
            'function': 'fn|f',
            'return': 'rtn'
        }

        let result = areSynonyms('fn', 'function', lang)
        assert.equal(result, true)
        result = areSynonyms('f', 'function', lang)
        assert.equal(result, true)
        result = areSynonyms('rtn', 'return', lang)
        assert.equal(result, true)
        result = areSynonyms('if', 'if', lang)
        assert.equal(result, true)
        result = areSynonyms('if', 'if')
        assert.equal(result, true)
    })

    it('should return false if words are not synonyms', () => {
        const lang = {
            'function': 'fn|f',
            'return': 'rtn'
        }

        let result = areSynonyms('fn', 'return', lang)
        assert.equal(result, false)
        result = areSynonyms('f', 'return', lang)
        assert.equal(result, false)
        result = areSynonyms('rtn', 'while', lang)
        assert.equal(result, false)
        result = areSynonyms('if', 'while', lang)
        assert.equal(result, false)
        result = areSynonyms('if', 'while')
        assert.equal(result, false)
    })
})
