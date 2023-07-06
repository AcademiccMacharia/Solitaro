module.exports = {
    getPosts: async (req, res) => {
        try {
            const pool = req.pool;

            if (pool.connected) {
                const request = pool.request();
                const result = await request.query('SELECT * FROM social.posts');

                res.json({
                    success: true,
                    message: "Posts retrieved successfully",
                    data: result.recordset
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    createNewPost: async (req, res) => {
        try {
            let { user_id, content, image_url, video_url } = req.body;
            // let { value } = newPostValidator(post)
            const pool = req.pool;
            if (pool.connected) {
                let results = await pool.request()
                    .input("user_id", user_id)
                    .input("content", content)
                    .input("image_url", image_url)
                    .input("video_url", video_url)
                    .execute('social.CreatePost');
                console.log(results);
                res.json({
                    success: true,
                    message: "Post created successfully",
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
    getPostById: async (req, res) => {
        let post_id = req.params.id;
        try {
            const pool = req.pool;
            if (pool.connected) {
                let post = await pool.request()
                            .input('post_id', post_id)
                            .execute('social.GetPostByID');
                console.log(post);
                if (post.recordsets[0].length > 0) {
                    res.json({
                        success: true,
                        message: "Post retrieved successfully",
                        data: post.recordsets[0]
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Post not found"
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
        updatePost: async (req, res) => {
            try {
                let {content} = req.body;
                const pool = req.pool;

                if (pool.connected) {
                    let results = await pool.request()
                        .input("id", req.params.id)
                        .input("content", content)
                        .execute('social.UpdatePost');
                    console.log(results);
                    if (results.recordsets[0].length>0){
                    res.json({
                        success: true,
                        message: "Post updated successfully",
                        data: results.recordsets[0]
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: "Post not found"
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
            deletePost: async (req, res) => {
                try {
                    const pool = req.pool;
                    if (pool.connected) {
                        let results = await pool.request()
                            .input("id", req.params.id)
                            .execute('social.DeletePost');
            
                        console.log(results);
            
                        const rowsAffected = results.recordsets[0][0].RowsAffected;
                        
                        if (rowsAffected > 0) {
                            res.json({
                                success: true,
                                message: "Post deleted successfully",
                                data: rowsAffected
                            });
                        } else {
                            res.status(404).json({
                                success: false,
                                message: "Post not found"
                            });
                        }
                    } else {
                        res.status(500).json({ message: "Internal server error" });
                    }
                } catch (error) {
                    console.error("Error:", error);
                    res.status(500).json({ error: "Internal server error" });
                }
            }
            
    }