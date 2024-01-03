import { connectToMongoDB } from './db.mjs';
// 
class NewComment {
    async addCommentToPost(req, res) {
        try {
            const communityId = req.body.communityId;
            const postId = req.body.postId;
            const newComment = req.body.newComment;

            const db = await connectToMongoDB();
            const collection = db.collection('Community');

            const communityData = await collection.findOne({ communityId: communityId });

            if (!communityData) {
                res.status(404).send({
                    result: 'Community not found'
                });
                return;
            }
            
            const postIndex = communityData.posts.findIndex(post => post.postId === postId);

            if (postIndex === -1) {
                // Post not found
                res.status(404).send({
                    result: 'Post not found'
                });
                return;
            }

            communityData.posts[postIndex].comments.push(newComment);

            const result = await collection.updateOne(
                { communityId: communityId },
                { $set: { posts: communityData.posts } }
            );

            if (result.modifiedCount === 0) {
                res.status(500).end();
            } else {
                const updatedComments = communityData.posts[postIndex].comments;
                res.status(200).send({
                    result: 'OK',
                    comments: updatedComments
                });
            }
        } catch (error) {
            console.error('Comment not added:', error);
            res.status(500).end();
        }
    }
}

export const newcomment = new NewComment();
