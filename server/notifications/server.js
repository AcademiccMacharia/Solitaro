const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sql = require('mssql');
const config = require('./src/config/appConfig');
const notificationRoutes = require('./src/routes/notificationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the social app');
});

const pool = new sql.ConnectionPool(config);

async function startApp() {
    try {
        await pool.connect();
        console.log("App connected to the database");

        app.use((req, res, next) => {
            req.pool = pool;
            next();
        });

        app.use('/', notificationRoutes);

        app.use("*", (req, res, next) => {
            const error = new Error("Route not found");
            next({
                status: 404,
                message: error.message
            });
        });

        app.use((error, req, res, next) => {
            res.status(error.status).json(error.message);
        });

        const port = process.env.PORT || 6000;
        app.listen(port, () => console.log(`Server on port: ${port}`));
    } catch (error) {
        console.log("Error connecting to the database");
        console.log(error);
    }
}

startApp();


