// ** Lib
import jwt from 'jsonwebtoken';

const jwtService = {
    getToken: async (payload, type = "login") => {
        let accessToken, refreshToken;

        if (type === "login") {
            [accessToken, refreshToken] = await Promise.all([
                jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
                    expiresIn: process.env.EXPIRES_ACCESS_TOKEN,
                }),
                jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                    expiresIn: process.env.EXPIRES_REFRESH_TOKEN,
                }),
            ]);

            return { accessToken, refreshToken };
        } else {
            accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
                expiresIn: process.env.EXPIRES_ACCESS_TOKEN,
            });

            return { accessToken };
        }
    }
}

export default jwtService;