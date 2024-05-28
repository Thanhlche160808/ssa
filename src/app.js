//** Lib
import express from "express";
import http from "http";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './configs/swagger.config'; 

// ** Configs
import configApp from "./configs/appConfig";

// ** Routes
import { publicRouter } from "./routes";
import { privateRouter } from "./routes";

// ** Middlewares
import { verifyAccessToken } from "./middlewares/auth";

const app = express();
configApp(app);

const server = http.createServer(app);

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
