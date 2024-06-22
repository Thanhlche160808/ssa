// ** Service
import cartService from "../services/cart.service.js";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const cartController = {
    addToCart: async (req, res) => {
        const item = req.body;
        const { id } = req.user;
        try {
            const result = await cartService.addToCart(id, item);
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
        const { account } = req.signedCookies;
        const { cart } = req.cookies;
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
            if (!cart) {
                res.cookie("cart", result);
            } else {
                cart.items = result.items;
                cart.totalPrice = result.totalPrice;
                res.cookie("cart", cart);
            }
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
