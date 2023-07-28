const routes  = require('express').Router()

const {getPosts, createNewPost, deletePost, getPostDetails, getPostById, updatePost, getUserPosts, searchByUsername} = require('../controllers/postController');

const {sessionAuthorization} = require("../middlewares/sessionAuthorization");

routes.use(sessionAuthorization);

routes.get('/posts', getPosts);
routes.get('/userposts/:user_id', getUserPosts);
routes.get('/posts/:id', getPostById);
routes.get('/postdetails/:postId', getPostDetails);
routes.get('/search/:term', searchByUsername);
routes.post('/posts', createNewPost);
routes.put('/posts/:id', updatePost);
routes.delete('/posts/:id', deletePost);

module.exports=routes;