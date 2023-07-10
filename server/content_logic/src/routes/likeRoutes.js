const likeRoutes = require('express').Router()

const {handleLikesAndDislikes, getCommentLikesCount, getPostLikesCount, getReplyLikesCount } = require('../controllers/likesController');

const {sessionAuthorization} = require("../middlewares/sessionAuthorization")

likeRoutes.use(sessionAuthorization);

likeRoutes.post('/likes', handleLikesAndDislikes);
likeRoutes.get('/likes/comments/:comment_id', getCommentLikesCount);
likeRoutes.get('/likes/posts/:post_id', getPostLikesCount);
likeRoutes.get('/likes/replies/:reply_id', getReplyLikesCount);


module.exports=likeRoutes;