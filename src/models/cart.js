import mongoose from "mongoose";

const options = { discriminatorKey: 'kind' };

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String
        },
        productCode: {
            type: String
        },
        color: {
            type: String
        },
        size: {
            type: Number,
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        },
    }
);

const collectionSchema = new mongoose.Schema(
    {
        collectionName: {
            type: String
        },
        collectionCode: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        },
    }
);

export const itemSchema = new mongoose.Schema({
    kind: {
        type: String,
        required: true,
        enum: ['Product', 'Collection']
    }
}, options);

const cartSchema = new mongoose.Schema({
    items: [itemSchema],
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

let Cart = mongoose.model('Cart', cartSchema);
let Item = mongoose.model('Item', itemSchema);
Item.discriminator('Product', productSchema);
Item.discriminator('Collection', collectionSchema);

export default { Cart };
