import mongoose from 'mongoose';

const mangoURI="mongodb+srv://starksandip62:sandip12345@cluster0.zi0ex.mongodb.net?retryWrites=true&w=majority&appName=Cluster0"


type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(
      mangoURI as string , {
        dbName : "tmgts"
      });

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;
