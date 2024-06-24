// ** Repository
import orderRepository from '../repository/order.repository.js';
import accountRepository from '../repository/account.repository.js';
import voucherRepository from '../repository/voucher.repository.js';

// ** Helper
import googleHelper from '../helper/google.helper.js';

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
        const order = {
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
        await googleHelper.sendEmail(email, 'Order confirmation', `<p>Thank you for your order</p>`);
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
    }
};

export default orderService;