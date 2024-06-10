// ** Lib
import express from 'express';

// ** Controller
import cartController from '../../controllers/cart.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         data:
 *           type: string
 *           example: "OK"
 *       example:
 *         isSuccess: true
 *         statusCode: 200
 *         data: "OK"
 */
/** 
 * @swagger
 * tags:
 *   name: Cart
 *   description: The Cart managing API
 */
/** 
 * @swagger
 *  /api/public/cart/add:
 *   post:
 *     summary: Add to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                      code:
 *                          type: string
 *                      color:
 *                          type: string
 *                      size:
 *                          type: number
 *                      quantity:
 *                          type: number
 *           example:
 *                  code: "123"
 *                  color: "#00CCFF"
 *                  size: 41
 *                  quantity: 2
 *     responses:
 *       200:
 *         description: Add to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: string
 *                   example: "OK"
 */
router.post('/add', cartController.addToCart);

router.get('/get', cartController.getCart);

router.get('/removeItem/:code', cartController.removeItem);

export default router;