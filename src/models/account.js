import mongoose from "mongoose";
import { itemSchema } from "./cart";

const accountSChema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "User"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favourite: [itemSchema]
});

let Account = mongoose.model('Account', accountSChema);
export default Account;