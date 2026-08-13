import { createClient } from 'redis';
import { env } from '../../config/env.config';
import { logger } from '../../utils/logger';

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', (err) => {
  logger.error('❌ Redis connection error:', err);
});

redisClient.on('connect', () => {
  logger.info('✅ Redis connected successfully');
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.error('❌ Failed to connect to Redis:', error);
    process.exit(1);
  }
};
