import { Token } from 'acorn'
import { TimusParser, TokenType, textToTokenType, TimusParserOptions } from './parser'
import { createMapFromTemplate, getJavaScriptSynonym, TimusLanguage } from './utilities'

export interface TimusCompilerOptions extends TimusParserOptions { }

export interface TranspilationResult {
    sourceText: string
    diagnostics: SyntaxError[]
}

export namespace TimusCompiler {

    export function transpile(input: string, options?: TimusCompilerOptions): TranspilationResult {
        const tokens: Token[] = []
        const diagnostics: SyntaxError[] = []
        let sourceText: string = ''
        let prevToken: Token

        options = {
            ...options,
            ecmaVersion: 2020,
            sourceType: 'module',
            onToken(token: Token) {
                if (prevToken)
                    sourceText = writeGap(input, sourceText, token, prevToken)
                sourceText = writeToken(input, sourceText, token, options.language)
                tokens.push(token)
                prevToken = token
            }
        }

        try {
            TimusParser.parse(input, options)
        } catch (error) {
            diagnostics.push(error)
        }

        return {
            sourceText,
            diagnostics
        }
    }

    function writeGap(input: string, sourceText: string, token: Token, prevToken: Token) {
        const tokenGap = token.start - prevToken.end
        if (tokenGap <= 0)
            return sourceText
        const gapContent = input.slice(prevToken.end, token.start)
        return sourceText += gapContent
    }

    function writeToken(input: string, sourceText: string, token: Token, language: TimusLanguage) {
        return sourceText + tokenToString(input, token, language)
    }

    const tokenTypeStrings = createMapFromTemplate(textToTokenType)

    function tokenToString(input: string, token: Token, language: TimusLanguage): string {
        const tokenString = tokenTypeStrings.get(token.type)
        if (typeof tokenString !== 'undefined')
            return tokenString

        // For a few token types there is no direct map to string
        switch (token.type) {
            case TokenType.template:
            case TokenType.assign:
            case TokenType.incDec:
            case TokenType.prefix:
            case TokenType.equality:
            case TokenType.relational:
            case TokenType.bitShift:
            case TokenType.plusMin:
                return token.value
            case TokenType.num:
            case TokenType.regexp:
            case TokenType.string:
                return input.slice(token.start, token.end)
            case TokenType.name:
                if (isContextual(token.value, language))
                    return getJavaScriptSynonym(token.value, language)
                return token.value
            case TokenType.eof:
                return ''
        }

        console.log('Unexpected token', token)
        return ''
    }

    function isContextual(name: string, language: TimusLanguage) {
        const synonym = getJavaScriptSynonym(name, language)
        switch (synonym) {
            case 'as':
            case 'async':
            case 'await':
            case 'constructor':
            case 'get':
            case 'let':
            case 'set':
            case 'static':
            case 'undefined':
            case 'from':
            case 'of':
            case 'yield':
                return true
        }

        return false
    }
}
