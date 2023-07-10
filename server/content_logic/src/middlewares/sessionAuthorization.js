const { createClient } = require('redis');
const RedisStore = require("connect-redis").default;

async function sessionAuthorization(req, res, next) {

  try {
    const redisClient = createClient();
    redisClient.connect();
    console.log("Connected to Redis")

    let cookie = req.headers['cookie']
    console.log(cookie)
    let sessionID = cookie.substring(16, 52)
    let session = await redisClient.get(sessionID)
    console.log(session)
    if(session == null){
      res.status(401).send("You are not logged in");
    } else{
      let json_session = JSON.parse(session)
    console.log(json_session.authorized)

    const authorized = json_session?.authorized;

  
    if ( authorized) {
      console.log(json_session);
      req.session = json_session;
      next();
    } else {
      res.status(401).send("You are not logged in");
    }

    }
    
  } catch (error) {
    res.send(error.message)
  }
    
  }

module.exports = {sessionAuthorization};
  