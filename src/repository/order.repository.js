// ** Model
import Order from '../models/order.js';

// ** Constant
import { ORDER_STATUS } from '../constants/model.constant.js';

const orderRepository = {
    async create(order) {
        return await Order.create(order);
    },

    async findAll(query) {
        return await Order.find(query);
    },

    async findById(id) {
        return await Order.findById(id);
    },

    async update(id, order) {
        return await Order.findByIdAndUpdate(id, order, { new: true });
    },

    async cancelOrder(id) {
        return await Order.findByIdAndUpdate(id, { status: ORDER_STATUS.CANCELLED }, { new: true });
    }
};

export default orderRepository;