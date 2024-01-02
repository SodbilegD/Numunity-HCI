import { fetchCommunityData } from "../session_db/db/db.mjs";
import { connectToMongoDB } from "../session_db/db/db.mjs";

class Community {
    async renderCommunity(req, res) {
        try {
            const communityId = req.body.communityId;
            const flag = req.body.user;
            const community = await fetchCommunityData('Community', communityId);
            if(flag !== 1){
                const user = await fetchCommunityData('User', null)
                if (!community || !user) {
                    res.status(403).end();
                    return;
                }
                res.status(200).send({
                    community: community,
                    user: user
                });
            }
            res.status(200).send({
                community: community
            });
        } catch (error) {
            console.error('Error rendering community:', error);
            res.status(500).end();
        }
    }

    async joinNewCommunity(req, res) {
        try {
            const communityId = req.body.communityId;
            const userId = req.body.userId;
            const db = await connectToMongoDB();
            const collection = db.collection('User');
    
            const userData = await collection.findOne({ userId: userId });
    
            if (!userData) {
                res.status(404).send({
                    result: 'User not found'
                });
                return;
            }
    
            if (!userData.savedCommunities.includes(communityId)) {
                userData.savedCommunities.push(communityId);
    
                const result = await collection.updateOne(
                    { userId: userId },
                    { $set: { savedCommunities: userData.savedCommunities } }
                );
    
                if (result.modifiedCount === 0) {
                    res.status(500).end();
                } else {
                    res.status(200).send({
                        result: 'OK'
                    });
                }
            } else {
                // If community is already in savedCommunities, send a response
                res.status(200).send({
                    result: 'Community already in savedCommunities'
                });
            }
        } catch (error) {
            console.error('Community not joined:', error);
            res.status(500).end();
        }
    }
    
}

export const community = new Community();
