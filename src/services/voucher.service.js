// ** Repository
import voucherRepository from "../repository/voucher.repository.js";

const voucherService = {
    create: async ({ title, description, discount, minOrderPrice, maxDiscountValue, expiredDate, isPublish }) => {
        const code = Math.random().toString(36).slice(2, 12);
        const voucher = await voucherRepository.create(
            {
                title,
                code: code.toLocaleUpperCase(),
                description,
                discount,
                minOrderPrice,
                maxDiscountValue,
                expiredDate,
                isPublish,
            });

        const result = await voucherService.handleVoucherOutput(voucher);
        return result;
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
        const voucherUpdated = await voucherRepository.changePublishStatus(code);
        return voucherService.handleVoucherOutput(voucherUpdated);
    },

    handleVoucherOutput: async (voucher) => {
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
    }

};

export default voucherService;