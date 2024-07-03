// ** Model
import Order from '../models/order.js';

// ** Constant
import { ORDER_STATUS } from '../constants/model.constant.js';

const orderRepository = {
    async create(order) {
        return await Order.create(order);
    },

    async findBy(query) {
        return await Order.findOne(query);
    },

    async orderPagination(query, skip, size) {
        return await Order.find(query)
        .skip(skip)
        .limit(size);
    },

    async findByCode(code) {
        const order = await Order.findOne({ code });
        if (!order) throw new Error('Order not found');
        return order;
    },

    async update(id, order) {
        return await Order.findByIdAndUpdate(id, order, { new: true });
    },

    async cancelOrder(id) {
        return await Order.findByIdAndUpdate(id, { status: ORDER_STATUS.CANCELLED }, { new: true });
    }, 

    async totalDocuments(query) {
        return await Order.countDocuments(query);
    }
};

export default orderRepository;