import { fetchCommunityData } from "../session_db/db/db.mjs";

class CommunityList {
    async renderCommunityList(req, res) {
        try {
            const community = await fetchCommunityData('Community', null);
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
