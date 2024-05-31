// *Lib
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';

// *Constant
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../constants/env.js'

//* Model
import Account from '../models/account.js';
import User from '../models/user.js';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/public/auth/google/callback"

},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const accountExisted = await Account.findOne({googleId: profile.id});
            if (accountExisted) {
                await User.findOneAndUpdate(
                    { _id: accountExisted.user },
                    {
                        firstName: profile._json.family_name,
                        lastName: profile._json.given_name,
                        avatar: profile._json.picture,
                    }
                );
            } else {
                const user = new User({
                    firstName: profile._json.family_name,
                    lastName: profile._json.given_name,
                    avatar: profile._json.picture,
                });

                await Account.create({
                    email: profile._json.email,
                    googleId: profile.id,
                    user,
                });

                user.save();
            }
        } catch (error) {
            console.log(error);
        }
        return cb(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Account.findOne({googleId: id});
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


export default passport;
