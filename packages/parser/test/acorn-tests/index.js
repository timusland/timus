function run(lang) {
    const tests = require('./tests')
    const testsAwaitTopLevel = require('./tests-await-top-level')
    const testsBigint = require('./tests-bigint')
    const testsDynamicImport = require('./tests-dynamic-import')

    tests.run(lang)
    testsAwaitTopLevel.run(lang)
    testsBigint.run(lang)
    testsDynamicImport.run(lang)
}

module.exports = { run }
