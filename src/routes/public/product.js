// ** Express
import express from "express";

// ** Controllers
import productController from "../../controllers/product.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
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
 *               productCode:
 *                 type: string
 *                 example: abcsd
 *               productName:
 *                 type: string
 *                 example: Bitis Hunter X
 *               type:
 *                 type: string
 *                 example: Low top
 *               displayName:
 *                 type: string
 *                 example: Bitis Hunter X - Low top - SKyblue
 *               description:
 *                 type: string
 *                 example: Giày chạy bộ tốt nhất năm 2024
 *               thumnail:
 *                 type: string
 *                 example: https://product.hstatic.net/1000230642/product/hsm004401den1_58f0020cd4314e309c76dcdd2621ee82.jpg
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *               isHide:
 *                 type: boolean
 *                 example: false
 *               colourVariant:
 *                 type: Object
 *                 properties:
 *                   colourName:
 *                     type: String
 *                     example: Skyblue
 *                   hex:
 *                     type: String
 *                     example: #00CCFF
 *                   sizeMetrics:
 *                     type: array
 *                     items:
 *                       type: Object
 *                       properties:
 *                         size:
 *                           type: number
 *                           example: 41
 *                         quantity:
 *                           type: number
 *                           example: 400
 *               price:
 *                 type: number
 *                 example: 400000
 *         example:
 *           isSuccess: true
 *           statusCode: 200
 *           data:
 *                - productCode: abcsd
 *                  productName: Bitis Hunter X
 *                  type: Low top
 *                  displayName: Bitis Hunter X - Low top - SKyblue
 *                  description: Giày chạy bộ tốt nhất năm 2024
 *                  thumnail: https://product.hstatic.net/1000230642/product/hsm004401den1_58f0020cd4314e309c76dcdd2621ee82.jpg
 *                  images: []
 *                  category: Bitis Hunter
 *                  isHide: false
 *                  colourVariant: 
 *                    colourName: Skyblue
 *                    hex: 00CCFF
 *                    sizeMetrics: 
 *                      - size: 42
 *                        quantity: 100
 *                      - size: 43
 *                        quantity: 200
 *                  price: 400000
 *                - productCode: khshc
 *                  productName: Bitis Hunter XY
 *                  type: High top
 *                  displayName: Bitis Hunter XY - High top - Night
 *                  description: Giày chạy bộ đẹp nhất năm 2024
 *                  thumnail: https://product.hstatic.net/1000230642/product/hsm004401den1_58f0020cd4314e309c76dcdd2621ee82.jpg
 *                  images: []
 *                  category: Bitis Hunter
 *                  isHide: false
 *                  colourVariant: 
 *                    colourName: Night
 *                    hex: ffffff
 *                    sizeMetrics: 
 *                      - size: 42
 *                        quantity: 100
 *                      - size: 43
 *                        quantity: 200
 *                  price: 500000
 */

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
 *         name: productName
 *         schema:
 *           type: string
 *         description: The name of the product to search for
 *       - in: query
 *         name: priceSort
 *         schema:
 *           type: number
 *         description: The sort order of the products   
 *       - in: query
 *         name: min
 *         schema:
 *           type: number
 *         description: The min range
 *       - in: query
 *         name: max
 *         schema:
 *           type: number
 *         description: The max range
 *       - in: query
 *         name: isHide
 *         schema:
 *           type: boolean
 *           example: false
 *         description: hide status of the product
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
 *                       type:
 *                         type: string
 *                         example: Low top
 *                       displayName:
 *                         type: string
 *                         example: Bitis Hunter X - Low top - SKyblue
 *                       description:
 *                         type: string
 *                         example: Giày chạy bộ tốt nhất năm 2024
 *                       thumnail:
 *                         type: string
 *                         example: https://product.hstatic.net/1000230642/product/hsm004401den1_58f0020cd4314e309c76dcdd2621ee82.jpg
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       category:
 *                         type: string
 *                       isHide:
 *                         type: boolean
 *                         example: false
 *                       colourVariant:
 *                         type: Object
 *                         properties:
 *                           colourName:
 *                             type: String
 *                             example: Skyblue
 *                           hex:
 *                             type: String
 *                             example: #00CCFF
 *                           sizeMetrics:
 *                             type: array
 *                             items:
 *                               type: Object
 *                               properties:
 *                                 size:
 *                                   type: number
 *                                   example: 41
 *                                 quantity:
 *                                   type: number
 *                                   example: 400
 *                       price:
 *                         type: number
 *                         example: 400000
 *               example:
 *                   isSuccess: true
 *                   statusCode: 200
 *                   data:
 *                        - productCode: abcsd
 *                          productName: Bitis Hunter X
 *                          type: Low top
 *                          displayName: Bitis Hunter X - Low top - SKyblue
 *                          description: Giày chạy bộ tốt nhất năm 2024
 *                          thumnail: https://product.hstatic.net/1000230642/product/hsm004401den1_58f0020cd4314e309c76dcdd2621ee82.jpg
 *                          images: []
 *                          category: Bitis Hunter
 *                          isHide: false
 *                          colourVariant: 
 *                            colourName: Skyblue
 *                            hex: 00CCFF
 *                            sizeMetrics: 
 *                              - size: 42
 *                                quantity: 100
 *                              - size: 43
 *                                quantity: 200
 *                          price: 400000
 *                        - productCode: khshc
 *                          productName: Bitis Hunter XY
 *                          type: High top
 *                          displayName: Bitis Hunter XY - High top - Night
 *                          description: Giày chạy bộ đẹp nhất năm 2024
 *                          thumnail: https://product.hstatic.net/1000230642/product/hsm004401den1_58f0020cd4314e309c76dcdd2621ee82.jpg
 *                          images: []
 *                          category: Bitis Hunter
 *                          isHide: false
 *                          colourVariant: 
 *                            colourName: Night
 *                            hex: ffffff
 *                            sizeMetrics: 
 *                              - size: 42
 *                                quantity: 100
 *                              - size: 43
 *                                quantity: 200
 *                          price: 500000
 */
router.get("/getProducts", productController.getAllProducts);

export default router;