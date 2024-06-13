// ** Service
import paymentService from '../services/payment.service.js'

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const paymentController = {
    getPayments: async (req, res) => {
        const { isActive, type } = req.query;
        console.log('isActive: ', !!isActive);
        try {
            const result = await paymentService.getAll(type, !!isActive);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (err) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: err?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ));
        }
    },

    createPayment: async (req, res) => {
        const payment = req.body;
        try {
            const result = await paymentService.createNew(payment);
            res.status(statusCode.CREATED).json(response.success(
                {
                    data: result,
                    code: statusCode.CREATED,
                }
            ));
        } catch (err) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: err?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ));
        }
    },

    updatePaymentStatus: async (req, res) => {
        const paymentId = req.params.id;
        try {
            const result = await paymentService.updatePaymentStatus(paymentId);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (err) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: err?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ));
        }
    },

    paymentDetail: async (req, res) => {
        const paymentId = req.params.id;
        try {
            const result = await paymentService.getPaymentById(paymentId);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (err) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: err?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ));
        }
    }
};

export default paymentController;