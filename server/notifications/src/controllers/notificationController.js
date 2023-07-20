module.exports = {
    getNotifications: async (req, res) => {
        try {
            const userId = req.session?.member_id;
            const pool = req.pool;
            if (pool.connected) {
                let notifications = await pool.request()
                    .input('userId', userId)
                    .execute('social.GetNotifications');
                res.json({
                    success: true,
                    message: "Notifications retrieved successfully",
                    data: notifications.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getCommentNotifications: async (req, res) => {
        try {
            const userId = req.session?.member_id;
            const pool = req.pool;
            if (pool.connected) {
                let notifications = await pool.request()
                    .input('userId', userId)
                    .execute('social.GetCommentNotifications');
                res.json({
                    success: true,
                    message: "Comment notifications retrieved successfully",
                    data: notifications.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getLikeNotifications: async (req, res) => {
        try {
            const userId = req.session?.member_id;
            const pool = req.pool;
            if (pool.connected) {
                let notifications = await pool.request()
                    .input('userId', userId)
                    .execute('social.GetLikeNotifications');
                res.json({
                    success: true,
                    message: "Like notifications retrieved successfully",
                    data: notifications.recordsets[0]
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getNotificationDescriptions: async (req, res) => {
        try {
            const userId = req.session?.member_id;
            const pool = req.pool;

            if (pool.connected) {
                const result = await pool.request()
                    .input('userId', userId)
                    .execute('social.GetNotificationDescriptions');
                console.log(result)
                const descriptions = result.recordset.map((row) => row.description);
                if (!descriptions) {
                    res.status(404).json({
                        success: false,
                        message: 'No notifications found'
                    });
                } else {
                    res.json({
                        success: true,
                        message: 'Notification descriptions retrieved successfully',
                        data: descriptions
                    });
                }
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },
    updateReadStatus: async (req, res) => {
        const pool = req.pool;
        const { notificationId } = req.body;
      
        try {
          const request = await pool.request()
            .input('notificationId', notificationId)
            .execute('social.UpdateReadStatus');
      
          const successMessage = request.recordset[0]?.SuccessMessage;
      
          if (successMessage) {
            return res.json({ success: true, message: successMessage });
          } else {
            return res.status(404).json({ success: false, message: 'Notification not found' });
          }
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
        }
      },
      deleteNotification: async (req, res) => {
        try {
            const { notificationId } = req.params;
            const pool = req.pool;
            if (pool.connected) {
                await pool.request()
                    .input('notificationId', notificationId)
                    .execute('social.DeleteNotification');
                res.json({
                    success: true,
                    message: "Notification deleted successfully"
                });
            } else {
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}
