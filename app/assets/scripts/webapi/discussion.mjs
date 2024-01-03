import { fetchCommunityData } from './db.mjs';

class Discussion {

    async renderDiscussion(req, res) {
        try {
            const communityId = req.body.communityId;
            const community = await fetchCommunityData('Community', communityId);
            const user = await fetchCommunityData('User', null);
            const sessions = await fetchCommunityData('Sessions', null);
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
