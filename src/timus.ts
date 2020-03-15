import { TimusParser, TimusParserOptions } from './parser'
import { TimusCompiler, TimusCompilerOptions } from './compiler'

export {
    getLanguageWordsRegExp,
    getJavaScriptSynonym,
    getLanguageSynonym,
    getLanguageSynonyms,
    areSynonyms
} from './utilities'

export {
    AcornNode,
    AcornSourceLocation,
    AcornPosition,
    TokenType,
    KeywordTokenType,
} from './parser'

export function parse(sourceText: string, options?: TimusParserOptions) {
    return TimusParser.parse(sourceText, options)
}

export function transpile(sourceText: string, options?: TimusCompilerOptions) {
    return TimusCompiler.transpile(sourceText, options)
}
