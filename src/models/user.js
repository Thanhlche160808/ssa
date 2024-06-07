import mongoose from "mongoose";

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
    deliveryAddress: {
        type: Array
    },
});

let User = mongoose.model('User', userSChema);
export default User;