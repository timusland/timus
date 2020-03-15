function getRegExpWords(regex: RegExp) {
    return regex.source
        .replace('^(?:', '')
        .replace(')$', '')
        .split('|')
        .map(w => w.trim())
}

export interface MapLike<T> {
    [index: string]: T
}

export interface TimusLanguage {
    [jsWord: string]: string
}

export function getLanguageWordsRegExp(jsWordsRegExp: RegExp, lang: TimusLanguage) {
    if (!lang)
        return jsWordsRegExp

    const originalWords = getRegExpWords(jsWordsRegExp)
    let words = ''
    for (const jsWord of originalWords) {
        if (jsWord in lang) {
            const synonyms = getLanguageSynonyms(jsWord, lang)
            for (const syn of synonyms)
                words += ' ' + syn
        } else {
            words += ' ' + jsWord // keep the original word
        }
    }

    words = words.trim()
    return new RegExp('^(?:' + words.replace(/ /g, '|') + ')$')
}

export function getLanguageSynonyms(jsWord: string, lang?: TimusLanguage) {
    if (!lang || !lang.hasOwnProperty(jsWord))
        return [jsWord]
    const aux = lang[jsWord].split('|')
    return aux.map(langWord => langWord.trim())
}

export function getLanguageSynonym(jsWord: string, lang: TimusLanguage, alt = 0) {
    if (!lang || !lang.hasOwnProperty(jsWord))
        return jsWord
    const aux = lang[jsWord].split('|')
    return aux.map(langWord => langWord.trim())[alt] || jsWord
}

export function getJavaScriptSynonym(langWord: string, lang?: TimusLanguage) {
    if (!lang)
        return
    for (const jsWord of Object.keys(lang))
        if (areSynonyms(langWord, jsWord, lang))
            return jsWord
}

export function areSynonyms(langWord: string, jsWord: string, lang?: TimusLanguage) {
    if (langWord === jsWord)
        return true
    if (!lang)
        return false
    const synonyms = getLanguageSynonyms(jsWord, lang)
    if (synonyms.includes(langWord))
        return true
    return false
}

export function createMapFromTemplate<V>(template: MapLike<V>): Map<V, string> {
    const map: Map<V, string> = new Map<V, string>()
    for (const key of Object.keys(template)) {
        const mapKey = template[key]
        map.set(mapKey, key)
    }
    return map
}
