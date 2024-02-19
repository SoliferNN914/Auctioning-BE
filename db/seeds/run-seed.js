const devData = require('../data/test-data/index')
const seed = require('./seed')
const db = require('../connection')

const runSeed = () => seed(devData).then(() => db.end())

runSeed()
