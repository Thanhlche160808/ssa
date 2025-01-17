// ** Express
import express from "express";

// ** Routes
import authRouter from "./auth.js";
import cateRouter from "./cate.js";
import productRouter from "./product.js";
import paymentRouter from "./payment.js"
import orderRouter from "./order.js";

const publicRouter = express.Router();

publicRouter.use("/auth", authRouter);
publicRouter.use("/category", cateRouter);
publicRouter.use("/product", productRouter);
publicRouter.use("/payment", paymentRouter);
publicRouter.use("/order", orderRouter);

export { publicRouter };
