const notificationRoutes = require('express').Router();

const { getNotificationDescriptions, getNotifications, getCommentNotifications, getLikeNotifications, deleteNotification, updateReadStatus } = require('../controllers/notificationController');

const {sessionAuthorization} = require("../middlewares/sessionAuthorization");

notificationRoutes.use(sessionAuthorization);

notificationRoutes.get('/notification', getNotifications);
notificationRoutes.get('/notifications', getNotificationDescriptions);
notificationRoutes.get('/commentnotifications', getCommentNotifications);
notificationRoutes.get('/likenotifications', getLikeNotifications);
notificationRoutes.put('/updatestatus', updateReadStatus);
notificationRoutes.delete('/notifications/:notificationId', deleteNotification);

module.exports = notificationRoutes;