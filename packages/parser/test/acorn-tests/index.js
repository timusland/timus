function run(lang) {
    const tests = require('./tests')
    const testsAwaitTopLevel = require('./tests-await-top-level')
    
    tests.run(lang)
    testsAwaitTopLevel.run(lang)
}

module.exports = { run }
