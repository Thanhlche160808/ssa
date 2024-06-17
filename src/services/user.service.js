// ** Model
import Account from "../models/account.js";
import { selectUser } from '../constants/query.constant.js';

// ** Services

const userService = {
    getProfile: async (id) => {
        const account = await Account.findById(id).select('-__v -password').populate('user', selectUser);
        const user = account.user;

        const accountInfo = account.toJSON();
        const userInfo = user.toJSON();

        delete userInfo._id;
        delete userInfo.__v;
        delete accountInfo.refreshToken;

        return {
            ...accountInfo,
            user: userInfo,
        };
    },
};

export default userService;