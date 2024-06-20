// ** Service
import productService from "../services/product.service.js";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const productController = {
    createProduct: async (req, res) => {
        const data = req.body;
        try {
            const result = await productService.createProduct(data);
            res.status(statusCode.CREATED).json(response.success(
                {
                    data: result,
                    code: statusCode.CREATED,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    productDetail: async (req, res) => {
        const { code } = req.params;
        try {
            const result = await productService.productDetail(code);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    getAllProducts: async (req, res) => {
        const data = req.query;
        try {
            const result = await productService.getAllProduct(data);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    changeStatus: async (req, res) => {
        const { code } = req.params;
        try {
            const result = await productService.deleteProduct(code);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    updateProduct: async (req, res) => {
        const data = req.body;
        const { code } = req.params;

        try {
            const result = await productService.updateProduct(code, data);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    getProductsDashboard: async (req, res) => {
        const data = req.query;
        try {
            const result = await productService.getPoductDashboard(data);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    getAllColors: async (req, res) => {
        try {
            const result = await productService.getAllColors();
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    }
};

export default productController;