// ** Repository
import cartRepository from "../repository/cart.repository.js";
import productRepository from "../repository/product.repository.js";

const cartService = {
    add: async ({code, color, size, quantity}, account) => {
        if (!account) {
            const guestCart = cartService.addGuestCart(item);
            return guestCart;
        }

        let totalPrice = 0;
        const product = await productRepository.findProductByCode(code);
        if (!product) {
            throw new Error("Product not exist");
        }
        let cartItem = {};
        if (product) {
            cartItem = {
                kind: "Product",
                productName: product.productName,
                productCode: product.productCode,
                color,
                size,
                quantity,
                price: product.price,
            };
            totalPrice += product.price * quantity;
        }

        return await cartRepository.addToCart({
            item: [cartItem],
            totalPrice,
            accountId: account,
        });
    },
    
    addGuestCart: async (item) => {
        let totalPrice = 0;
        const product = await productRepository.findProductByCode(item.code);
        let cartItem = {};
        if (product) {
            cartItem = {
                kind: "Product",
                productName: product.productName,
                productCode: product.productCode,
                color: item.color,
                size: item.size,
                quantity: item.quantity,
                price: product.price,
            };
            totalPrice += product.price * item.quantity;
        }

        return {
            items: [cartItem],
            totalPrice,
        }
    },

    getCartByAccount: async (account) => {
        const cart = await cartRepository.findCartByAccount(account);
        const cartItems = JSON.parse(cart.items);
        return {
            items: cartItems,
            totalPrice: cart.totalPrice,
        }
    },

    removeItem: async (code, cart, account) => {
        if (!account) {
            const items = cart.items.filter(cartItem => cartItem.productCode !== code);
            cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

            return {
                items,
                totalPrice: cart.totalPrice,
            }
        }

        const userCart = await cartRepository.findCartByAccount(account);
        const cartItems = JSON.parse(userCart.items);
        const items = cartItems.filter(cartItem => cartItem.productCode !== code);
        userCart.totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        userCart.items = JSON.stringify(items);

        await userCart.save();

        return {
            items,
            totalPrice: userCart.totalPrice,
        }
    }
};

export default cartService;