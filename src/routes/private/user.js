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
 *             _id:
 *              type: string
 *             username:
 *              type: string
 *             email:
 *              type: string
 *             isBlocked:
 *              type: boolean
 *             role:
 *              type: string
 *             user:
 *              type: Object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  avatar:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  deliveryAddress:
 *                      type: array
 *                  address:
 *                     type: string
 *       example:
 *         isSuccess: true
 *         statusCode: 200
 *         data: 
 *              _id: "60d0fe4f5311236168a109ca"
 *              username: "johndoe"
 *              email: "johndoe@example.com"
 *              isBlocked: false
 *              role: "User"
 *              user:
 *                  firstName: "John"
 *                  lastName: "Doe"
 *                  avatar: "http://example.com/avatar.jpg"
 *                  phone: "123456789"
 *                  deliveryAddress: []
 *                  address: "123 Main St"
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
 *                 $ref: '#/components/schemas/User'
 */
router.get("/profile", userController.getProfile);

export default router;
