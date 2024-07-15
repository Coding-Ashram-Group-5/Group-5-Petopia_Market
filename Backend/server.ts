import 'dotenv/config';

import app from './src/index';
import connectDB from './src/DB/connectDB';
import initializeRedisClient from './src/utils/redisClient.util.js';
import logger from './src/utils/logger.util.js';
import { loadCount } from './src/controllers/Admin.controller.js';

const PORT: string = process.env.PORT || '3008';
const HOST: string = process.env.HOST || 'localhost';

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` ⚡Server is Running on ${HOST} \n⚛️  PORT : ${PORT}\n`);
      console.log(`⚒️  Server is running at http://${HOST}:${PORT}/`);
      // initialize redis client
      initializeRedisClient();
      // initialize views count
      loadCount();
    });
  })
  .catch((err) => {
    console.log(`😵 Error While Calling Connect DB Method`);
  });
