import mongoose from "mongoose";

export const deliveryAddressSchema = new mongoose.Schema({
    address: {
        type: String
    },

    city: {
        type: String
    },

    district: {
        type: String
    },

    ward: {
        type: String
    },

    isDefault: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const userSChema = new mongoose.Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    avatar: {
        type: String
    },

    address: {
        type: String
    },

    phone: {
        type: String
    },

    deliveryAddress: [deliveryAddressSchema],

}, { timestamps: true });

let User = mongoose.model('User', userSChema);
export default User;