const notificationRoutes = require('express').Router();

const { getNotificationDescriptions, getNotifications, deleteNotification } = require('../controllers/notificationController');

const {sessionAuthorization} = require("../middlewares/sessionAuthorization");

notificationRoutes.use(sessionAuthorization);

notificationRoutes.get('/notification', getNotifications);
notificationRoutes.get('/notifications', getNotificationDescriptions);
notificationRoutes.delete('/notifications/:notificationId', deleteNotification);

module.exports = notificationRoutes;