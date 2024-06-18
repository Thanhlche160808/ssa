// ** Repository
import accountRepository from "../repository/account.repository.js";


const userService = {
    getProfile: async (id) => {
        const account = await accountRepository.findById(id);
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