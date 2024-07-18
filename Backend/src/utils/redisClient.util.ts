import redis, { RedisClientType } from 'redis';
import logger from './logger.util.js';

const redisConfig = {
  url: process.env.REDIS_URL,
  pass: process.env.REDIS_PASS,
};

export let redisClient: RedisClientType | undefined;

async function initializeRedisClient(): Promise<void> {
  if (!redisConfig.url) {
    logger.error('Redis Connection URL is Missing');
    return;
  }

  redisClient = await redis.createClient({ url: redisConfig.url, password: redisConfig.pass });

  redisClient.on('error', (err: Error) => {
    logger.error(`Error While Connecting redis`, err);
  });

  try {
    await redisClient.connect();
    logger.info('Redis Client Connected Successfully');
  } catch (error: any) {
    logger.error('Failed to Connect Redis Client');
    logger.error(error);
  }
}

export default initializeRedisClient;
