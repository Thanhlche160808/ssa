// ** Express
import express from "express";

// ** Routes
import userRouter from "./user.js";
import productRouter from "./product.js";

const privateRouter = express.Router();

privateRouter.use("/user", userRouter);
privateRouter.use("/product", productRouter);

export { privateRouter };
