// ** Service
import cartService from "../services/cart.service.js";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const cartController = {
    addToCart: async (req, res) => {
        const cart = req.body;
        const { account } = req.cookies;
        console.log('account', account);
        if (!account) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: "Please login to add to cart",
                    code: statusCode.BAD_REQUEST,
                }
            ));
            return;
        }
        try {
            const result = await cartService.add(cart, account);
            res.cookie("cart", result);
            res.status(statusCode.CREATED).json(response.success(
                {
                    data: 'OK',
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
                    data: 'OK',
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
    }
};

export default cartController;