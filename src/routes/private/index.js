// ** Express
import express from "express";

// ** Routes
import userRouter from "./user.js";
import cateRouter from "./cate.js";
import productRouter from "./product.js";
import paymentRouter from "./payment.js"

const privateRouter = express.Router();

privateRouter.use("/user", userRouter);
privateRouter.use("/category", cateRouter);
privateRouter.use("/product", productRouter);
privateRouter.use("/payment", paymentRouter)

export { privateRouter };
