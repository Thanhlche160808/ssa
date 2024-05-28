// ** Express
import express from "express";

// ** Controllers
import authValidation from "../../controllers/auth.controller";

// ** Middlewares
// import { authValidation } from "../../middlewares/validate-data/auth";

const router = express.Router();

router.post("/register", authValidation.register);
router.post("/login", authValidation.login);

export default router;
