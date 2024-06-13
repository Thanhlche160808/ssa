// ** Lib
import express from 'express';

// ** Controller
import paymentController from '../../controllers/payment.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         data:
 *           type: array
 *           items:
 *             type: Object
 *             properties:
 *               id:
 *                 type: string
 *                 example: abcsd
 *               name:
 *                 type: string
 *                 example: MOMO
 *               type:
 *                 type: string
 *                 example: MOMO
 *               description:
 *                 type: string
 *                 example: Payment by Momo
 *               isActive:
 *                 type: boolean
 *                 example: true
 *         example:
 *           isSuccess: true
 *           statusCode: 200
 *           data:
 *                - id: abcsd
 *                  name: MOMO
 *                  type: MOMO
 *                  description: Payment by Momo
 *                  isActive: true
 *                  
 */
/** 
 * @swagger
 * tags:
 *   name: Payment
 *   description: The Payment managing API
 */
/**
 * @swagger
 * /api/payment/newPayment:
 *   post:
 *     summary: Create new Payment 
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      type: 
 *                          type: string
 *                      description:
 *                          type: string
 *                      isActive:
 *                          type: string
 *              example:
 *                  name: MOMO
 *                  type: MOMO
 *                  description: Payment by momo
 *                  isActive: true
 *     responses:
 *       200:
 *         description: Product list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 data:
 *                     type: Object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: abcsd
 *                       name:
 *                         type: string
 *                         example: MOMO
 *                       type:
 *                         type: string
 *                         example: MOMO
 *                       description:
 *                         type: string
 *                         example: Payment by MOMO
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *               example:
 *                   isSuccess: true
 *                   statusCode: 200
 *                   data:
 *                          id: abcsd
 *                          name: MOMO
 *                          type: MOMO
 *                          description: Payment by MOMO
 *                          isActive: true
 */
router.post('/newPayment', paymentController.createPayment);

/**
 * @swagger
 * /api/payment/{id}:
 *   get:
 *     summary: Payment Detail 
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 data:
 *                     type: Object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: abcsd
 *                       name:
 *                         type: string
 *                         example: MOMO
 *                       type:
 *                         type: string
 *                         example: MOMO
 *                       description:
 *                         type: string
 *                         example: Payment by MOMO
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *               example:
 *                   isSuccess: true
 *                   statusCode: 200
 *                   data:
 *                          id: abcsd
 *                          name: MOMO
 *                          type: MOMO
 *                          description: Payment by MOMO
 *                          isActive: true
 */
router.get('/:id', paymentController.paymentDetail)


/**
 * @swagger
 * /api/payment/pulish/{id}:
 *   patch:
 *     summary: Publish de publish method 
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 data:
 *                     type: Object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: abcsd
 *                       name:
 *                         type: string
 *                         example: MOMO
 *                       type:
 *                         type: string
 *                         example: MOMO
 *                       description:
 *                         type: string
 *                         example: Payment by MOMO
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *               example:
 *                   isSuccess: true
 *                   statusCode: 200
 *                   data:
 *                          id: abcsd
 *                          name: MOMO
 *                          type: MOMO
 *                          description: Payment by MOMO
 *                          isActive: true
 */
router.patch('/pulish/:id', paymentController.updatePaymentStatus)
export default router;