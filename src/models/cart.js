import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    items: {
        type: String,
    },
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
