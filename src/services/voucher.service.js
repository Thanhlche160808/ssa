// ** Repository
import voucherRepository from "../repository/voucher.repository.js";

const voucherService = {
    create: async ({ title, code, description, discount, minOrderPrice, maxDiscountValue, expiredDateDate }) => {
        return await voucherRepository.create({ title, code, description, discount, minOrderPrice, maxDiscountValue, expiredDateDate });
    },

    getVoucher: async ({ title, page, size }) => {

        const totalDocuments = await voucherRepository.totalDocuments(query);
        totalPage = Math.ceil(totalDocuments / size);

        const vouchers = await voucherRepository.getVoucherPaginate({ title, page, size });

        return {
            vouchers,
            totalPage,
            totalDocuments,
        }
    },

    getByCode: async (code) => {
        return await voucherRepository.getByCode(code);
    },
};

export default voucherService;