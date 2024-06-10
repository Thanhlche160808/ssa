import mongoose from "mongoose";

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
    favourite: [{
        type: String,
    }],
}, { timestamps: true }
);

let Account = mongoose.model('Account', accountSChema);
export default Account;