// ** Lib
import { OAuth2Client } from 'google-auth-library'
import nodemailer from 'nodemailer'

// ** Constants
import { GOOGLE_CLIENT_ID } from '../constants/env.js'

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testzed920@gmail.com",
      pass: "kqit gdml mxqh jhat",
    },
  });

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
    },

    sendEmail: async (email, subject, html) => {
        await transporter.sendMail({
            from: "testzed920@gmail.com",
            to : email,
            subject: subject,
            html: html
        })
    }
}

export default googleHelper;