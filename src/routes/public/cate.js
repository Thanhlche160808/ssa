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
 *       required: []
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
 * /api/public/category:
 *   get:
 *     summary: Get Category list
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Category list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', cateController.getAll);

/**
 * @swagger
 * /api/public/category/{id}:
 *   get:
 *     summary: Get Category by ID
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
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.get('/:id', cateController.getById);

export default router;