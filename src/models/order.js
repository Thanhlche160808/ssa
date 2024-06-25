import mongoose from 'mongoose';

// ** Model
import { itemSchema } from './cart.js';
import { deliveryAddressSchema } from './user.js';

// ** Constant
import { ORDER_STATUS } from '../constants/model.constant.js';


const orderSchema = new mongoose.Schema({
    code: {
        type: String,
    },

    items: [itemSchema],

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },

    email: {
        type: String,
        required: true,
    },

    receiverName: {
        type: String,
        required: true,
    },

    deliveryAddress: {
        type: deliveryAddressSchema,
        required: true,
    },

    receiverPhone: {
        type: String,
        required: true,
    },

    voucherCode: {
        type: String,
    },

    paymentMethod: {
        type: String,
        required: true,
    },

    deliveryTime: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
        default: ORDER_STATUS.PENDING,
    },

    shippingFee: {
        type: Number,
        required: true,
    },

    totalPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

let Order = mongoose.model('Order', orderSchema);

export default Order;