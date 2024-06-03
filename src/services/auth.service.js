// ** Lib
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library'


// ** Model
import Account from "../models/account.js";
import User from "../models/user.js";

// ** Services
import jwtService from "../services/jwt.service.js";

// ** Repository
import accountRepository from "../repository/account.repository.js";

// ** Constants
import { GOOGLE_CLIENT_ID } from '../constants/env.js'

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        return { error: "Invalid user detected. Please try again" };
    }
}

const authService = {
    register: async ({ username, password, email, phone, firstName, lastName }) => {
        const account = await accountRepository.create({ username, password, email, phone, firstName, lastName });
        
        const accountJson = account.toJSON();
        delete accountJson.password;

        return accountJson;
    },

    login: async ({ username, password }) => {
        const account = await accountRepository.findByUsername(username);
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
                const verificationResponse = await verifyGoogleToken(credentital);
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
                    id: account.id,
                    username,
                }

                const { accessToken, refreshToken } = await jwtService.getToken(payload);
                const accountJson = accountExisted.toJSON();
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
    }
};

export default authService;