function run(lang) {
    const tests = require('./tests')
    const testsAwaitTopLevel = require('./tests-await-top-level')
    const testsBigint = require('./tests-bigint')
    const testsDynamicImport = require('./tests-dynamic-import')
    const testsEs7 = require('./tests-es7')
    const testsOptionalCatchBinding = require('./tests-optional-catch-binding')

    tests.run(lang)
    testsAwaitTopLevel.run(lang)
    testsBigint.run(lang)
    testsDynamicImport.run(lang)
    testsEs7.run(lang)
    testsOptionalCatchBinding.run(lang)
}

module.exports = { run }
