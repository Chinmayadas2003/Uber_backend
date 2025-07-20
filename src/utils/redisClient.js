const redis= require('redis');
const dotenv= require('dotenv');

dotenv.config();

const redisClient= redis.createClient({
    url: process.env.REDIS_URL,
})

//event listeners
redisClient.on('connect',()=>{
    console.log('Connected to redis');
})

redisClient.on('error',(error)=>{
    console.error('Redis connection error', error);
})
redisClient.connect();

module.exports={redisClient};

