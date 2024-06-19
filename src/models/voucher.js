import mongoose from 'mongoose';

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
}, { timestamps: true });

let Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;