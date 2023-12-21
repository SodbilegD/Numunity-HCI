import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false&directConnection=true';

export async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('DKS');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function addCommentToPost(communityId, postId, newComment) {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('DKS');
        const communityCollection = db.collection('Communities');       // Construct the filter to find the community and post
        const filter = {
            communityId: communityId,
            'posts.postId': postId
        };

        const update = {
            $push: {
                'posts.$.comments': newComment
            }
        };

        const result = await communityCollection.updateOne(filter, update);

        if (result.modifiedCount === 0) {
            console.log('Community or post not found.');
        } else {
            console.log('Comment added successfully.');
        }
    } catch (error) {
      console.error('Comment not added:', error);
      throw error;
    }
}

