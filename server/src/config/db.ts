import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer | null = null;

export const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dronetv_db';

  try {
    // Attempt standard connection with 3 sec selection timeout
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] Connected to MongoDB database at ${mongoURI}`);
  } catch (error) {
    console.warn(`[Database] Could not connect to primary MongoDB at ${mongoURI}.`);
    console.log(`[Database] Initializing MongoDB In-Memory Server fallback for hassle-free execution...`);
    
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[Database] Connected successfully to In-Memory MongoDB instance at ${memoryUri}`);
    } catch (memError) {
      console.error('[Database] Failed to start In-Memory MongoDB:', memError);
      process.exit(1);
    }
  }
};

export const closeDB = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
