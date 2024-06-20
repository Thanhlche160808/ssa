// ** Express
import express from "express";

// ** Routes
import userRouter from "./user.js";
import cateRouter from "./cate.js";
import productRouter from "./product.js";
import paymentRouter from "./payment.js"
import voucherRouter from "./voucher.js";

const privateRouter = express.Router();

privateRouter.use("/user", userRouter);
privateRouter.use("/category", cateRouter);
privateRouter.use("/product", productRouter);
privateRouter.use("/payment", paymentRouter)
privateRouter.use("/voucher", voucherRouter);

export { privateRouter };
