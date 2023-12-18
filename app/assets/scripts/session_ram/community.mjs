import dbPromise from '../session_db/db/db.mjs';

const CommunityCollection = 'Community';

class Community {
    async renderCommunity(req, res) {
        try {
            const db = await dbPromise;

            const communityId = req.body.communityId;

            const community = await db.collection(CommunityCollection).findOne({ communityId: communityId });

            if (!community) {
                res.status(403).end();
                return;
            }

            res.status(200).send({
                result: 'OK'
            });

            return community;

        } catch (error) {
            console.error('Cannot render community:', error);
            res.status(500).end();
            return;
        }
    }
}

// Export the renderCommunity method directly
export const renderCommunity = async (req, res) => {
    const communityInstance = new Community();
    return await communityInstance.renderCommunity(req, res);
};
