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
    productName: {
        type: String
    },
    type: {
        type: String
    },
    displayName: {
        type: String
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    images: {
        type: Array[String]
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    isHide: {
        type: Boolean,
        default: false
    },
    color: {
        type: Color,
    },
    price: {
        type: Number
    },
});

let Product = mongoose.model('Product', productChema);
export default Product;