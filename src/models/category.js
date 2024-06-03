import mongoose from "mongoose";

const categorySChema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    isHide: {
        type: Boolean,
        default: false,
    }
});

let Category = mongoose.model('Account', categorySChema);
export default Category;