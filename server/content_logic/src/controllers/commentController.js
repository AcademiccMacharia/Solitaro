module.exports = {
    getComments: async (req, res) => {
        try {
            const pool = req.pool;
            if (pool.connected) {
                let comments = await pool.request()
                    .execute('social.GetComments');
                res.json({
                    success: true,
                    message: "Comments retrieved successfully",
                    data: comments.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getCommentById: async (req, res) => {
        let comment_id = req.params.id;
        try {
            const pool = req.pool;
            if (pool.connected) {
                let comment = await pool.request()
                    .input('comment_id', comment_id)
                    .execute('social.GetCommentByID');
                console.log(comment);
                if (comment.recordsets[0].length > 0) {
                    res.json({
                        success: true,
                        message: "Comment retrieved successfully",
                        data: comment.recordsets[0]
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Comment not found"
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
    createComment: async (req, res) => {
        try {
            let { user_id, post_id, content } = req.body;
            const pool = req.pool;

            if (pool.connected) {
                let results = await pool.request()
                    .input("user_id", user_id)
                    .input("post_id", post_id)
                    .input("content", content)
                    .execute('social.WriteComment');
                console.log(results);
                res.json({
                    success: true,
                    message: "Comment created successfully",
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
    deleteComment: async (req, res) => {
        try {
            const { comment_id } = req.params;
            const pool = req.pool;
            if (pool.connected) {
                const request = pool.request();
                request.input("comment_id", comment_id);
                const result = await request.execute('social.DeleteComment');
    
                if (result.recordset[0].Deleted === 1) {
                    res.json({
                        success: true,
                        message: "Comment deleted successfully"
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: "Comment not found"
                    });
                }
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
                error: error.message
            });
        }
    }
    
}