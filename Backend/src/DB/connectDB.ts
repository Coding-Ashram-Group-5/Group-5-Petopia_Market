import mongoose from 'mongoose';

const CONNECTION_URI: string = process.env.MONGO_DB_URL || 'mongodb://localhost:27017';
const DB_NAME = 'Patopia';

const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(`${CONNECTION_URI}/${DB_NAME}`);
    console.log(`🚀 Database Successfully Connected at ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('Error While Connecting to MongoDB', error);

    // Killing the Process with 'Failure'
    process.exit(1);
  }
};

export default connectDB;
