//** Express
import express from 'express';

//** Controller
import cateController from '../../controllers/category.controller';


const router = express.Router(); // Fixed the initialization of the router

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         data:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Vintage
 *             description:
 *               type: string
 *               example: This is a description
 *             isHide:
 *               type: boolean
 *               default: false
 *       example:
 *         isSuccess: true
 *         statusCode: 200
 *         data:
 *           name: Vintage
 *           description: This is a description
 *           isHide: false
 */

/** 
 * @swagger
 * tags:
 *   name: Category
 *   description: The Category managing API
 */

/** 
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *           example:
 *             name: vintage
 *             description: This is a description
 *     responses:
 *       200:
 *         description: Create Category
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
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: vintage
 *                     description:
 *                       type: string
 *                       example: This is a description
 *                     isHide:
 *                       type: boolean
 *                       example: false
 */

router.post('/', cateController.create)


/** 
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isHide:
 *                 type: boolean
 *           example:
 *             name: vintage
 *             description: This is a description
 *             isHide: false
 *     responses:
 *       200:
 *         description: Update Category
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
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: vintage
 *                     description:
 *                       type: string
 *                       example: This is a description
 *                     isHide:
 *                       type: boolean
 *                       example: false
 */
router.put('/:id', cateController.update)


/** 
 * @swagger
 * /api/category/delete/{id}:
 *   put:
 *     summary: Change status of category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Change status of Category
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
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: vintage
 *                     description:
 *                       type: string
 *                       example: This is a description
 *                     isHide:
 *                       type: boolean
 *                       example: false
 */
router.put('/delete/:id', cateController.delete)

/** 
 * @swagger
 * /api/category/list-dashboard:
 *   get:
 *     summary: Get all existing categories
 *     tags: [Category]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: vintage
 *     responses:
 *       200:
 *         description: All existing categories
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
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: vintage
 *                     description:
 *                       type: string
 *                       example: This is a description
 *                     isHide:
 *                       type: boolean
 *                       example: false
 */
router.get('/list-dashboard', cateController.searchAndPaginate)
export default router