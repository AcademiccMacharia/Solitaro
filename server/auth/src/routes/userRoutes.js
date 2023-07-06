const express = require('express');
const memberController = require('../controllers/memberController');
const memberRoutes = express.Router();

memberRoutes.post('/login', memberController.loginMember);
memberRoutes.post('/register', memberController.registerMember);
memberRoutes.get('/logout', memberController.logoutMember);

module.exports = memberRoutes;