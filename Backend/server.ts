import 'dotenv/config';

import app from './src/index';
import connectDB from './src/DB/connectDB';

const PORT: string = process.env.PORT || '3008';
const HOST: string = process.env.HOST || 'localhost';

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` ⚡Server is Running on ${HOST} \n⚛️  PORT : ${PORT}\n`);
      console.log(`⚒️  Server is running at http://${HOST}:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(`😵 Error While Calling Connect DB Method`);
  });
