const commentRoutes = require('express').Router()

const {getComments, createComment, deleteComment, getCommentById, getPostCommentsCount} = require('../controllers/commentController');

commentRoutes.get('/comments', getComments);
commentRoutes.get('/comments/:id', getCommentById);
commentRoutes.post('/comments', createComment);
commentRoutes.delete('/comments/:id', deleteComment);
commentRoutes.get('/commentscount/:post_id', getPostCommentsCount);

module.exports=commentRoutes;