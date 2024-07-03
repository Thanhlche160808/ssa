// ** Lib
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// ** Services
import jwtService from "../services/jwt.service.js";

// ** Repository
import accountRepository from "../repository/account.repository.js";

// ** Constants
import { JWT_SECRET_KEY, JWT_ACCESS_KEY, CLIENT_URL } from "../constants/index.js";

// ** Helper
import googleHelper from '../helper/google.helper.js'

// ** Configs
import { client } from '../configs/redisConfig.js';

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
            role: account.role,
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
                    username: account.username ? account.username : account.email,
                    role: account.role,
                }

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

    logout: async (accessToken) => {
        const payload = jwt.decode(accessToken, JWT_ACCESS_KEY);

        if (!payload) throw new Error('Invalid access token');

        const account = await accountRepository.findById(payload.id);
        await account.updateOne({ refreshToken: null });

        const exp = payload.exp * 1000;
        const now = Date.now();

        const ttl = Math.ceil((exp - now) / 1000);

        await client.set(`${account.id}_${payload.exp}`, accessToken, {
            EX: ttl,
            NX: true
        });
    },

    forgotPassword: async (email) => {
        const account = await accountRepository.findByEmail(email);
        if (!account) throw new Error("Account not found");

        const resetPasswordToken = crypto.randomBytes(32).toString('hex');

        account.passwordResetToken = resetPasswordToken;
        account.passwordResetExpires = Date.now() + 600000;

        account.save();

        const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 10 phút kể từ bây giờ. <a href=${CLIENT_URL}${resetPasswordToken}>Click here</a>`
        await googleHelper.sendEmail(email, "Forgot password", html);
    },

    resetPassword: async (token, password) => {
        const account = await accountRepository.findByPasswordResetToken(token);

        if (!account) throw new Error("Token is invalid or has expired");

        const salt = bcrypt.genSaltSync();
        account.password = bcrypt.hashSync(password, salt);

        account.passwordResetToken = null;
        account.passwordResetExpires = null;
        await account.save();
    },

    changePassword: async (id, oldPassword, newPassword) => {
        const account = await accountRepository.findById(id);
        if (!bcrypt.compareSync(oldPassword, account.password))
            throw new Error("Incorrect password");

        const salt = bcrypt.genSaltSync();
        account.password = bcrypt.hashSync(newPassword, salt);

        await account.save();
    }
};

export default authService;