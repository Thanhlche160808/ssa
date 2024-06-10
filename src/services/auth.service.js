// ** Lib
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ** Services
import jwtService from "../services/jwt.service.js";

// ** Repository
import accountRepository from "../repository/account.repository.js";

// ** Constants
import { JWT_SECRET_KEY } from "../constants/index.js";

// ** Helper
import googleHelper from '../helper/google.helper.js'


const authService = {
    register: async ({ username, password, email, phone, firstName, lastName }) => {
        const account = await accountRepository.create({ username, password, email, phone, firstName, lastName });
        
        const accountJson = account.toJSON();
        delete accountJson.password;
        delete accountJson.__v;

        return accountJson;
    },

    login: async ({ username, password }) => {
        const account = await accountRepository.findByUsername(username);

        if (!bcrypt.compareSync(password, account.password))
            throw new Error("Incorrect password");
        const payload = {
            id: account._id,
            username: account.username ? account.username : account.email,
        }
        // const salt = bcrypt.genSaltSync();
        // user.refreshToken = bcrypt.hashSync(refreshToken, salt);

        // await user.save();

        const { accessToken, refreshToken } = await jwtService.getToken(payload);
        account.refreshToken = refreshToken;
        await account.save();

        const accountJson = account.toJSON();
        delete accountJson.password;

        return {
            id: account.id,
            username: account.username,
            email: account.email,
            role: account.role,
            isBlocked: account.isBlocked,
            accessToken,
            refreshToken,
        }
    },

    loginWithGoogle: async (credentital) => {
        try {
            if (credentital) {
                const verificationResponse = await googleHelper.verifyGoogleToken(credentital);
                if (verificationResponse.error) throw new Error(verificationResponse.error);
                const profile = verificationResponse?.payload;

                const account = await accountRepository.createOrUpdate(
                    {
                        email: profile.email,
                        firstName: profile.given_name,
                        lastName: profile.family_name,
                        avatar: profile.picture,
                    }
                );

                const payload = {
                    id: account._id,
                    username: account.username,
                }

                const { accessToken, refreshToken } = await jwtService.getToken(payload);

                const accountJson = account.toJSON();

                delete accountJson.password;

                return {
                    id: account.id,
                    username: account.username,
                    email: account.email,
                    role: account.role,
                    isBlocked: account.isBlocked,
                    accessToken,
                    refreshToken,
                }
            }
        } catch (error) {
            throw new Error(error.toString());
        }
    },

    refreshAccessToken: async (refreshToken) => {
        const payload = jwt.verify(refreshToken, JWT_SECRET_KEY);
        const account = await accountRepository.findById(payload.id);

        if (refreshToken !== account.refreshToken) throw new Error("Invalid refresh token");

        return await jwtService.getToken({
            id: account._id,
            username: account.username,
        }, "refresh");
    },
};

export default authService;