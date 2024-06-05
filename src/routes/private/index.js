// ** Express
import express from "express";

// ** Routes
import userRouter from "./user.js";
import cateRouter from "./cate.js";

const privateRouter = express.Router();

privateRouter.use("/user", userRouter);
privateRouter.use("/category", cateRouter);

export { privateRouter };
