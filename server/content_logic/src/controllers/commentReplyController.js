module.exports = {
    getCommentReplies: async (req, res) => {
        try {
            const pool = req.pool;
            if (pool.connected) {
                let replies = await pool.request()
                    .execute('social.GetCommentReply');
                res.json({
                    success: true,
                    message: "Replies retrieved successfully",
                    data: replies.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    createReply: async (req, res) => {
        try {
            let { user_id, comment_id, content } = req.body;
            const pool = req.pool;
            if (pool.connected) {
                let results = await pool.request()
                    .input("user_id", user_id)
                    .input("comment_id", comment_id)
                    .input("content", content)
                    .execute('social.WriteReply');
                console.log(results);
                res.json({
                    success: true,
                    message: "Reply created successfully",
                    data: results.recordsets[0]
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({
                success: false,
                Error: error.message
            });
        }
    },
    getCommentReplyById: async (req, res) => {
        let reply_id = req.params.id;
        try {
            const pool = req.pool;
            if (pool.connected) {
                let reply = await pool.request()
                    .input('reply_id', reply_id)
                    .execute('social.GetReplyByID');
                console.log(reply);
                if (reply.recordsets[0].length > 0) {
                    res.json({
                        success: true,
                        message: "Reply retrieved successfully",
                        data: reply.recordsets[0]
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Reply not found"
                    });
                }
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: error.message });
        }
    },
    deleteCommentReply: async (req, res) => {
        try {
            const pool = req.pool;
            if (pool.connected) {
                let results = await pool.request()
                    .input("id", req.params.id)
                    .execute('social.DeleteCommentReply');
                console.log(results);
                res.json({
                    success: true,
                    message: "Reply deleted successfully",
                    data: results.recordsets[0]
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({
                success: false,
                Error: error.message
            });
        }
    }
}