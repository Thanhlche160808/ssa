// ** Lib
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ** Model
import Account from "../models/account";

// ** Services

const userService = {
    getProfile: async (id) => {
        const account = await Account.findById(id).populate('user');
        const user = account.user;

        const userInfo = user.toJSON();

        delete userInfo._id;
        delete userInfo.__v;

        return userInfo;
    },
};

export default userService;