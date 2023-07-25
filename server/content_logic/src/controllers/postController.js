
module.exports = {
    getPosts: async (req, res) => {
        try {
            const pool = req.pool;
            const request = await pool.request().execute('social.GetPostsWithCommentsAndReplies');

            const posts = request.recordsets[0];

            if (posts.length === 0) {
                return res.status(404).json({ success: false, message: 'No posts found' });
            }

            const formattedPosts = posts.map(post => {
                return {
                    post_id: post.PostId,
                    user_id: post.PostUserId,
                    post_content: post.PostContent,
                    image_url: post.imageUrl,
                    video_url: post.videoUrl,
                    post_created_at: post.PostCreatedAt,
                    user_full_name: post.PostUserFullName,
                    user_username: post.PostUserUsername,
                    user_dp_url: post.PostUserDpUrl,
                    post_likes_count: post.post_likes_count,
                    total_comments_count: post.total_comments_count,
                    comments: JSON.parse(post.comments),
                };
            });

            return res.json({ success: true, data: formattedPosts });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    getPostDetails: async (req, res) => {
        try {
            const pool = req.pool;
            const { postId } = req.params;
            const response = await pool.request()
                .input('postId', postId)
                .execute('social.GetPostDetailsWithCommentsAndReplies');

            console.log(response)

            const postDetails = response.recordsets[0];
            if (postDetails.length === 0) {
                return res.status(404).json({ success: false, message: 'No posts found' });
            }

            const formattedPostDetails = postDetails.map(post => {
                return {
                    post_id: post.PostId,
                    user_id: post.PostUserId,
                    post_content: post.PostContent,
                    image_url: post.imageUrl,
                    video_url: post.videoUrl,
                    post_created_at: post.PostCreatedAt,
                    user_full_name: post.PostUserFullName,
                    user_username: post.PostUserUsername,
                    user_dp_url: post.PostUserDpUrl,
                    
                    comments: JSON.parse(post.comments),
                };
            });

            return res.json({ success: true, data: formattedPostDetails });
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const pool = req.pool;
            const user_id = req.session?.member_id

            if (pool.connected) {
                const request = pool.request()
                    .input("userId", user_id)
                const result = await request.query('SELECT * FROM social.posts WHERE user_id = @userId');
                //put a condition to check if they have posts otherwise say no posts found
                if (result.recordset.length > 0) {
                    res.json({
                        success: true,
                        message: "Posts retrieved successfully",
                        data: result.recordset
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Posts not found"
                    });
                }
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
            const user_id = req.session?.member_id;
            let { content, image_url, video_url } = req.body;
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
            let { content } = req.body;
            const pool = req.pool;

            if (pool.connected) {
                let results = await pool.request()
                    .input("id", req.params.id)
                    .input("content", content)
                    .execute('social.UpdatePost');
                console.log(results);
                if (results.recordsets[0].length > 0) {
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
    searchByUsername: async (req, res) => {
        const username = req.params.term;
        const { pool } = req;
      
        try {
          if (pool.connected) {
            const request = pool.request();
            request.input('username', username);
            const result = await request.execute('SearchUsersByUsername');
            res.json({
              success: true,
              message: "Searched users successfully",
              data: result.recordset
            });
          }
        } catch (error) {
          console.error(error);
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