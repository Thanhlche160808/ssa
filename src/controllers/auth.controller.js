// ** Service
import authService from "../services/auth.service.js";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const authController = {
    register: async (req, res) => {
        const data = req.body;
        try {
            const result = await authService.register(data);
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

    login: async (req, res) => {
        const data = req.body;
        try {
            const loginInfo = await authService.login(data);
            res.cookie('account', loginInfo.id);
            res.status(statusCode.OK).json(response.success(
                {
                    data: loginInfo,
                    code: statusCode.OK,
                }
            ));
        } catch (error) {
            // const errMessage = err.message;
            let code = statusCode.BAD_REQUEST;
            // if (
            //   errMessage === message.incorrect("usernameOrEmail") ||
            //   errMessage === message.incorrect("password")
            // ) {
            //   code = 404;
            // }
            res.status(code).json(
                {
                    response: {
                        isSuccess: false,
                        statusCode: code,
                        message: error?.message,
                    }
                }
            )
        }
    },

    loginWithGoogle: async (req, res) => {
        const { credential } = req.body;
        try {
            const result = await authService.loginWithGoogle(credential);
            res.cookie('account', result.id);
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

export default authController;