// ** Lib
import express from "express";

// ** Controllers
import voucherController from "../../controllers/voucher.controller.js";

// ** Middlewares
// import { authValidation } from "../../middlewares/validate-data/auth.js";

const router = express.Router();

router.post("/new", voucherController.newVoucher);

router.get("/", voucherController.getVoucher);

router.get("/:code", voucherController.getByCode);

export default router;