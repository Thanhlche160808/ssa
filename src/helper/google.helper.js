// ** Lib
import { OAuth2Client } from 'google-auth-library'

// ** Constants
import { GOOGLE_CLIENT_ID } from '../constants/env.js'

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleHelper = {
    verifyGoogleToken: async (token) => {
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
}

export default googleHelper;