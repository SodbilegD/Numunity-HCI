import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false&directConnection=true';

const client = new MongoClient(uri);

let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    // Specify your database name
    db = client.db('DKS');
    // You can now use the 'db' object to interact with your MongoDB database
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

// Connect to MongoDB and export the db object
export default connectToMongoDB();
