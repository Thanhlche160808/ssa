//** Lib
import express from "express";
import http from "http";

// ** Configs
import configApp from "./configs/appConfig";

// ** Routes
import { publicRouter } from "./routes";

// ** Middlewares
import { verifyAccessToken } from "./middlewares/auth";

const app = express();
configApp(app);

const server = http.createServer(app);

// ** Public Routes
app.use("/api/public", publicRouter);

// ** Private Routes
app.use("/api/*", verifyAccessToken);

app.use("/*", (req, res) => {
    res.status(200).json({
        code: 404,
        message: "API not found",
    });
});

export { server };
