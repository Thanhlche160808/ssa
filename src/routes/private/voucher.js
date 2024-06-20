// ** Lib
import express from "express";

// ** Controllers
import voucherController from "../../controllers/voucher.controller.js";

// ** Middlewares
import { voucherValidation } from "../../middlewares/validate-data/voucher.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Voucher:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         data:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: Supper sale 7/7
 *             code:
 *               type: string
 *               example: SUPPERSALE77
 *             description:
 *               type: string
 *               exxample: Description for voucher
 *             discount:
 *               type: number
 *               example: 0.5
 *             minOrderPrice:
 *               type: number
 *               example: 200000
 *             maxDiscountValue:
 *               type: number
 *               exxample: 50000
 *             expiredDate:
 *               type: number
 *               example: 1625668800000
 *             isPublish:
 *               type: boolean
 *               example: false
 *             status:
 *               type: string
 *               example: AVAILABLE
 *             createdAt:
 *               type: string
 *               example: 2021-07-07T03:09:15.000Z
 *             updatedAt:
 *               type: string
 *               example: 2021-07-07T03:09:15.000Z
 *       example:
 *         isSuccess: true
 *         statusCode: 200
 *         data:
 *             title: Supper sale 7/7
 *             code: SUPPERSALE77
 *             description: Description for voucher
 *             discount: 0.5
 *             minOrderPrice: 200000
 *             maxDiscountValue: 50000
 *             expiredDate: 1625668800000
 *             isPublish: false
 *             status: AVAILABLE
 *             createdAt: 2021-07-07T03:09:15.000Z
 *             updatedAt: 2021-07-07T03:09:15.000Z
 */

/** 
 * @swagger
 * tags:
 *   name: Voucher
 *   description: The Voucher managing API
 */
/** 

 * @swagger
 * /api/voucher/newVoucher:
 *   post:
 *     summary: Create a new voucher
 *     tags: [Voucher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  title:
 *                    type: string
 *                    example: Supper sale 7/7
 *                  description:
 *                    type: string
 *                    exxample: Description for voucher
 *                  discount:
 *                    type: number
 *                    example: 0.5
 *                  minOrderPrice:
 *                    type: number
 *                    example: 200000
 *                  maxDiscountValue:
 *                    type: number
 *                    exxample: 50000
 *                  expiredDate:
 *                    type: number
 *                    example: 1625668800000
 *                  isPublish:
 *                    type: boolean
 *                    example: false
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 */
router.post("/newVoucher", voucherValidation.body(), voucherController.newVoucher);

/**
 * @swagger
 * /api/voucher/listVoucher:
 *   get:
 *     summary: Get Voucher list
 *     tags: [Voucher]
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
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['AVAILABLE', 'EXPIRED']
 *     responses:
 *       200:
 *         description: Voucher list
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
 *                      title:
 *                        type: string
 *                        example: Supper sale 7/7
 *                      code:
 *                        type: string
 *                        example: SUPPERSALE77
 *                      description:
 *                        type: string
 *                        exxample: Description for voucher
 *                      discount:
 *                        type: number
 *                        example: 0.5
 *                      minOrderPrice:
 *                        type: number
 *                        example: 200000
 *                      maxDiscountValue:
 *                        type: number
 *                        exxample: 50000
 *                      expiredDate:
 *                        type: number
 *                        example: 1625668800000
 *                      isPublish:
 *                        type: boolean
 *                        example: false
 *                      status:
 *                        type: string
 *                        example: AVAILABLE
 *                      createdAt:
 *                        type: string
 *                        example: 2021-07-07T03:09:15.000Z
 *                      updatedAt:
 *                        type: string
 *                        example: 2021-07-07T03:09:15.000Z
 *               example:
 *                   isSuccess: true
 *                   statusCode: 200
 *                   data:
 *                        - title: Supper sale 7/7
 *                          code: SUPPERSALE77
 *                          description: Description for voucher
 *                          discount: 0.5
 *                          minOrderPrice: 200000
 *                          maxDiscountValue: 50000
 *                          expiredDate: 1625668800000
 *                          isPublish: false
 *                          status: AVAILABLE
 *                          createdAt: 2021-07-07T03:09:15.000Z
 *                          updatedAt: 2021-07-07T03:09:15.000Z
 */
router.get("/listVoucher", voucherValidation.query(), voucherController.getVoucher);


/**
 * @swagger
 * /api/voucher/{code}:
 *   get:
 *     summary: Voucher detail 
 *     tags: [Voucher]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Voucher'
 */
router.get("/:code", voucherController.getByCode);

/**
* @swagger
* /api/voucher/updateVoucher/{code}:
*   put:
*     summary: Update voucher
*     tags: [Voucher]
*     parameters:
*       - in: path
*         name: code
*         required: true
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*                  title:
*                    type: string
*                    example: Supper sale 7/7
*                  description:
*                    type: string
*                    exxample: Description for voucher
*                  discount:
*                    type: number
*                    example: 0.5
*                  minOrderPrice:
*                    type: number
*                    example: 200000
*                  maxDiscountValue:
*                    type: number
*                    exxample: 50000
*                  expiredDate:
*                    type: number
*                    example: 1625668800000
*                  isPublish:
*                    type: boolean
*                    example: false
*     responses:
*       200:
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Voucher'
*/
router.put("/updateVoucher/:code", voucherValidation.body(), voucherController.updateVoucher);

export default router;