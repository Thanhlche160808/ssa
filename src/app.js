//** Lib
import express from "express";
import http from "http";
import swaggerUi from 'swagger-ui-express';

// ** Configs
import configApp from "./configs/appConfig.js";
import swaggerSpec from './configs/swagger.config.js'; 

// ** Routes
import { publicRouter, privateRouter } from "./routes/index.js";

// ** Middlewares
import { verifyAccessToken } from "./middlewares/auth.js";

const app = express();
configApp(app);

const server = http.createServer(app);

app.use("/server-check", (req, res) => {
    res.status(200).json("Hello World");
});

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ** Public Routes
app.use("/api/public", publicRouter);

// ** Private Routes
app.use("/api/*", verifyAccessToken);

// Private Routes
app.use("/api", privateRouter);

app.use("/*", (req, res) => {
    res.status(200).json({
        code: 404,
        message: "API not found",
    });
});

export { server };
