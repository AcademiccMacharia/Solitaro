const replyRoutes = require('express').Router();

const {getCommentReplies, createReply, deleteCommentReply, getCommentReplyById } = require('../controllers/commentReplyController');

replyRoutes.get('/reply', getCommentReplies);
replyRoutes.post('/reply', createReply);
replyRoutes.get('/reply/:id', getCommentReplyById);
replyRoutes.delete('/reply/:id', deleteCommentReply);

module.exports = replyRoutes;