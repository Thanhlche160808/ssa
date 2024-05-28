// ** Service
import authService from "../services/auth.service";

// ** Constants
import { statusCode } from "../constants";

// ** Utils
import { response } from "../utils/baseResponse";

const authController = {
    register: async (req, res) => {
        const data = req.body;
        try {
            const account = await authService.create(data);
            res.status(statusCode.CREATED).json(response.success(
                {
                    data: account,
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
};

export default authController;