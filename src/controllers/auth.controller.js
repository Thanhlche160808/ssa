// ** Service
import authService from "../services/auth.service.js";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const maxAge = 7 * 24 * 60 * 60 * 1000;

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
            res.cookie("refreshToken", loginInfo.refreshToken,
                {
                    signed: true,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge
                });
            delete loginInfo.refreshToken;
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
            res.cookie("refreshToken", result.refreshToken,
                {
                    signed: true,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge
                });
            delete result.refreshToken;
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

    refreshAccessToken: async (req, res) => {
        const { refreshToken } = req.signedCookies;

        if (!refreshToken) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: "Token is expired, please login again!",
                    code: statusCode.BAD_REQUEST,
                }
            ));
            return;
        }

        try {
            const result = await authService.refreshAccessToken(refreshToken);
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

    logout: async (req, res) => {
        const { accessToken } = req.body;
        try {
            await authService.logout(accessToken);
            res.clearCookie("refreshToken");
            res.status(statusCode.OK).json(response.success(
                {
                    data: "OK",
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

    forgotPassword: (req, res) => {
        const { email } = req.body;
        try {
            authService.forgotPassword(email);
            res.status(statusCode.OK).json(response.success(
                {
                    data: "OK",
                    code: statusCode.OK,
                }
            ));
        } catch (err) {
            res.status(statusCode.BAD_REQUEST).json(response.error(
                {
                    message: err?.message,
                    code: statusCode.BAD_REQUEST,
                }
            ))
        }
    },

    resetPassword: async (req, res) => {
        const { token, password } = req.body;
        try {
            await authService.resetPassword(token, password);
            res.status(statusCode.OK).json(response.success(
                {
                    data: "OK",
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

    changePassword: async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        const { id } = req.user;
        try {
            await authService.changePassword(id, oldPassword, newPassword);
            res.status(statusCode.OK).json(response.success(
                {
                    data: "OK",
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

export default authController;