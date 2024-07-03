// ** Model
import Voucher from '../models/voucher.js';

// ** Constants

const voucherRepository = {
    create: async ({ title, code, description, discount, minOrderPrice, maxDiscountValue, expiredDate, isPublish }) => {
        const newVoucher = new Voucher({
            title,
            code,
            description,
            discount,
            minOrderPrice,
            maxDiscountValue,
            expiredDate,
            isPublish,
        });

        await newVoucher.save();
        return newVoucher;
    },

    getVoucherPaginate: async (query, skip, size) => {
        return Voucher.find(query)
            .skip(skip)
            .limit(size).select('-__v');
    },

    getByCode: async (code) => {
        const voucher = Voucher.findOne({ code })
        if (!voucher) throw new Error('Voucher not found');
        return voucher;
    },

    changePublishStatus: async (code) => {
        const voucher = await Voucher.findOne({ code });
        if (!voucher) {
            throw new Error('Voucher not existed');
        }

        voucher.isPublish = voucher.isPublish == false ? true : false;
        await voucher.save()
        return voucher;
    },

    totalDocuments: async (query) => {
        return Voucher.countDocuments(query);
    }
};

export default voucherRepository;