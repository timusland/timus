import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser";

export default {
    input: 'dist/ts-out/timus.js',
    output: [
        {
            file: 'dist/timus.js',
            format: 'umd',
            name: 'Timus'
        },
        {
            file: 'dist/timus.min.js',
            format: 'umd',
            name: 'Timus',
            plugins: [
                terser()
            ]
        },
        {
            file: 'dist/timus.mjs',
            format: 'es'
        },
        {
            file: 'dist/timus.min.mjs',
            format: 'es',
            plugins: [
                terser()
            ]
        }
    ],
    plugins: [
        nodeResolve({
            browser: true
        }),
        commonjs({
            include: ['node_modules/**'],
            sourceMap: false
        })
    ]
}
