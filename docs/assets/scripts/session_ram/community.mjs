import { fetchCommunityData } from "../session_db/db/db.mjs";

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
}

export const community = new Community();
