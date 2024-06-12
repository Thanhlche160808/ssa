// ** Repository
import cartRepository from "../repository/cart.repository.js";
import productRepository from "../repository/product.repository.js";

const cartService = {
    add: async ({ code, color, size, quantity }, account, cart) => {
        if (!account) {
            const guestCart = cartService.addGuestCart({ code, color, size, quantity }, cart);
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

    addGuestCart: async ({ code, color, size, quantity }, cart) => {
        const product = await productRepository.findProductByCode(code);

        if (cart) {
            const items = cart.items;
            const existingItem = items.find(item => item.productCode === code && item.color === color && item.size === size);
            if (existingItem) {
                existingItem.quantity += quantity;
                cart.totalPrice += product.price * quantity;
            } else {
                items.push({
                    kind: "Product",
                    productName: product.productName,
                    productCode: product.productCode,
                    color: color,
                    size: size,
                    quantity: quantity,
                    price: product.price,
                });
                cart.totalPrice += product.price * quantity;
            }
            return {
                items,
                totalPrice: cart.totalPrice,
            }
        }

        let totalPrice = 0;
        let cartItem = {};
        if (product) {
            cartItem = {
                kind: "Product",
                productName: product.productName,
                productCode: product.productCode,
                color: color,
                size: size,
                quantity: quantity,
                price: product.price,
            };
            totalPrice += product.price * quantity;
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
    },

    updateCart: async ({ code, oldSize, oldQuantity, newSize, newQuantity }, cart, account) => {
        //Guest cart
        if (!account) {
            return await cartService.handleUpdateItems({ code, oldSize, oldQuantity, newSize, newQuantity }, cart.items);
        }

        const userCart = await cartRepository.findCartByAccount(account);
        const cartItems = JSON.parse(userCart.items);

        const cartItemsUpdate = await cartService.handleUpdateItems({ code, oldSize, oldQuantity, newSize, newQuantity }, cartItems);
        userCart.items = JSON.stringify(cartItemsUpdate.items);
        userCart.totalPrice = cartItemsUpdate.totalPrice;
        userCart.save();

        return cartItemsUpdate
    },

    handleUpdateItems: async ({ code, oldSize, oldQuantity, newSize, newQuantity }, items) => {
        const updateItems = [];
        const index = items.findIndex(item => item.productCode === code && item.size === oldSize && item.quantity === oldQuantity);
        items[index].size = newSize;
        items[index].quantity = newQuantity;

        // Merge duplicate products and update quantity
        items.forEach(item => {
            const existingItem = updateItems.find(updateItem => updateItem.productCode === item.productCode && updateItem.size === item.size);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                updateItems.push(item);
            }
        });

        const totalPrice = await cartService.calculateTotalPrice(updateItems);
        console.log('totalPrice:', totalPrice);
        return {
            items: updateItems,
            totalPrice,
        }
    },

    calculateTotalPrice: async (items) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
};

export default cartService;