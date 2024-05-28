// ** Lib
import jwt from "jsonwebtoken";

// ** Constants
import { authConstant, statusCode } from "../constants"

// ** Utils
import { response } from "../utils/baseResponse";

export const verifyAccessToken = (req, res, next) => {
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

        const payload = jwt.verify(token, process.env.JWT_ACCESS_KEY);

        req.user = payload;
        req.token = token;
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
