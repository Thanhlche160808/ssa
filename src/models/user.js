import mongoose from "mongoose";

export const deliveryAddressSchema = new mongoose.Schema({
    fullName: {
        type: String
    },

    phone: {
        type: String
    },

    email: {
        type: String
    },

    address: {
        type: String
    },

    province: {
        type: {
            provinceId: Number,
            provinceName: String
        }
    },

    district: {
        type: {
            districtId: Number,
            districtName: String
        }
    },

    ward: {
        type: {
            wardId: String,
            wardName: String
        }
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