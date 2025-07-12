import { connectDb, cleanupOldData } from './src/lib/db.js';
import { config } from 'dotenv';

config();

const cleanup = async () => {
  try {
    await connectDb();
    console.log('Connected to MongoDB for cleanup');
    
    await cleanupOldData();
    
    console.log('✅ Database cleanup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
};

cleanup();
