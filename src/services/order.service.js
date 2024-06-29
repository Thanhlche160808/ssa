// ** Repository
import orderRepository from '../repository/order.repository.js';
import accountRepository from '../repository/account.repository.js';
import voucherRepository from '../repository/voucher.repository.js';

// ** Helper
import googleHelper from '../helper/google.helper.js';
import provincesHelper from '../helper/ghn.helper.js'

// ** Constants
import { ORDER_STATUS } from '../constants/model.constant.js';

const orderService = {
    createOrder: async ({
        accountId, // Optional
        receiverName,
        receiverPhone,
        email,
        deliveryAddress,
        voucherCode, // Optional
        paymentMethod,
        deliveryTime,
        items,
        shippingFee,
        totalPrice
    }) => {
        const code = Math.random().toString(36).slice(2, 12);
        const order = {
            code: code.toLocaleUpperCase(),
            email,
            receiverName,
            receiverPhone,
            deliveryAddress,
            paymentMethod,
            deliveryTime,
            items,
            shippingFee,
            totalPrice
        };

        if (accountId) {
            const account = await accountRepository.findById(accountId);
            if (!account) throw new Error('Account not found');
            order.account = accountId;
        };


        if (voucherCode) {
            const voucher = await voucherRepository.getByCode(voucherCode);
            if (!voucher) throw new Error('Voucher not found');
            if (voucher.expiredDate < new Date()) throw new Error('Voucher is expired');
            order.voucherCode = voucherCode;
        };

        const result = await orderRepository.create(order);

        if (!accountId) {
            await googleHelper.sendEmail(email, 'Order confirmation', `<p>Thank you for your order</p>`);
        }

        return await orderService.formatOrderResult(result);
    },

    formatOrderResult: async (order) => {
        const items = order.items.map((item) => {
            return {
                displayName: item.displayName,
                productCode: item.productCode,
                image: item.image,
                price: item.price,
                size: item.size,
                quantity: item.quantity
            };
        });

        return {
            code: order.code ? order.code : '',
            items,
            accountId: order.account ? order.account : '',
            email: order.email,
            receiverName: order.receiverName,
            receiverPhone: order.receiverPhone,
            deliveryAddress: {
                address: order.deliveryAddress.address,
                city: order.deliveryAddress.city,
                district: order.deliveryAddress.district,
                ward: order.deliveryAddress.ward
            },
            voucherId: order.voucherId,
            paymentMethod: order.paymentMethod,
            deliveryTime: order.deliveryTime,
            totalPrice: order.totalPrice,
            status: order.status,
        };
    },

    getMyOrder: async (accountId, page, size, code, status) => {
        const skip = (page - 1) * size;

        const query = {
            account: accountId,
        }

        if (code) query.code = code;
        if (status) query.status = status;

        const orders = await orderRepository.orderPagination(query, skip, size);

        const totalDocuments = await orderRepository.totalDocuments(query);

        const totalPage = Math.ceil(totalDocuments / size);

        const result = await Promise.all(orders.map(async (order) => {
            return await orderService.formatOrderResult(order);
        }));

        return {
            orders: result,
            totalPage,
            totalDocuments
        };
    },

    getOrderDetail: async (code) => {
        const order = await orderRepository.findByCode(code);
        return await orderService.formatOrderResult(order);
    },

    changeDeliveryAddress: async (accountId, {
        code,
        address,
        city,
        district,
        ward
    }) => {
        const order = await orderRepository.findBy({
            code,
            account: accountId
        });

        if (!order) throw new Error('This order not belong to you');

        order.deliveryAddress = {
            address,
            city,
            district,
            ward
        };

        await order.save();

        return await orderService.formatOrderResult(order);
    },

    cancelOrder: async (accountId, code) => {
        const order = await orderRepository.findBy({
            code,
            account: accountId
        });

        if (!order) throw new Error('This order not belong to you');

        if (order.status !== ORDER_STATUS.PENDING) throw new Error('This order cannot be cancelled');

        order.status = ORDER_STATUS.CANCELLED;

        await order.save();

        return await orderService.formatOrderResult(order);
    },

    getAllVnProvinces : async () => {
        const provinces = await provincesHelper.getPublicProvinces();
        return provinces;
    },

    getDistrictOfProvince : async (provinceId) => {
        const districts = await provincesHelper.getDistricOfProvince(provinceId);
        return districts;
    },

    getWardOfDistrict : async (districtId) => {
        const wards = await provincesHelper.getWardOfDistrict(districtId);
        return wards;
    },

    getShippingFee: async (address) => {
        const fee = await provincesHelper.getShippingFee(address);
        return fee;
    }
};

export default orderService;