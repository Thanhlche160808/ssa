// ** Express
import express from "express";

// ** Routes
import authRouter from "./auth.js";

const publicRouter = express.Router();

publicRouter.use("/auth", authRouter);

export { publicRouter };
