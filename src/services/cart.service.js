// ** Repository
import cartRepository from "../repository/cart.repository.js";
import productRepository from "../repository/product.repository.js";
import productService from "../services/product.service.js";


// ** Service
import handleSizeMetrics from "../services/product.service.js";

const cartService = {
    add: async ({ code, color, size, quantity }, account, cart) => {

        let totalPrice = 0;
        const product = await productRepository.findProductByCode(code);
        if (!product) throw new Error("Product not exist");

        let cartItem = {};
        if (product) {
            cartItem = {
                productName: product.productName,
                productCode: product.productCode,
                color,
                size,
                quantity,
                price: product.price,
            };
            totalPrice += product.price * quantity;
        }

        const result = await cartRepository.addToCart({
            items: [cartItem],
            totalPrice,
            accountId: account,
        });

        return {
            items: await cartService.formatCartItems(result.items),
            totalPrice: result.totalPrice,
        };
    },

    addToCart: async (accountId, item) => {
        const product = await productRepository.findProductByCode(item.productCode);

        if (!product || product.isHide === true) throw new Error("Product not found");

        let totalPrice = 0;

        const sizeMetrics = await productService.handleSizeMetrics(product.colourVariant.sizeMetrics);

        const cartItem = {
            displayName: product.displayName,
            productCode: product.productCode,
            image: product.images[0],
            price: product.price,
            size: item.size,
            quantity: item.quantity,
            isHide: product.isHide,
            sizeMetrics,
        }

        totalPrice = cartItem.price * cartItem.quantity;

        const cart = await cartRepository.addToCart([cartItem], totalPrice, accountId);

        const cartItems = await cartService.formatCartItems(cart.items);

        return {
            items: cartItems,
            totalPrice: cart.totalPrice,
        }
    },

    formatCartItems: async (items) => {
        return items.map(item => {
            const sizeMetrics = item.sizeMetrics.map(sizeMetric => {
                return {
                    size: sizeMetric.size,
                    isAvailable: sizeMetric.isAvailable,
                }
            });
            return {
                displayName: item.productName,
                productCode: item.productCode,
                image: item.image,
                price: item.price,
                size: item.size,
                quantity: item.quantity,
                sizeMetrics,
                isHide: item.isHide,
            }
        });
    },

    getCartByAccount: async (accountId) => {
        const cart = await cartRepository.findCartByAccount(accountId);
        const cartItems = await cartService.formatCartItems(cart.items);
        return {
            items: cartItems,
            totalPrice: cart.totalPrice,
        }
    },

    removeItem: async (productCode, size, accountId) => {

        const userCart = await cartRepository.findCartByAccount(accountId);

        const indexItem = userCart.items.findIndex(cartItem => cartItem.productCode === productCode && cartItem.size === size);
        if (!indexItem < 0) throw new Error("No product in cart");

        userCart.items.splice(indexItem, 1);
        userCart.totalPrice = await cartService.calculateTotalPrice(userCart.items);

        await userCart.save();

        return {
            items: await cartService.formatCartItems(userCart.items),
            totalPrice: userCart.totalPrice,
        }
    },

    updateCart: async ({ productCode, oldSize, oldQuantity, newSize, newQuantity }, accountId) => {
        const userCart = await cartRepository.findCartByAccount(accountId);
        if (!userCart) throw new Error("Cart not found");

        const cartItemsUpdate = await cartService.handleUpdateItems({ productCode, oldSize, oldQuantity, newSize, newQuantity }, userCart.items);
        userCart.items = cartItemsUpdate.items;
        userCart.totalPrice = cartItemsUpdate.totalPrice;
        userCart.save();

        return cartItemsUpdate
    },

    handleUpdateItems: async ({ productCode, oldSize, oldQuantity, newSize, newQuantity }, items) => {
        const updateItems = [];
        const index = items.findIndex(item => item.productCode === productCode && item.size === oldSize && item.quantity === oldQuantity);

        if (index === -1) throw new Error("Item not found");

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

        return {
            items: await cartService.formatCartItems(updateItems),
            totalPrice,
        }
    },

    calculateTotalPrice: async (items) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
};

export default cartService;