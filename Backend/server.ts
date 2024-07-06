import 'dotenv/config';

import app from './src/index';
import connectDB from './src/DB/connectDB';
import initializeRedisClient from './src/utils/redisClient.util.js';
import logger from './src/utils/logger.util.js';

const PORT: string = process.env.PORT || '3008';
const HOST: string = process.env.HOST || 'localhost';

connectDB()
  .then(() => {
    // initialize redis client
    initializeRedisClient()
      .then(() => {
        logger.info('Redis Client Connected');
      })
      .catch((err) => {
        logger.error(`While Connecting Redis`, err);
      });

    app.listen(PORT, () => {
      console.log(` ⚡Server is Running on ${HOST} \n⚛️  PORT : ${PORT}\n`);
      console.log(`⚒️  Server is running at http://${HOST}:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(`😵 Error While Calling Connect DB Method`);
  });
