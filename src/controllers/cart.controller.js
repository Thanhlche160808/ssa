// ** Service
import cartService from "../services/cart.service.js";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const cartController = {
    addToCart: async (req, res) => {
        const item = req.body;
        const { account, cart } = req.cookies;
        try {
            const result = await cartService.add(item, account, cart);
            res.cookie("cart", result, { sameSite: "none" });
            res.status(statusCode.CREATED).json(response.success(
                {
                    data: result,
                    code: statusCode.CREATED,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    getCart: async (req, res) => {
        const { account } = req.cookies;
        if (!account) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    code: statusCode.BAD_REQUEST,
                    message: "You need to login to get your cart",
                }
            ));
            return;
        }
        try {
            const result = await cartService.getCartByAccount(account);
            res.cookie("cart", result);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    removeItem: async (req, res) => {
        const { cart, account } = req.cookies;
        const { code } = req.params;
        try {
            const result = await cartService.removeItem(code, cart, account);
            res.cookie("cart", result);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    updateItem: async (req, res) => {
        const { cart, account } = req.cookies;
        const item = req.body;
        if (!cart) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    code: statusCode.BAD_REQUEST,
                    message: "There is no cart to update. Please add items to cart first.",
                }
            ));
            return;
        }
        try {
            const result = await cartService.updateCart(item, cart, account);
            res.cookie("cart", result);
            res.status(statusCode.OK).json(response.success(
                {
                    data: result,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: error?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },
};

export default cartController;