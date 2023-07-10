const express = require('express');
const memberController = require('../controllers/memberController');
const memberRoutes = express.Router();


const { sessionAuthorization } = require("../middlewares/sessionAuthorization");


const newUserMiddleware = require("../middlewares/newUserMiddleware");


memberRoutes.post('/login',  memberController.loginMember);
memberRoutes.post('/register', newUserMiddleware, memberController.registerMember);
memberRoutes.get('/followingposts', memberController.getFollowedPosts);
memberRoutes.get('/profile', memberController.getMemberProfile);
memberRoutes.put('/updateprofile', memberController.editProfile);
memberRoutes.delete('/deleteuser/:userId', memberController.deleteUser);
memberRoutes.put('/updatepw', memberController.changePassword);
memberRoutes.get('/logout', sessionAuthorization, memberController.logoutMember);

module.exports = memberRoutes;