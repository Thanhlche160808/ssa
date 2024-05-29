// ** Express
import express from "express";

// ** Controllers
import userController from "../../controllers/user.controller.js";

// ** Middlewares
// import { authValidation } from "../../middlewares/validate-data/auth";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         data:
 *           type: Object
 *           properties:
 *             firstName:
 *               type: string
 *               example: Thomas
 *             lastName:
 *               type: string
 *               example: Lee
 *             phone:
 *               type: string
 *               example: 123456789
 *             favorite:
 *               type: array
 *               items:
 *                 type: string
 *             deliveryAddress:
 *               type: array
 *               items:
 *                 type: string
 *       example:
 *         isSuccess: true
 *         statusCode: 200
 *         data: 
 *              firstName: Thomas
 *              lastName: Lee
 *              phone: 123456789
 *              favorite: []
 *              deliveryAddress: []
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 */
/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/profile", userController.getProfile);

export default router;
