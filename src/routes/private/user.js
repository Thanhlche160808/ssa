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
 *     DeliveryAddress:
 *       type: object
 *       required:
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         data:
 *           type:: array
 *           items:
 *              type: object
 *              properties:
 *                 id:
 *                   type: string
 *                 address:
 *                   type: string
 *                 city:
 *                   type: number
 *                 district:
 *                   type: number
 *                 ward:
 *                   type: number
 *                 isDefault:
 *                   type: boolean
 *       example:
 *         isSuccess: true
 *         statusCode: 200
 *         data: 
 *            - id: "60d0fe4f5311236168a109ca"
 *              address: "123 Main St"
 *              city: 5132
 *              district: 12549
 *              ward: 65421
 *              isDefault: true
 */

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


/**
 * @swagger
 * /api/user/delivery-address:
 *   post:
 *     summary: Add delivery address
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               city:
 *                 type: number
 *               district:
 *                 type: number
 *               ward:
 *                 type: number
 *               isDefault:
 *                 type: boolean
 *             example:
 *               address: "123 Main St"
 *               city: 123123
 *               district: 1231231
 *               ward: 124123
 *               isDefault: true
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryAddress'
 */

router.post('/delivery-address', userController.createDeliveryAddress);
export default router;
