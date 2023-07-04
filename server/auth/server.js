const express = require('express');
const cors = require('cors');
const memberRoutes = require('./src/routes/userRoutes');
const session = require('express-session');
const { v4 } = require('uuid')
require('dotenv').config;



const app = express();
app.use(cors());

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('src/assets'));

app.use(session({
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


app.get('/', (req, res) => {
    res.send('Welcome to the social app');
});
app.use('/', memberRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));