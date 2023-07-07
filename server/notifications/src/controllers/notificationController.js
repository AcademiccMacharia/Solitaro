module.exports = {
    getNotifications: async (req, res) => {
        try {
            const pool = req.pool;
            if (pool.connected) {
                let notifications = await pool.request()
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
    getNotificationDescriptions: async (req, res) => {
        try {
            const { userId } = req.params;
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