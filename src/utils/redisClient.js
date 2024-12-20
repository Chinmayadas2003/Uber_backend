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

redisClient.on('errort',(error)=>{
    console.log('Redis connection error',err);
})
redisClient.connect();

module.exports={redisClient};

