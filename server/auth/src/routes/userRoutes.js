const express = require('express');
const memberController = require('../controllers/memberController');
const memberRoutes = express.Router();


const { sessionAuthorization } = require("../middlewares/sessionAuthorization");


const newUserMiddleware = require("../middlewares/newUserMiddleware");


memberRoutes.post('/login/:email/:password',  memberController.loginMember);
memberRoutes.post('/register', newUserMiddleware, memberController.registerMember);
memberRoutes.get('/logout:id', sessionAuthorization, memberController.logoutMember);

module.exports = memberRoutes;