const routes  = require('express').Router()

const {getPosts, createNewPost, deletePost, getPostById, updatePost, getUserPosts} = require('../controllers/postController');

const {sessionAuthorization} = require("../middlewares/sessionAuthorization");

routes.use(sessionAuthorization);

routes.get('/posts', getPosts);
routes.get('/userposts', getUserPosts);
routes.get('/posts/:id', getPostById);
routes.post('/posts', createNewPost);
routes.put('/posts/:id', updatePost);
routes.delete('/posts/:id', deletePost);

module.exports=routes;