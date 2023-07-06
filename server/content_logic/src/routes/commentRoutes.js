const commentRoutes = require('express').Router()

const {getComments, createComment, deleteComment, getCommentById} = require('../controllers/commentController');

commentRoutes.get('/comments', getComments);
commentRoutes.get('/comments/:id', getCommentById);
commentRoutes.post('/comments', createComment);
commentRoutes.delete('/comments/:id', deleteComment);

module.exports=commentRoutes;