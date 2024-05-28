import mongoose from "mongoose";

const accountSChema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

let Account = mongoose.model('Account', accountSChema);
export default Account;