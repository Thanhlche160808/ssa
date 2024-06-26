// ** Repository
import voucherRepository from "../repository/voucher.repository.js";

const voucherService = {
    create: async ({ title, description, discount, minOrderPrice, maxDiscountValue, expiredDateDate, isPublish }) => {
        const code = Math.random().toString(36).slice(2, 12);
        const voucher = await voucherRepository.create(
            {
                title,
                code: code.toLocaleUpperCase(),
                description,
                discount,
                minOrderPrice,
                maxDiscountValue,
                expiredDateDate,
                isPublish,
            });
        const voucherJson = voucher.toJSON();
        delete voucherJson.__v;
        delete voucherJson._id;

        return voucherJson;
    },

    getVoucher: async ({ title, page, size, status, code }) => {
        const skip = (page - 1) * size;
        const query = {};

        if (title) query.title = { $regex: title, $options: 'i' };
        if (status) query.status = status;
        if (code) query.code = code.toLocaleUpperCase();

        const totalDocuments = await voucherRepository.totalDocuments(query);
        const totalPage = Math.ceil(totalDocuments / size);

        const vouchers = await voucherRepository.getVoucherPaginate(query, skip, size);

        return {
            vouchers,
            totalPage,
            totalDocuments,
        }
    },

    getByCode: async (code) => {
        return await voucherRepository.getByCode(code);
    },

    updateVoucher: async (code, { title, description, discount, minOrderPrice, maxDiscountValue, expiredDate, isPublish }) => {
        const voucher = await voucherRepository.getByCode(code);
        
        if (!voucher) throw new Error('Voucher not found');

        voucher.title = title;
        voucher.description = description;
        voucher.discount = discount;
        voucher.minOrderPrice = minOrderPrice;
        voucher.maxDiscountValue = maxDiscountValue;
        voucher.expiredDate = expiredDate;
        voucher.isPublish = isPublish;

        await voucher.save();
        return {
            title: voucher.title,
            code: voucher.code,
            description: voucher.description,
            discount: voucher.discount,
            minOrderPrice: voucher.minOrderPrice,
            maxDiscountValue: voucher.maxDiscountValue,
            isPublish: voucher.isPublish,
            status: voucher.status,
            expiredDate: voucher.expiredDate,
        };
    },
    
    changePublishStatus: async (code) => {
        const voucher = await voucherRepository.changePublishStatus(code);
        
        return {
            title: voucher.title,
            description: voucher.description,
            discount: voucher.discount,
            minOrderPrice: voucher.minOrderPrice,
            maxDiscountValue: voucher.maxDiscountValue,
            isPublish: voucher.isPublish,
            status: voucher.status,
            expiredDate: voucher.expiredDate,
            createdAt: voucher.createdAt,
            updatedAt: voucher.updatedAt,
        };
    },
};

export default voucherService;