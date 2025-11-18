import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Debug logging to see what's happening with env vars
    console.log('MONGODB_URI from env:', process.env.MONGODB_URI ? 'FOUND' : 'NOT FOUND');
    console.log('Full MONGODB_URI:', process.env.MONGODB_URI);

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
