// db_user.js
import db from './db.mjs';

class DbUser {
  constructor() {
    // Collection name in MongoDB
    this.collectionName = 'User';
  }

  async addUser(userName, profImg, email, password) {
    try {
      const result = await db.collection(this.collectionName).insertOne({
        userId: await this.generateUserId(),
        userName: userName,
        profImg: profImg,
        email: email, 
        password: password,
      });

      // Return the inserted user's ID
      return result.insertedId;
    } catch (error) {
      console.error('Error adding user:', error);
      return null;
    }
  }

  async selectUsers() {
    try {
      const users = await db.collection(this.collectionName).find().toArray();
      return users;
    } catch (error) {
      console.error('Error selecting users:', error);
      return [];
    }
  }

  async login(email, password) {
    try {
      const user = await db
        .collection(this.collectionName)
        .findOne({ email: email, password: password }, { projection: { _id: 0 } });

      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  }

  async generateUserId() {
    try {
      // Find the last user and sort by userId in descending order
      const lastUser = await db
        .collection(this.collectionName)
        .find()
        .sort({ userId: -1 })
        .limit(1)
        .toArray();

      // Extract the userId from the last user or use a default value if no user exists
      const lastUserId = lastUser.length > 0 ? lastUser[0].userId : 0;

      // Increment the last userId to generate a new unique value
      const newUserId = lastUserId + 1;

      return newUserId;
    } catch (error) {
      console.error('Error generating userId:', error);
      return null;
    }
  }
}

const dbUser = new DbUser();

export default dbUser;
