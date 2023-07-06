const followRoutes = require('express').Router()
const {getFollowersCount, getFollowingCount, getFollowingById, getFollowersById, unfollowUser, followUser, getFollowersRelationshipTable} = require('../controllers/followController');

followRoutes.get('/followers/:id', getFollowersById);
followRoutes.get('/following/:id', getFollowingById);
followRoutes.get('/followerscount/:id', getFollowersCount);
followRoutes.get('/followingcount/:id', getFollowingCount);
followRoutes.get('/followersrelationship', getFollowersRelationshipTable);
followRoutes.post('/follow', followUser);
followRoutes.delete('/unfollow', unfollowUser);

module.exports=followRoutes;
