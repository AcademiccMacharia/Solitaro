const followRoutes = require('express').Router()
const {getFollowersCount, getFollowingCount, getFollowingById, getFollowersById, unfollowUser, followUser, getFollowersRelationshipTable, getUsersNotFollowed} = require('../controllers/followController');

const {sessionAuthorization} = require("../middlewares/sessionAuthorization")

followRoutes.use(sessionAuthorization);

followRoutes.get('/followers/:id', getFollowersById);
followRoutes.get('/following/:id', getFollowingById);
followRoutes.get('/followerscount/:id', getFollowersCount);
followRoutes.get('/followingcount/:id', getFollowingCount);
followRoutes.get('/followersrelationship', getFollowersRelationshipTable);
followRoutes.get('/usersnotfollowed', getUsersNotFollowed);
followRoutes.post('/follow', followUser);
followRoutes.delete('/unfollow', unfollowUser);

module.exports=followRoutes;
