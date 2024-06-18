import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    productName: {
        type: String,
    },
    productCode: {
        type: String,
    },
    color: {
        type: String,
    },
    size : {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    }
},
);

const cartSchema = new mongoose.Schema({
    items: [itemSchema],
    totalPrice: {
        type: Number,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
},
    { timestamps: true }
);

let Cart = mongoose.model('Cart', cartSchema);

export default Cart;
