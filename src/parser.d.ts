import {
    Parser,
    Options as AcornOptions,
    Node,
    SourceLocation,
    TokenType as ITokenType,
    Position,
    Token
} from 'acorn';

import { TimusLanguage } from './utilities'

type TTokenType = {
    num: ITokenType
    regexp: ITokenType
    string: ITokenType
    name: ITokenType
    eof: ITokenType
    bracketL: ITokenType
    bracketR: ITokenType
    braceL: ITokenType
    braceR: ITokenType
    parenL: ITokenType
    parenR: ITokenType
    comma: ITokenType
    semi: ITokenType
    colon: ITokenType
    dot: ITokenType
    question: ITokenType
    arrow: ITokenType
    template: ITokenType
    ellipsis: ITokenType
    backQuote: ITokenType
    dollarBraceL: ITokenType
    eq: ITokenType
    assign: ITokenType
    incDec: ITokenType
    prefix: ITokenType
    logicalOR: ITokenType
    logicalAND: ITokenType
    bitwiseOR: ITokenType
    bitwiseXOR: ITokenType
    bitwiseAND: ITokenType
    equality: ITokenType
    relational: ITokenType
    bitShift: ITokenType
    plusMin: ITokenType
    modulo: ITokenType
    star: ITokenType
    slash: ITokenType
    starstar: ITokenType
    _break: ITokenType
    _case: ITokenType
    _catch: ITokenType
    _continue: ITokenType
    _debugger: ITokenType
    _default: ITokenType
    _do: ITokenType
    _else: ITokenType
    _finally: ITokenType
    _for: ITokenType
    _function: ITokenType
    _if: ITokenType
    _return: ITokenType
    _switch: ITokenType
    _throw: ITokenType
    _try: ITokenType
    _var: ITokenType
    _const: ITokenType
    _while: ITokenType
    _with: ITokenType
    _new: ITokenType
    _this: ITokenType
    _super: ITokenType
    _class: ITokenType
    _extends: ITokenType
    _export: ITokenType
    _import: ITokenType
    _null: ITokenType
    _true: ITokenType
    _false: ITokenType
    _in: ITokenType
    _instanceof: ITokenType
    _typeof: ITokenType
    _void: ITokenType
    _delete: ITokenType
}

type TKeywordTokenType = {
    break: ITokenType
    case: ITokenType
    catch: ITokenType
    continue: ITokenType
    debugger: ITokenType
    default: ITokenType
    do: ITokenType
    else: ITokenType
    finally: ITokenType
    for: ITokenType
    function: ITokenType
    if: ITokenType
    return: ITokenType
    switch: ITokenType
    throw: ITokenType
    try: ITokenType
    var: ITokenType
    const: ITokenType
    while: ITokenType
    with: ITokenType
    new: ITokenType
    this: ITokenType
    super: ITokenType
    class: ITokenType
    extends: ITokenType
    export: ITokenType
    import: ITokenType
    null: ITokenType
    true: ITokenType
    false: ITokenType
    in: ITokenType
    instanceof: ITokenType
    typeof: ITokenType
    void: ITokenType
    delete: ITokenType
}

declare module './parser' {
    export const AcornNode: Node
    export const AcornSourceLocation: SourceLocation
    export const TokenType: TTokenType
    export const KeywordTokenType: TKeywordTokenType
    export const AcornPosition: Position

    export const textToTokenType: { [key: string]: ITokenType }

    export interface TimusParserOptions extends AcornOptions {
        language?: TimusLanguage
    }

    export class TimusParser extends Parser {
        constructor(input: string, options?: TimusParserOptions)
        static parse(input: string, options?: TimusParserOptions): Node
        static tokenizer(input: string, options?: TimusParserOptions): {
            getToken(): Token
            [Symbol.iterator](): Iterator<Token>
        }
    }
}
