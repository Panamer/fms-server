/**
 * 创建 redis 实例
 */
const config = require('../config');
const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(config.redis);

client.on('error', function (err) {
    console.log('Error ' + err);
});

module.exports = client;
