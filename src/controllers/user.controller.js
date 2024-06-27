// ** Service
import userService from "../services/user.service.js";

// ** Constants
import { statusCode } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

const userController = {
    getProfile: async (req, res) => {
        const { user } = req;
        try {
            const userInfo = await userService.getProfile(user.id);
            if (userInfo.isBlocked) {
                throw new Error('This account is currently blocked');
            }
            res.status(statusCode.OK).json(response.success(
                {
                    data: userInfo,
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

    createDeliveryAddress: async (req, res) => {
        const { user } = req;
        const address = req.body;
        try {
            const result = await userService.createDeliveryAddress(user.id, address);
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
            ));
        }
    },
};

export default userController;