// ** Express
import express from "express";

// ** Routes
import userRouter from "./user.js";
import cateRouter from "./cate.js";
import productRouter from "./product.js";
import cartRouter from "./cart.js";

const privateRouter = express.Router();

privateRouter.use("/user", userRouter);
privateRouter.use("/category", cateRouter);
privateRouter.use("/product", productRouter);
privateRouter.use("/cart", cartRouter);


export { privateRouter };
