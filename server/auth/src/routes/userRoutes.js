const memberRoutes = require('express').Router()
const {registerMember, loginMember, logoutMember} = require('../controllers/memberController');


memberRoutes.post('/login', loginMember)
memberRoutes.post('/register', registerMember)
memberRoutes.get('/logout', logoutMember)

module.exports = memberRoutes;