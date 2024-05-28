// ** Lib
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ** Model
import Account from "../models/account";

// ** Services
import jwtService from "../services/jwt.service";

const authService = {
    create: async ({ username, password }) => {
        const usernameExist = await Account.findOne({ username });

        if (usernameExist) {
            throw new Error('Username is exist');
        }

        const account = new Account({
            username,
            password,
        });

        const salt = bcrypt.genSaltSync();
        account.password = bcrypt.hashSync(account.password, salt);

        await account.save();

        const accountJson = account.toJSON();

        delete accountJson.password;

        return accountJson;
    },

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
    },

    login: async ({ username, password }) => {
        const account = await Account.findOne({ username });

        if (!account) throw new Error("incorrect username");

        if (!bcrypt.compareSync(password, account.password))
            throw new Error("incorrect password");

        const payload = {
            id: account.id,
            username,
        }

        // const salt = bcrypt.genSaltSync();
        // user.refreshToken = bcrypt.hashSync(refreshToken, salt);
    
        // await user.save();

        const { accessToken, refreshToken } = await jwtService.getToken(payload);
        const accountJson = account.toJSON();
        delete accountJson.password;

        return {
            username: account.username,
            accessToken,
            refreshToken,
        }
    },

    
};

export default authService;