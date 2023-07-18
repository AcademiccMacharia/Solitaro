const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sql = require('mssql');
const config = require('./src/config/appConfig');
const notificationRoutes = require('./src/routes/notificationRoutes');

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the social app');
});

const pool = new sql.ConnectionPool(config);

async function startApp() {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to the database");

    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });

    app.get("/", (req, res, next) => {
      const cont = true;
      console.log(req);
      if (cont) {
        console.log("Hello from the middleware");
      } else {
        res.send("Error logged from middleware");
      }
    });

    app.use('/', notificationRoutes);

    app.use("*", (req, res, next) => {
      const error = new Error("Route Not found");
      next({
        status: 404,
        message: error.message,
      });
    });

    app.use((error, req, res, next) => {
      res.status(error.status).json(error.message);
    });

    const port = process.env.PORT;

    app.listen(port, () => console.log(`Server on port: ${port}`));

  } catch (error) {
    console.log(error)
  }
}

startApp();
