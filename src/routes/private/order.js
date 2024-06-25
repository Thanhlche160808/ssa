// ** Libs
import express from 'express';

// ** Controller
import orderController from '../../controllers/order.controller.js';

// ** Validation
import { orderValidation } from '../../middlewares/validate-data/order.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The Order managing API
 */

/**
 * @swagger
 * /api/order/my-order:
 *   get:
 *     summary: My order
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *           example: 10
 *       - in: query
 *         name: code
 *         schema:
 *            type: string
 *            example: V79BKN78H
 *       - in: query
 *         name: status
 *         schema:
 *            type: string
 *            example: PENDING
 *     responses:
 *       200:
 *         description: Create new order
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    isSuccess:
 *                    type: boolean
 *                 statusCode:
 *                    type: number
 *                    example: 200
 *                 data:
 *                    type: array
 *                    items:
 *                       type: object
 *                       properties:
 *                            code:
 *                               type: string
 *                            items:
 *                               type: array
 *                               items:
 *                                  type: object
 *                                  properties:
 *                                      displayName:
 *                                          type: string
 *                                      productCode:
 *                                           type: string
 *                                      image:
 *                                           type: string
 *                                      price:
 *                                           type: number
 *                                      size:
 *                                           type: number
 *                                      quantity:
 *                                            type: number
 *                            accountId:
 *                                 type: string
 *                            email:
 *                                 type: string
 *                            receiverName:
 *                                 type: string
 *                            receiverPhone:
 *                                 type: string
 *                            deliveryAddress:
 *                                 type: object
 *                                 properties:
 *                                      address:
 *                                          type: string
 *                                      city:
 *                                          type: string
 *                                      district:
 *                                          type: string
 *                                      ward:
 *                                          type: string
 *                            voucherCode:
 *                                  type: string
 *                            paymentMethod: 
 *                                  type: string
 *                            deliveryTime:
 *                                  type: string
 *                            shippingFee:
 *                                  type: number
 *                            totalPrice:
 *                                  type: number      
 *              example:
 *                  isSuccess: true
 *                  statusCode: 200
 *                  data:
 *                      - code: V79BKN78H
 *                        items:
 *                            - displayName: Vintage
 *                              productCode: Vintage
 *                              image: Vintage
 *                              price: 100
 *                              size: 1
 *                              quantity: 1
 *                        accountId: adadb121312
 *                        email: abcd@gmail.com
 *                        receiverName: abcd
 *                        receiverPhone: "0364716472"
 *                        deliveryAddress:
 *                              address: 123 abc
 *                              city: HCM
 *                              district: Thuong Tin
 *                              ward: Ha Hoi
 *                        voucherCode: V79BKN78H
 *                        paymentMethod: COD
 *                        deliveryTime: 2022-12-12
 *                        shippingFee: 100
 *                        totalPrice: 200
*/
router.get('/my-order', orderController.getMyOrder);

/**
 * @swagger
 * /api/order/change-delivery-address:
 *   put:
 *     summary: Change delivery address
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    code: 
 *                       type: string
 *                    address:
 *                       type: string
 *                    city:
 *                       type: string
 *                    district:
 *                       type: string
 *                    ward:
 *                       type: string
 *             example:
 *                  code: V79BKN78H
 *                  address: 123 abc
 *                  city: HCM
 *                  district: Thuong Tin
 *                  ward: Ha Hoi
 *     responses:
 *       200:
 *         description: Create new order
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Order'
 *  
*/
router.put('/change-delivery-address/', orderController.changeDeliveryAddress);

/**
 * @swagger
 * /api/order/cancel-order/{code}:
 *   patch:
 *     summary: Cancel order
 *     tags: [Order]
 *     parameters:
 *        - in: path
 *          name: code
 *          schema:
 *              type: string
 *          required: true
 *     responses:
 *       200:
 *         description: Create new order
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Order'
 *  
*/
router.patch('/cancel-order/:code', orderController.cancelOrder);

export default router;