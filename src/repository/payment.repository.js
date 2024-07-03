// ** Models
import Payment from '../models/payment.js';

const paymentRepository = {
    getPayments: async (type, isActive) => {
        const query = {};
        if (type) query['type'] = type;
        if (isActive) query['isActive'] = isActive;
        return await Payment.find(query).select('-__v');
    },

    create: async ({ name, description, isActive, type }) => {
        const existedPayment = await Payment.findOne({ $or: [{ name }, { type }] });
        if (existedPayment) throw new Error('Payment method existed!');
        const newPayment = new Payment({
            name,
            description,
            isActive,
            type
        });
        await newPayment.save();
        return newPayment;
    },

    updatePaymentStatus: async (id) => {
        const payment = await paymentRepository.findById(id);
        payment.isActive = !payment.isActive;
        await payment.save();
        return payment;
    },

    findById: async (id) => {
        const payment = await Payment.findById(id);
        if (!payment) throw new Error('Payment method not existed!')
        return payment;
    }
};

export default paymentRepository;