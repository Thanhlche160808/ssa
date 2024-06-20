// ** Express
import express from "express";

// ** Controllers
import productController from "../../controllers/product.controller.js";

//** Middlewares
import { productValidation } from "../../middlewares/validate-data/product.js";

const router = express.Router();

/** 
 * @swagger
 * tags:
 *   name: Product
 *   description: The Product managing API
 */

/**
 * @swagger
 * /api/public/product/getProducts:
 *   get:
 *     summary: Get Product list
 *     tags: [Product]
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
 *         name: displayName
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: priceSort
 *         schema:
 *           type: string
 *           enum: ['ASC', 'DESC']
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
 *                       productCode:
 *                         type: string
 *                         example: abcsd
 *                       productName:
 *                         type: string
 *                         example: Bitis Hunter X
 *                       displayName:
 *                         type: string
 *                         example: Bitis Hunter X - Low top - SKyblue
 *                       type:
 *                         type: string
 *                         example: Low top
 *                       colorName:
 *                         type: string
 *                         example: SKyblue
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: https://product.hstatic.net/1000230642/product/hsm004401den1_58f0020cd4314e309c76dcdd2621ee82.jpg
 *                       price:
 *                         type: number
 *                         example: 400000
 *                       salePrice:
 *                         type: number
 *                         example: 400000
 *                       totalQuantity:
 *                         type: number
 *                         example: 300
 *               example:
 *                   isSuccess: true
 *                   statusCode: 200
 *                   data:
 *                        - productCode: abcsd
 *                          productName: Bitis Hunter X
 *                          displayName: Bitis Hunter X - Low top - SKyblue
 *                          type: Low top
 *                          colorName: SKyblue
 *                          images:
 *                              - https://product.hstatic.net/1000230642/product/hsm004401den1_58f0020cd4314e309c76dcdd2621ee82.jpg
 *                          price: 400000
 *                          salePrice: 400000
 *                          totalQuantity: 300
 */
router.get("/getProducts", productValidation.query(), productController.getAllProducts);

/**
 * @swagger
 * /api/public/product/{code}:
 *   get:
 *     summary: Product 
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Update product successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get("/:code", productController.productDetail);

export default router;