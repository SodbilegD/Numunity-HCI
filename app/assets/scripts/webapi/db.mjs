import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://SodbilegD:Sodoo123@cluster0.voqaybp.mongodb.net';

// MongoDB-teigee holboh function
export async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('NUMunity');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
// Community collection-g avaad butsaah function
export async function fetchCommunityData(collectionName, communityId) {
  try {
      const db = await connectToMongoDB();
      const collection = db.collection(collectionName);
      if(collectionName === 'Community' && communityId){
        const communityElement = await collection.findOne({ communityId: communityId });
        return communityElement;
      }
      return collection.find({}).toArray();

  } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      throw error;
  }
}