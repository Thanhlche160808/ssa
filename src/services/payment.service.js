// ** Repository
import paymentRepository from "../repository/payment.repository.js";

const paymentService = {
    getAll: async (type, isActive) => {
        const payments = await paymentRepository.getPayments(type, isActive);

        const result = payments.map((payment) => {
            return {
                id: payment._id,
                name: payment.name,
                type: payment.type,
                description: payment.description,
                isActive: payment.isActive
            }
        })

        return result
    },

    createNew: async ({ name, description, isActive, type }) => {
        const payment = await paymentRepository.create({ name, description, isActive, type });

        return {
            id: payment._id,
            name: payment.name,
            type: payment.type,
            description: payment.description,
            isActive: payment.isActive
        }
    },

    updatePaymentStatus: async (id) => {
        const payment = await paymentRepository.updatePaymentStatus(id);

        return {
            id: payment._id,
            name: payment.name,
            type: payment.type,
            description: payment.description,
            isActive: payment.isActive
        }
    },

    getPaymentById: async (id) => {
        const payment = await paymentRepository.findById(id);

        return {
            id: payment._id,
            name: payment.name,
            type: payment.type,
            description: payment.description,
            isActive: payment.isActive
        }
    }
};

export default paymentService;