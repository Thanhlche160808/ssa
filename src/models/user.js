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
    favorite: {
        type: Array
    },
    deliveryAddress: {
        type: Array
    },
    address: {
        type: String
    }
});

let User = mongoose.model('User', userSChema);
export default User;