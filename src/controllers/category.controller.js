// ** Service
import cateService from "../services/category.service";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const cateController = {
    getAll: async(req, res) => {
        try{
            const categories = await cateService.getAll();
            res.status(statusCode.OK).json(response.success(
                {
                    data: categories,
                    code: statusCode.OK,
                }
            ));
        } catch (error){
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    getById: async(req, res) => {
        try{
            const id = req.params.id;
            const category = await cateService.getById(id);
            res.status(statusCode.OK).json(response.success(
                {
                    data: category,
                    code: statusCode.OK,
                }
            ));
        }catch (error){
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST
                }
            ))
        }
    }
}

export default cateController;