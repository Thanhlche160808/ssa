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
 *                 fullName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 province:
 *                   type: object
 *                   properties:
 *                      provinceId:
 *                          type: number
 *                      provinceName:
 *                          type: string
 *                 district:
 *                   type: object
 *                   properties:
 *                      districtId:
 *                         type: number
 *                      districtName:
 *                         type: string
 *                 ward:
 *                   type: object
 *                   properties:
 *                        wardId:
 *                           type: string
 *                        wardName:
 *                           type: string
 *                 isDefault:
 *                   type: boolean
 *       example:
 *         isSuccess: true
 *         statusCode: 200
 *         data: 
 *            - id: "60d0fe4f5311236168a109ca"
 *              fullName: "Thomas Lee"
 *              phone: "0364716473"
 *              email: "abcd@gmail.com"
 *              address: "123 Main St"
 *              province:
 *                  provinceId: 201
 *                  provinceName: "Ha Noi" 
 *              district: 
 *                  districtId: 3303
 *                  districtName: "Thuong Tin"
 *              ward:
 *                  wardId: 1B2705
 *                  wardName: "Ha Hoi"
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
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               province:
 *                 type: object
 *                 properties:
 *                    provinceId:
 *                       type: number
 *                    provinceName:
 *                       type: string
 *               district:
 *                 type: object
 *                 properties:
 *                    districtId:
 *                       type: number
 *                    districtName:
 *                       type: string
 *               ward:
 *                 type: object
 *                 properties:
 *                    wardId:
 *                       type: string
 *                    wardName:
 *                       type: string
 *               isDefault:
 *                 type: boolean
 *             example:
 *               fullName: "Thomas Lee"
 *               phone: "0364716473"
 *               email: "abcd@gmail.com"
 *               address: "123 Main St"
 *               province:
 *                    provinceId: 201
 *                    provinceName: "Ha Noi"
 *               district:
 *                    districtId: 3303
 *                    districtName: "Thuong Tin"
 *               ward:
 *                    wardId: 1B2705
 *                    wardName: "Ha Hoi"
 *               isDefault: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryAddress'
 */

router.post('/delivery-address', userController.createDeliveryAddress);

/**
 * @swagger
 * /api/user/my-addresses:
 *   get:
 *     summary: My delivery addresses 
 *     tags: [User]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/DeliveryAddress'
 */
router.get('/my-addresses', userController.getMyAddresses);

/**
 * @swagger
 * /api/user/delivery-address/{addressId}:
 *   put:
 *     summary: Update delivery address
 *     tags: [User]
 *     parameters:
 *        - in: path
 *          name: addressId
 *          required: true
 *          schema:
 *             type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               province:
 *                 type: object
 *                 properties:
 *                    provinceId:
 *                       type: number
 *                    provinceName:
 *                       type: string
 *               district:
 *                 type: object
 *                 properties:
 *                    districtId:
 *                       type: number
 *                    districtName:
 *                       type: string
 *               ward:
 *                 type: object
 *                 properties:
 *                    wardId:
 *                       type: string
 *                    wardName:
 *                       type: string
 *               isDefault:
 *                 type: boolean
 *             example:
 *               fullName: "Thomas Lee"
 *               phone: "0364716473"
 *               email: "abcd@gmail.com"
 *               address: "123 Main St"
 *               province:
 *                    provinceId: 201
 *                    provinceName: "Ha Noi"
 *               district:
 *                    districtId: 3303
 *                    districtName: "Thuong Tin"
 *               ward:
 *                    wardId: 1B2705
 *                    wardName: "Ha Hoi"
 *               isDefault: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryAddress'
 */
router.put('/delivery-address/:addressId', userController.updateDeliveryAddress);

/**
 * @swagger
 * /api/user/delivery-address/{addressId}:
 *   delete:
 *     summary: Delete delivery address
 *     tags: [User]
 *     parameters:
 *        - in: path
 *          name: addressId
 *          required: true
 *          schema:
 *             type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryAddress'
 */
router.delete('/delivery-address/:addressId', userController.deleteDeliveryAddress);

export default router;
