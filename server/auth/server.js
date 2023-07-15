const express = require('express');
const cors = require('cors');
const memberRoutes = require('./src/routes/userRoutes');
const session = require('express-session');
const path = require('path');
const { v4 } = require('uuid');
const sql = require('mssql');
const config = require('./src/config/appConfig');
require('dotenv').config;
const RedisStore = require("connect-redis").default;
const {createClient} = require("redis");
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());


async function connectToDatabase() {

  try {
    const pool = await sql.connect(config)
    console.log("Connected to the database")

    const redisClient = createClient();
    redisClient.connect()
    console.log("Connected to Redis")

    const redisStore = new RedisStore({
      client: redisClient,
      prefix: ''
    })
   
    const sessionSecret = uuidv4();

  const oneDay = 1000 * 60 * 60 * 24
  app.use((req, res, next) => {req.pool = pool; next()})
  app.use(session({
      store: redisStore,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      unset: "destroy",
      genid: ()=> v4(),
      cookie:{
          maxAge: oneDay,
          httpOnly: true,
          secure: false,
          domain: "localhost"
      }
  }))
  
  
  
  app.set("view engine", "ejs")
  
  app.get(
      "/", 
      (req, res, next) => {
          let cont = true;
      if (cont) {
        console.log("Hello from the middleware");
        next();
      } else {
        res.send("Error logged from middleware");
      }
      },
      (req, res) => {
          res.send("Ok")
      }
  );
  
  app.use('/', memberRoutes)

  app.get('/logs', (req, res) => {
    console.log(req.session);
    const authorized = req.session?.authorized;
  
    if (authorized) {
      res.send(`Welcome! You are logged in`);
    } else {
      res.status(401).json({
        success: false,
        message: "Login to access this page"
      });
    }
  });

app.get("/login", (req, res)=>{
    const { email, password} = req.body;


    if (email && password) {
        req.session.authorized = true;
        req.session.member = email;
    }

    res.json(req.session)
})

// app.get('/logout', (req, res)=>{
//   req.session.destroy();
//   res.send("Logout successfully")
// })
  
  app.use("*", (req, res, next) => {
      const error = new Error("Route Not found");
      next({
        status: 404,
        message: error.message,
      });
    });
    
    app.use((error, req, res, next) => {
      res.status(401).json(error.message);
    });
    
    const port = process.env.PORT;
    
    app.listen(port, () => console.log(`Server on port: ${port}`));
  
  } catch (error) {
    console.log('Error connecting to the database')
    console.log(error)
  }

}

connectToDatabase();