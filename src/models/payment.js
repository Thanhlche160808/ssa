import mongoose from "mongoose";

const paymentType = ['COD', 'MOMO'];

const paymentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        enum: paymentType,
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }
);

let Payment = mongoose.model('Payment', paymentSchema);
export default Payment;