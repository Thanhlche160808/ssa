// ** Express
import express from "express";

// ** Routes
import authRouter from "./auth.js";
import cateRouter from "./cate.js";

const publicRouter = express.Router();

publicRouter.use("/auth", authRouter);
publicRouter.use("/category", cateRouter);

export { publicRouter };
