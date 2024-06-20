import mongoose from 'mongoose';

// ** Constant
import { VOUCHER_STATUS } from '../constants/model.constant.js';

const voucherSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    code: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    discount: {
        type: Number,
    },

    minOrderPrice: {
        type: Number,
        required: true,
    },

    maxDiscountValue: {
        type: Number,
    },

    expiredDate: {
        type: Number,
    },

    isPublish: {
        type: Boolean,
        default: false,
    },

    status: {
        type: String,
        default: VOUCHER_STATUS.AVALIBALE,
    },
}, { timestamps: true });

let Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;