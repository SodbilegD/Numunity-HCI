import { connectToMongoDB } from '../session_db/db/db.mjs';

class Discussion {
    async fetchCommunityData(collectionName, communityId, postId) {
        try {
            const db = await connectToMongoDB();
            const data = await db.collection(collectionName).find({}).toArray();
            if(collectionName === 'Community'){
                return data[0].community.find(c => c.communityId === communityId);
            }
            return data;

        } catch (error) {
            console.error('Error fetching community data from MongoDB:', error);
            throw error;
        }
    }

    async renderDiscussion(req, res) {
        try {
            const communityId = req.body.communityId;
            const community = await this.fetchCommunityData('Community', communityId);
            const user = await this.fetchCommunityData('User', null, null);
            const sessions = await this.fetchCommunityData('Sessions', null, null);
            if (!community || !user || !sessions) {
                res.status(403).end();
                return;
            }
            res.status(200).send({
                result: 'Successful rendering community!',
                community: community,
                user: user,
                sessions: sessions
            });
        } catch (error) {
            console.error('Error rendering community:', error);
            res.status(500).end();
        }
    }
}

export const discussion = new Discussion();
