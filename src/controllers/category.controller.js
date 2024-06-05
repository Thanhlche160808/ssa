// ** Service
import cateService from "../services/category.service";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";
import { deleteToken } from "firebase/messaging";

const cateController = {
    getAll: async (req, res) => {
        try {
            const categories = await cateService.getAll();
            res.status(statusCode.OK).json(response.success(
                {
                    data: categories,
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

    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const category = await cateService.getById(id);
            res.status(statusCode.OK).json(response.success(
                {
                    data: category,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST
                }
            ))
        }
    },

    create: async (req, res) => {
        const data = req.body
        try {
            const category = await cateService.create(data);
            res.status(statusCode.CREATED).json(response.success(
                {
                    data: category,
                    code: statusCode.CREATED,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST
                }
            ))
        }
    },

    update: async (req, res) => {
        const data = req.body
        const id = req.params.id
        try {
            const category = await cateService.update(id, data);
            res.status(statusCode.OK).json(response.success(
                {
                    data: category,
                    code: statusCode.OK
                }
            ))
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST
                }
            ))
        }
    },

    // delete: async (req, res) => {
    //     const id = req.params.id
    //     try {
    //         const category = await cateService.delete(id);
    //         res.status(statusCode.OK).json(response.success(
    //             {
    //                 data: category,
    //                 code: statusCode.OK
    //             }
    //         ))
    //     } catch (error) {
    //         res.status(statusCode.BAD_REQUEST).json(response.error(
    //             {
    //                 message: error?.message,
    //                 code: statusCode.BAD_REQUEST
    //             }
    //         ))
    //     }
    // }
}

export default cateController;