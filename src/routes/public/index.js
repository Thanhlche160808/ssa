// ** Express
import express from "express";

// ** Routes
import authRouter from "./auth.js";
import productRouter from "./product.js";

const publicRouter = express.Router();

publicRouter.use("/auth", authRouter);
publicRouter.use("/product", productRouter);

export { publicRouter };
