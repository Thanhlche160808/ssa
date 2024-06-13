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
 *       required: []
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
 * /api/public/payment/getPayments:
 *   get:
 *     summary: Get Payment list
 *     tags: [Payment]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ['COD', 'MOMO']
 *           example: MOMO
 *         description: The name of payment
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *           example: true
 *         description: The status of payment
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
 *                   type: array
 *                   items:
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
 *                        - id: abcsd
 *                          name: MOMO
 *                          type: MOMO
 *                          description: Payment by MOMO
 *                          isActive: true
 *                        - id: abcsd
 *                          name: COD
 *                          type: COD
 *                          description: Payment on delivery
 *                          isActive: true
 */
router.get('/getPayments', paymentController.getPayments);

export default router;