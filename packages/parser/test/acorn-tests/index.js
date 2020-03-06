function run(lang) {
    const tests = require('./tests')
    const testsAwaitTopLevel = require('./tests-await-top-level')
    const testsBigint = require('./tests-bigint')

    tests.run(lang)
    testsAwaitTopLevel.run(lang)
    testsBigint.run(lang)
}

module.exports = { run }
