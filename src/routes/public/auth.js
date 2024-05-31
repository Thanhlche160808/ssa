// ** Lib
import express from "express";
import passport from "passport";

// ** Controllers
import authController from "../../controllers/auth.controller.js";

// ** Middlewares
// import { authValidation } from "../../middlewares/validate-data/auth";

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         data:
 *           type: Object
 *           properties:
 *             username:
 *               type: string
 *               example: thomaslee
 *             email:
 *               type: string
 *               example: testzed920@gmail.com
 *             isBlocked:
 *               type: boolean
 *               example: false
 *             role:
 *               type: string
 *               example: User
 *       example:
 *         isSuccess: true
 *         statusCode: 200
 *         data: 
 *              username: thomaslee
 *              email: testzed920@gmail.com
 *              isBlocked: false
 *              role: User
 */
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth API
 */
/**
 * @swagger
 * /api/public/auth/register:
 *   post:
 *     summary: Create a new account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *           example:
 *             username: thomaslee
 *             password: "123456"
 *             email: testzed920@gmail.com
 *             phone: "123456789"
 *             firstName: Thomas
 *             lastName: Lee
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                      isSuccess:
 *                          type: boolean
 *                      statusCode:
 *                          type: number
 *                      data:
 *                          type: Object
 *                          properties:
 *                              username:
 *                                  type: string
 *                                  example: thomaslee
 *                              email:
 *                                  type: string
 *                                  example: testzed920@gmail.com
 *                              isBlocked:
 *                                  type: boolean
 *                                  example: false
 *                              role:
 *                                  type: string
 *                                  example: User
 *             example:
 *              isSuccess: true
 *              statusCode: 200
 *              data: 
 *                  username: thomaslee
 *                  email: testzed920@gmail.com
 *                  isBlocked: false
 *                  role: User
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/public/auth/login:
 *  post:
 *     summary: Create a new account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             username: thomaslee
 *             password: thanh2002
 *     responses:
 *       200:
 *         description: User login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  isSuccess:
 *                      type: boolean
 *                      example: true
 *                  statusCode:
 *                      type: number
 *                      example: 200
 *                  data:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: thomaslee
 *                          accessToken:
 *                              type: string
 *                              example: eyJhbGciO....
 *                          refreshToken:
 *                              type: string
 *                              example: eyJhbGciO....
 */
router.post("/login", authController.login);

router.get("/google/login", passport.authenticate('google', { scope: ['profile', 'email'] , session: false}));

router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/' }), authController.loginWithGoogle);
export default router;
//