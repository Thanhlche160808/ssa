// ** Models
import Cart from '../models/cart.js';

const cartRepository = {
    addToCart: async ({ item, totalPrice, accountId }) => {
        const userCart = await Cart.findOne({ account: accountId });

        if (!userCart) {
            const newCart = new Cart({
                items: JSON.stringify(item),
                totalPrice,
                account: accountId
            });
            await newCart.save()
            return {
                items: JSON.parse(newCart.items),
                totalPrice: newCart.totalPrice,
            }
        } else { 
            const cartItems = JSON.parse(userCart.items);
            const existingCartItem = cartItems.find(cartItem => cartItem.productCode === item[0].productCode && cartItem.size === item[0].size);

            if (existingCartItem) {
                existingCartItem.quantity += item[0].quantity;
                userCart.totalPrice += totalPrice;
            } else {
                cartItems.push(item[0]);
                userCart.totalPrice += totalPrice;
            }

            userCart.items = JSON.stringify(cartItems);
            await userCart.save();
            return {
                items: JSON.parse(userCart.items),
                totalPrice: userCart.totalPrice,
            }
        }
    },

    findCartByAccount: async (account) => {
        return await Cart.findOne({
            account
        }).select('-__v');
    }
};

export default cartRepository;