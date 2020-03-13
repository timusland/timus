export default {
    input: 'src/parser.js',
    output: [
        {
            file: 'dist/timus-parser.js',
            format: 'umd',
            name: 'timus.parser'
        },
        {
            file: 'dist/timus-parser.mjs',
            format: 'es'
        }
    ]
}
