// ** Express
import express from "express";

// ** Routes
import authRouter from "./auth.js";
import cateRouter from "./cate.js";
import productRouter from "./product.js";
import cartRouter from "./cart.js";
import paymentRouter from "./payment.js"

const publicRouter = express.Router();

publicRouter.use("/auth", authRouter);
publicRouter.use("/category", cateRouter);
publicRouter.use("/product", productRouter);
publicRouter.use("/cart", cartRouter);
publicRouter.use("/payment", paymentRouter);

export { publicRouter };
