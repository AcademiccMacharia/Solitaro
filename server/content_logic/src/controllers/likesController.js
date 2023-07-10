const { TYPES } = require('mssql');
module.exports = {
    handleLikesAndDislikes: async (req, res) => {
        try {
        const userId = req.session?.member_id;
          const { likeType, entityId, action } = req.body;
          const pool = req.pool;
      
          if (pool.connected) {
            const result = await pool.request()
              .input('likeType', likeType)
              .input('userId', TYPES.UniqueIdentifier, userId)
              .input('entityId', TYPES.UniqueIdentifier, entityId)
              .input('action', action)
              .execute('social.HandleLikesAndDislikes');

            console.log(result);
              res.json({ success: true, message: 'Action completed successfully' });
          } else {
            res.status(500).json({ success: false, message: 'Internal server error' });
          }
        } catch (error) {
          console.error('Error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
      },      
    getCommentLikesCount: async (req, res) => {
        try {
            const { comment_id } = req.params;
            const pool = req.pool;
            if (pool.connected) {
                const result = await pool.request()
                    .input('comment_id', comment_id)
                    .execute('social.GetCommentLikes');
                console.log(result)
                const likesCount = result.recordset[0].likes_count;
                if (likesCount > 0){
                res.json({
                    success: true,
                    message: "Comment likes count retrieved successfully",
                    data: likesCount
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "No likes for the comment"
                });
            }
            } else {
                throw new Error('Database connection error');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
    getPostLikesCount: async (req, res) => {
        try {
            const { post_id } = req.params;
            const pool = req.pool;
            if (pool.connected) {
                const result = await pool.request()
                    .input('post_id', post_id)
                    .execute('social.GetPostLikes');
                console.log(result)
                const likesCount = result.recordset[0].likes_count;
                if (likesCount > 0){
                res.json({
                    success: true,
                    message: "Post likes count retrieved successfully",
                    data: likesCount
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "No likes for the post"
                });
            }
            } else {
                res.status(500).json({
                    success: false,
                    message: "Internal server error"
                })
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
    getReplyLikesCount: async (req, res) => {
        try {
            const { reply_id } = req.params;
            const pool = req.pool;
            if (pool.connected) {
                const result = await pool.request()
                    .input('reply_id', reply_id)
                    .execute('social.GetReplyLikes');

                const likesCount = result.recordset[0].likes_count;
                if (likesCount > 0){
                    res.json({
                        success: true,
                        message: "Reply likes count retrieved successfully",
                        data: likesCount
                    })
                } else {
                    res.status(404).json({
                        success: false,
                        message: "No likes for the reply"
                    });
                }
            } else {
                throw new Error('Database connection error');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}





