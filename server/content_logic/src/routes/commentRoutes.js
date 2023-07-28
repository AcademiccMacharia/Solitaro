const commentRoutes = require('express').Router()

const {getComments, createComment, deleteComment, getCommentById, getPostCommentsCount} = require('../controllers/commentController');

const {sessionAuthorization} = require("../middlewares/sessionAuthorization");

commentRoutes.use(sessionAuthorization);

commentRoutes.get('/comments', getComments);
commentRoutes.get('/comments/:id', getCommentById);
commentRoutes.post('/comments', createComment);
commentRoutes.delete('/comments/:comment_id', deleteComment);
commentRoutes.get('/commentscount/:post_id', getPostCommentsCount);

module.exports=commentRoutes;