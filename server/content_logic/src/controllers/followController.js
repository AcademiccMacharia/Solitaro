module.exports = {
    getFollowersRelationshipTable: async (req, res) => {
        try {
            const pool = req.pool;
            if (pool.connected) {
                let followers = await pool.request()
                    .execute('social.GetFollowers');
                res.json({
                    success: true,
                    message: "Followers retrieved successfully",
                    data: followers.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getUsersNotFollowed: async (req, res) => {
        const { pool } = req;
        const userId = req.session?.member_id;

        try {
            const request = await pool
                .request()
                .input('userId', userId)
                .execute('social.GetUsersNotFollowed');

            const users = request.recordset;
            return res.json({ success: true, data: users });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    getFollowers: async (req, res) => {
        const { pool } = req;
        const userId = req.session?.member_id;

        try {
            const request = await pool
                .request()
                .input('userId', userId)
                .execute('social.GetFollowers');

            const users = request.recordset;
            return res.json({ success: true, data: users });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    getFollowing: async (req, res) => {
        const { pool } = req;
        const userId = req.session?.member_id;

        try {
            const request = await pool
                .request()
                .input('userId', userId)
                .execute('social.GetFollowing');

            const users = request.recordset;
            return res.json({ success: true, data: users });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    followUser: async (req, res) => {
        const following_user_id = req.session?.member_id;
        let { followed_user_id } = req.body;
        try {
            const pool = req.pool;
            if (pool.connected) {
                let followUser = await pool.request()
                    .input('following_user_id', following_user_id)
                    .input('followed_user_id', followed_user_id)
                    .execute('social.FollowUser');
                res.json({
                    success: true,
                    message: followUser.recordsets[0][0].message,
                    data: followUser.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.number === 50001) {
                res.status(409).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },

    unfollowUser: async (req, res) => {
        const following_user_id = req.session?.member_id;
        let { followed_user_id } = req.params
        try {
            const pool = req.pool;
            if (pool.connected) {
                let unfollowUser = await pool.request()
                    .input('following_user_id', following_user_id)
                    .input('followed_user_id', followed_user_id)
                    .execute('social.UnfollowUser');
                res.json({
                    success: true,
                    message: unfollowUser.recordsets[0][0].message,
                    data: unfollowUser.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.number === 50002) {
                res.status(409).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },
    getFollowersById: async (req, res) => {
        let user_id = req.params.id;
        try {
            const pool = req.pool;
            if (pool.connected) {
                let followers = await pool.request()
                    .input('user_id', user_id)
                    .execute('social.GetFollowerUsernames');
                console.log(followers);
                if (followers.recordsets[0].length > 0) {
                    res.json({
                        success: true,
                        message: "Followers retrieved successfully",
                        data: followers.recordsets[0]
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: "Followers not found"
                    });
                }
            } else {
                res.status(500).json({
                    message: "Internal server error"
                });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({
                error: error.message
            });
        }
    },
    getFollowingById: async (req, res) => {
        let user_id = req.params.id;
        try {
            const pool = req.pool;
            if (pool.connected) {
                let following = await pool.request()
                    .input('user_id', user_id)
                    .execute('social.GetFollowingUsernames');
                console.log(following);
                if (following.recordsets[0].length > 0) {
                    res.json({
                        success: true,
                        message: "Following retrieved successfully",
                        data: following.recordsets[0]
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: "Following not found"
                    });
                }
            } else {
                res.status(500).json({
                    message: "Internal server error"
                });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({
                error: error.message
            });
        }
    },

    getFollowersCount: async (req, res) => {
        try {
            let user_id = req.params.id;
            const pool = req.pool;
            if (pool.connected) {
                let followersCount = await pool.request()
                    .input('user_id', user_id)
                    .execute('social.GetFollowersCount');
                console.log(followersCount)
                res.json({
                    success: true,
                    message: "Followers count retrieved successfully",
                    data: followersCount.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getFollowingCount: async (req, res) => {
        try {
            const pool = req.pool;
            let user_id = req.params.id;
            if (pool.connected) {
                let followingCount = await pool.request()
                    .input('user_id', user_id)
                    .execute('social.GetFollowingCount');
                res.json({
                    success: true,
                    message: "Following count retrieved successfully",
                    data: followingCount.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}