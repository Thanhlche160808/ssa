// ** Lib
import jwt from "jsonwebtoken";

// ** Constants
import { authConstant, statusCode } from "../constants/index.js"
import { JWT_ACCESS_KEY } from "../constants/index.js";

// ** Utils
import { response } from "../utils/baseResponse.js";

// ** Configs
import { client } from '../configs/redisConfig.js';

export const verifyAccessToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token)
            return res
                .status(statusCode.UNAUTHORIZED)
                .json(response.error({
                    code: statusCode.UNAUTHORIZED,
                    message: authConstant.UNAUTHORIZED,
                }));

        if (token.startsWith("Bearer "))
            token = token.slice(7, token.length).trim();

        const payload = jwt.verify(token, JWT_ACCESS_KEY);

        const result = await client.get(`${payload.id}_${payload.exp}`);
        if (result === token) {
            return res.status(statusCode.UNAUTHORIZED).json(
                response.error({
                    code: statusCode.UNAUTHORIZED,
                    message: 'Token is expired',
                })
            );
        }

        req.user = payload;
        next();
    } catch (err) {
        res.status(statusCode.UNAUTHORIZED).json(
            response.error({
                code: statusCode.UNAUTHORIZED,
                message: err.message,
            })
        );
    }
};
