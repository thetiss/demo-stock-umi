const redis = require('redis');
const client = redis.createClient({
    port: 6379,
    host: '192.168.1.167',
    password: 'iiot',    
})

// *** Basic Operations ***

// SET and GET
// client.set('hello','chy',redis.print);
// client.get('hello',redis.print);
// client.del('hello',redis.print);

// INCR and DECR
// client.set('counter', 50, redis.print);
// client.decr('counter', redis.print);
// client.get('counter', redis.print);

// Set with TTL Expiry
// client.set("timeToLive", "set to 5s", "EX", 5, redis.print);
// client.get('timeToLive', redis.print);

// client.set('timetolive', 'ha', 'EX', 10, redis.print);
// client.get('timetolive', redis.print);

// LISTS 0：the latest one, -1: 最后的一个
//client.rpush('rank', 'NO.1', 'NO.3', 'NO.2', redis.print);
//client.lrange('rank', 0, -1, redis.print);
//client.rpop('rank', redis.print);

// ** keyspace operation
// client.get('counter', redis.print);
// client.set('counter', 1);
// client.get('counter', redis.print);

// ** Hashmaps
// {
//     'transactionId':'123',
//     'mount': 5,
//     'type': 'primary'

// }
// client.hset('transaction:123', 'transactionId', '123', 'mount', 5, 'type', 'primary', redis.print);
// client.hgetall('transaction:123', redis.print);
// client.hget('transaction:123', 'type', redis.print);

// ** SORTED SETS -leaderboards, ranking
// client.zadd('score', 988, 'student1', redis.print);
// client.zadd('score', 999, 'student2', redis.print);
// client.zadd('score', 910, 'student3', redis.print);

// student2,1,3
client.zrange('score', 0, -1, redis.print);
client.zrevrange('score', 0, -1, redis.print);