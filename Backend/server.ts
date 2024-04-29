import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import app from './src/index';
import connectDB from './src/DB/connectDB';

const PORT: number = 3008 || process.env.PORT;
const HOST: string = 'localhost' || process.env.HOST;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` ⚡Server is Running on ${HOST} \n⚛️  PORT : ${PORT}\n`);
      console.log(` ⚡ Server is running at http://${HOST}:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(`😵 Error While Calling Connect DB Method`);
  });
