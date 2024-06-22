// ** Models
import Cart from '../models/cart.js';

const cartRepository = {
    addToCart: async ({ items, totalPrice, accountId }) => {
        const userCart = await Cart.findOne({ account: accountId });

        if (!userCart) {
            const newCart = new Cart({
                items,
                totalPrice,
                account: accountId
            });

            await newCart.save();

            return {
                items: newCart.items,
                totalPrice: newCart.totalPrice,
            }

        } else {
            const cartItems = userCart.items;
            const existingCartItem = cartItems.find(cartItem => cartItem.productCode === items[0].productCode && cartItem.size === items[0].size);

            if (existingCartItem) {
                existingCartItem.quantity += items[0].quantity;
                userCart.totalPrice += totalPrice;
            } else {
                cartItems.push(items[0]);
                userCart.totalPrice += totalPrice;
            }

            userCart.items = cartItems;

            await userCart.save();

            return {
                items: userCart.items,
                totalPrice: userCart.totalPrice,
            }
        }
    },

    findCartByAccount: async (account) => {
        return await Cart.findOne({
            account
        }).select('-__v');
    },

    createOrUpdateCart: async (accountId, items, totalPrice) => {
        const cart = await Cart.findOneAndUpdate(
            { account: accountId },
            {
                items,
                totalPrice,
                account: accountId
            },
            { new: true, upsert: true }
        ).select('-__v');

        return cart;
    }
};

export default cartRepository;