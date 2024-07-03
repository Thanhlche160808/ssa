// ** Service
import voucherService from "../services/voucher.service.js";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const voucherController = {
    newVoucher: async (req, res) => {
        const data = req.body;
        try {
            const voucher = await voucherService.create(data);
            res.status(statusCode.CREATED).json(response.success(
                {
                    data: voucher,
                    code: statusCode.CREATED,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ));
        }
    },

    getVoucher: async (req, res) => {
        const data = req.query;
        try {
            const vouchers = await voucherService.getVoucher(data);
            res.status(statusCode.OK).json(response.success(
                {
                    data: vouchers,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ));
        }
    },

    getByCode: async (req, res) => {
        const { code } = req.params;
        try {
            const voucher = await voucherService.getByCode(code);
            res.status(statusCode.OK).json(response.success(
                {
                    data: voucher,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ));
        }
    },

    updateVoucher: async (req, res) => {
        const { code } = req.params;
        const data = req.body;
        try {
            const voucher = await voucherService.updateVoucher(code, data);
            res.status(statusCode.OK).json(response.success(
                {
                    data: voucher,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ));
        }
    },

    changePublishStatus: async (req, res) => {
        const code = req.params.code
        try {
            const voucher = await voucherService.changePublishStatus(code);
            res.status(statusCode.OK).json(response.success(
                {
                    data: voucher,
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
};

export default voucherController;