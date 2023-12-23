import { fetchCommunityData } from "../session_db/db/db.mjs";

class Community {
    async renderCommunity(req, res) {
        try {
            const communityId = req.body.communityId;
            const community = await fetchCommunityData('Community', communityId);
            const user = await fetchCommunityData('User', null)
            if (!community && !user) {
                res.status(403).end();
                return;
            }
            res.status(200).send({
                result: 'Successful rendering community!',
                community: community,
                user: user
            });
        } catch (error) {
            console.error('Error rendering community:', error);
            res.status(500).end();
        }
    }
}

export const community = new Community();
