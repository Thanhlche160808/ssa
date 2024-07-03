// ** Service
import orderService from '../services/order.service.js';

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const orderController = {
    createOrder: async (req, res) => {
        try {
            const order = req.body;
            const result = await orderService.createOrder(order);
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

    getMyOrder: async (req, res) => {
        try {
            const { page, size, code, status } = req.query;
            const { id } = req.user;
            const result = await orderService.getMyOrder(id, page, size, code, status);
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

    getOrderDetail: async (req, res) => {
        try {
            const { code } = req.params;
            const result = await orderService.getOrderDetail(code);
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

    changeDeliveryAddress: async (req, res) => {
        try {
            const { id } = req.user;
            const deliveryAddress = req.body;
            const result = await orderService.changeDeliveryAddress(id, deliveryAddress);
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

    cancelOrder: async (req, res) => {
        try {
            const { id } = req.user;
            const { code } = req.params;
            const result = await orderService.cancelOrder(id, code);
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

    getAllProvinces: async (req, res) => {
        try {
            const data = await orderService.getAllVnProvinces();
            res.status(statusCode.OK).json(response.success(
                {
                    data: data,
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

    getDistrictOfProvince: async (req, res) => {
        try {
            const { provinceId } = req.query
            const data = await orderService.getDistrictOfProvince(provinceId);
            res.status(statusCode.OK).json(response.success(
                {
                    data: data,
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

    getWardOfDistrict: async (req, res) => {
        try {
            const {district_id} = req.query
            const data = await orderService.getWardOfDistrict(district_id);
            res.status(statusCode.OK).json(response.success(
                {
                    data: data,
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

    getShippingFee: async (req, res) => {
        try {
            const address = req.body;
            const data = await orderService.getShippingFee(address);
            res.status(statusCode.OK).json(response.success(
                {
                    data: data,
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
};

export default orderController;
