const notificationRoutes = require('express').Router();

const { getNotificationDescriptions, getNotifications, deleteNotification } = require('../controllers/notificationController');

notificationRoutes.get('/notifications', getNotifications);
notificationRoutes.get('/notifications/:userId', getNotificationDescriptions);
notificationRoutes.delete('/notifications/:notificationId', deleteNotification);

module.exports = notificationRoutes;