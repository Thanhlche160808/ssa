// ** Model
import Voucher from '../models/voucher.js';

// ** Constants

const voucherRepository = {
    create: async ({ title, code, description, discount, minOrderPrice, maxDiscountValue, expiredDateDate }) => {
        const newVoucher = new Voucher({
            title,
            code,
            description,
            discount,
            minOrderPrice,
            maxDiscountValue,
            expiredDateDate
        });
        await newVoucher.save();
        return newVoucher;
    },

    getVoucherPaginate: async ({ title, page, size }) => {
        const skip = (page - 1) * size;
        const query = {};

        if (title) query.title = { $regex: title, $options: 'i' };

        return Voucher.find(query)
            .skip(skip)
            .limit(size).select('-__v');
    },

    getByCode: async (code) => {
        const voucher = Voucher.findOne({ code }).select('-__v');
        if (!voucher) throw new Error('Voucher not found');
        return voucher;
    },

    totalDocuments: async (query) => {
        return Voucher.countDocuments(query);
    }
};

export default voucherRepository;