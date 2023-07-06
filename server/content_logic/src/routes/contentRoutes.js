const routes  = require('express').Router()

const {getPosts, createNewPost, deletePost, getPostById, updatePost} = require('../controllers/postController');

routes.get('/posts', getPosts);
routes.get('/posts/:id', getPostById);
routes.post('/posts', createNewPost);
routes.put('/posts/:id', updatePost);
routes.delete('/posts/:id', deletePost);

module.exports=routes;