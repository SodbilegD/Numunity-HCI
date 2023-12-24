import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://Sodoo:Sodoo123@dks-cluster.zwkwsze.mongodb.net/';

export async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('DKS');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function fetchCommunityData(collectionName, communityId) {
  try {
      const db = await connectToMongoDB();
      const collection = db.collection(collectionName);
      if(collectionName === 'Community' && communityId){
          return collection.findOne({ communityId: communityId });
      }
      return collection.find({}).toArray();

  } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      throw error;
  }
}