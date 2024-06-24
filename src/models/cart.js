import mongoose from "mongoose";

export const SizeMetrics = new mongoose.Schema({
    size: {
        type: Number,
    },
    isAvailable: {
        type: Boolean,
    },
});

export const itemSchema = new mongoose.Schema({
    displayName: {
        type: String,
    },
    productCode: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    sizeMetrics: [SizeMetrics],
    size : {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    isHide: {
        type: Boolean,
    },
},
);

const cartSchema = new mongoose.Schema({
    items: [itemSchema],
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    totalPrice: {
        type: Number,
    },
},
    { timestamps: true }
);

let Cart = mongoose.model('Cart', cartSchema);

export default Cart;