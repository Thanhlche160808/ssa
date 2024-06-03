import mongoose from "mongoose";

export const Color = new mongoose.Schema(
    {
        colorName: {
            type: String
        },
        hex: {
            type: String
        },
        size: {
            type: Array[Size],
        },
    }
);

export const Size = new mongoose.Schema(
    {
        size: {
            type: Number
        },
        quantity: {
            type: Number
        },
    }
);

const productChema = new mongoose.Schema({
    productCode: {
        type: String
    },
    thumbnail: {
        type: String
    },
    images: {
        type: Array[String]
    },
    category: {
        type: String,
        ref: 'Category'
    },
    isHide: {
        type: Boolean,
        default: false
    },
    color: {
        type: Array[Color],
    },
    price: {
        type: Number
    },
});

let Product = mongoose.model('Product', productChema);
export default Product;