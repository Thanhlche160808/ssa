// ** Lib
import moment from 'moment';
import queryString from 'qs';
import crypto from 'crypto';

// ** Repository
import paymentRepository from "../repository/payment.repository.js";

// ** Constants
import { TMN_CODE, VNPAY_SECRET_KEY, VNPAY_URL, SERVER_URL, CURR_CODE } from '../constants/index.js';

const paymentService = {
    getAll: async (type, isActive) => {
        const payments = await paymentRepository.getPayments(type, isActive);

        const result = payments.map((payment) => {
            return {
                id: payment._id,
                name: payment.name,
                type: payment.type,
                description: payment.description,
                isActive: payment.isActive
            }
        })

        return result
    },

    createNew: async ({ name, description, isActive, type }) => {
        const payment = await paymentRepository.create({ name, description, isActive, type });

        return {
            id: payment._id,
            name: payment.name,
            type: payment.type,
            description: payment.description,
            isActive: payment.isActive
        }
    },

    updatePaymentStatus: async (id) => {
        const payment = await paymentRepository.updatePaymentStatus(id);

        return {
            id: payment._id,
            name: payment.name,
            type: payment.type,
            description: payment.description,
            isActive: payment.isActive
        }
    },

    getPaymentById: async (id) => {
        const payment = await paymentRepository.findById(id);

        return {
            id: payment._id,
            name: payment.name,
            type: payment.type,
            description: payment.description,
            isActive: payment.isActive
        }
    },

    createVnPaytUrl: async (ipAddr, amount, bankCode, locale) => {
        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');

        const tmnCode = TMN_CODE;
        const secretKey = VNPAY_SECRET_KEY;
        let vnpUrl = VNPAY_URL;
        const returnUrl = `${SERVER_URL}/api/public/payment/vnpay-return`;
        const orderId = moment(date).format('DDHHmmss');

        let vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: tmnCode,
            vnp_Locale: locale,
            vnp_CurrCode: CURR_CODE,
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
            vnp_OrderType: 'other',
            vnp_Amount: amount * 100,
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate
        };

        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = await paymentService.sortObject(vnp_Params);

        const signData = queryString.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + queryString.stringify(vnp_Params, { encode: false });

        return vnpUrl;
    },

    vnpayReturn: async (vnpParams) => {
        const secureHash = vnpParams.vnp_SecureHash;

        delete vnpParams.vnp_SecureHash;
        delete vnpParams.vnp_SecureHashType;

        const vnpParamsSorted = await paymentService.sortObject(vnpParams);

        const secretKey = VNPAY_SECRET_KEY;

        const signData = queryString.stringify(vnpParamsSorted, { encode: false });

        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        if (secureHash === signed) {
            return 'OK';
        } else {
            throw new Error('Invalid signature');
        }
    },

    sortObject: async (obj) => {
        const sorted = {};
        const str = Object.keys(obj).map(key => encodeURIComponent(key)).sort();

        str.forEach(key => {
            sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
        });

        return sorted;
    }
};

export default paymentService;