// ** Libs
import express from 'express';

// ** Controller
import orderController from '../../controllers/order.controller.js';

// ** Validation
import { orderValidation } from '../../middlewares/validate-data/order.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         statusCode:
 *           type: integer
 *         data:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               example: Vintage
 *             items:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   displayName:
 *                     type: string
 *                   productCode:
 *                     type: string
 *                   image:
 *                     type: string
 *                   price:
 *                     type: number
 *                   size:
 *                     type: number
 *                   quantity:
 *                     type: number
 *             accountId:
 *               type: string
 *             email:
 *               type: string
 *             receiverName:
 *               type: string
 *             receiverPhone:
 *               type: string
 *             deliveryAddress:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                 city:
 *                   type: string
 *                 district:
 *                   type: string
 *                 ward:
 *                   type: string
 *             voucherCode:
 *               type: string
 *             paymentMethod:
 *               type: string
 *             deliveryTime:
 *               type: string
 *             shippingFee:
 *               type: number
 *             totalPrice:
 *               type: number
 *       example:
 *         isSuccess: true
 *         statusCode: 200
 *         data:
 *           code: Vintage
 *           items:
 *             - displayName: Vintage
 *               productCode: Vintage
 *               image: Vintage
 *               price: 1000
 *               size: 1
 *               quantity: 1
 *           accountId: 1
 *           email: abcd@gmail.com
 *           receiverName: abcd
 *           receiverPhone: 123456789
 *           deliveryAddress:
 *             address: 123 abc
 *             city: HCM
 *             district: 1
 *             ward: 1
 *           voucherCode: 1
 *           paymentMethod: COD
 *           deliveryTime: 2021-09-20
 *           shippingFee: 10000
 *           totalPrice: 100000
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The Order managing API
 */

/**
 * @swagger
 * /api/public/order/create:
 *   post:
 *     summary: Create new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                items:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      displayName:
 *                        type: string
 *                      productCode:
 *                        type: string
 *                      image:
 *                        type: string
 *                      price:
 *                        type: number
 *                      size:
 *                        type: number
 *                      quantity:
 *                        type: number
 *                accountId:
 *                  type: string
 *                email:
 *                  type: string
 *                receiverName:
 *                  type: string
 *                receiverPhone:
 *                  type: string
 *                deliveryAddress:
 *                  type: object
 *                  properties:
 *                    address:
 *                      type: string
 *                    city:
 *                      type: string
 *                    district:
 *                      type: string
 *                    ward:
 *                      type: string
 *                voucherCode:
 *                  type: string
 *                paymentMethod:
 *                  type: string
 *                deliveryTime:
 *                  type: string
 *                shippingFee:
 *                  type: number
 *                totalPrice:
 *                  type: number
 *           example:
 *            items:
 *              - displayName: Adidas - High Top - Dark
 *                productCode: D0P5ZYVRVH
 *                image: https://res.cloudinary.com/dh41vh9dx/image/upload/v1631710007/ecommerce/products/D0P5ZYVRVH.jpg
 *                price: 400000
 *                size: 42
 *                quantity: 43
 *            accountId: 1
 *            email: abcd@gmail.com
 *            receiverName: Thomas Lee
 *            receiverPhone: "0364716472"
 *            deliveryAddress:
 *                  address: Hà Hồi 
 *                  city: Hà Nội
 *                  district: Thường Tín
 *                  ward: Hà Hồi
 *            voucherCode: 1
 *            paymentMethod: COD
 *            deliveryTime: 2021-09-20
 *            shippingFee: 20000
 *            totalPrice: 400000
 *     responses:
 *       200:
 *         description: Create new order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/create', orderValidation.create(), orderController.createOrder);


/**
 * @swagger
 * /api/public/order/{code}:
 *   get:
 *     summary: Get order detail
 *     tags: [Order]
 *     parameters:
 *          - in: path
 *            name: code
 *            schema:
 *               type: string
 *            required: true
 *     responses:
 *       200:
 *         description: Create new order
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Order'
*/
router.get('/:code', orderController.getOrderDetail);

export default router;