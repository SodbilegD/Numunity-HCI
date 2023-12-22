import { connectToMongoDB } from '../session_db/db/db.mjs';

class CommunityList {
    async fetchCommunityListData() {
        try {
            const db = await connectToMongoDB();
            const communityData = await db.collection('Community').find({}).toArray();
            return communityData[0].community;
        } catch (error) {
            console.error('Error fetching community list data from MongoDB:', error);
            throw error;
        }
    }

    async renderCommunityList(req, res) {
        try {
            const community = await this.fetchCommunityListData();
            console.log(community);
            if (!community) {
                res.status(403).end();
                return;
            }
            res.status(200).send({
                community: community
            });
        } catch (error) {
            console.error('Error rendering community:', error);
            res.status(500).end();
        }
    }
}

export const communityList = new CommunityList();
