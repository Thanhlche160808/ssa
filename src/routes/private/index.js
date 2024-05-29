// ** Express
import express from "express";

// ** Routes
import userRouter from "./user.js";

const privateRouter = express.Router();

privateRouter.use("/user", userRouter);

export { privateRouter };
