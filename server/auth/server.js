const express = require('express');
const cors = require('cors');
const memberRoutes = require('./src/routes/userRoutes');
const session = require('express-session');
const path = require('path');
const { v4 } = require('uuid');
const mssql = require('mssql');
const config = require('./src/config/appConfig');
require('dotenv').config;
// const connectRedis = require('connect-redis').default;
// const redis = require("connect-redis")
// const RedisStore = require('connect-redis')(session);



const app = express();
app.use(cors());

app.use(express.json());

// const redisStore = new RedisStore({url: https:localhost:6379})
// console.log(redisStore)

const redisStore = connectRedis.(session)
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})

const redisStore = new RedisStore({
    client: redisClient
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static('src/assets'));

async function StartApp(){
    try {
      let pool = await mssql.connect(config);
      console.log(' App Connected to database');
app.use((req, res, next)=> {req.pool = pool; next()})
      app.use(session({
        // store: new RedisStore(),
        secret: process.env.SECRET_KEY,
        saveUninitialized: true,
        genid: () => v4(),
        resave: false,
        rolling: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: true
        }
    }));
    } catch (error) {
      console.log(error);
    }
  }


app.get('/', (req, res) => {
    res.send('Welcome to the social app');
});

app.use('/', memberRoutes);
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/logged-in/:member_id', (req, res) => {
    const { member_id } = req.params;
    if (req.session.member_id && req.session.member_id === member_id) {
      req.session.authorized = true;
      res.send('Logged in successfully');
    } else {
      res.redirect('/login');
    }
  });


  StartApp();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = {app};