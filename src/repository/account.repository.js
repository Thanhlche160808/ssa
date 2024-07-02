// ** Lib
import bcrypt from 'bcrypt';

// ** Models
import Account from '../models/account.js';
import User from '../models/user.js';

// ** Constants
import { selectUser } from '../constants/query.constant.js';

const accountRepository = {
    create: async (account) => {
        // let session = null;
        try {
            // session = await mongoose.startSession();
            // session.startTransaction();
            const query = [];
            if (account.username) {
                query.push({ username: account.username });
            }
            if (account.email) {
                query.push({ email: account.email });
            }

            const usernameExist = await Account.findOne({ $or: query });

            // 1 mỗi 1 account chỉ có 1 username và 1 email
            if (usernameExist) {
                if (usernameExist.username === account.username) {
                    throw new Error('This username is already taken');
                } else {
                    throw new Error('This email is already taken');
                }
            }

            const user = new User({
                firstName: account.firstName,
                lastName: account.lastName,
                phone: account.phone,
            });

            const newAccount = new Account({
                username: account.username,
                password: account.password,
                email: account.email,
                user,
            });

            // account.user = user._id;

            if (account.password) {
                const salt = bcrypt.genSaltSync();

                newAccount.password = bcrypt.hashSync(newAccount.password, salt);
            }

            await newAccount.save();

            await user.save();

            return newAccount.populate('user', selectUser);

            // // await user.save({ session });

            // const accountJson = account.toJSON();

            // delete accountJson.password;

            // // await session.commitTransaction();
            // // session.endSession();

            // return accountJson;
        } catch (error) {
            // if (session) {
            //     await session.abortTransaction();
            //     session.endSession();
            // }
            throw new Error(error.message);
        }
    },

    findByUsername: async (username) => {
        const account = await Account.findOne({ $or: [{ username }, { email: username }] });

        if (!account) throw new Error("Incorrect username");

        return account;
    },

    createOrUpdate: async ({ email, firstName, lastName, avatar }) => {
        const account = await Account.findOne({ email }).populate('user');

        if (account) {
            await User.findOneAndUpdate(
                { _id: account.user._id },
                {
                    firstName,
                    lastName,
                    avatar,
                },
                { new: true }
            );
            return account;
        } else {
            return accountRepository.create({ email, firstName, lastName, avatar });
        }
    },

    findById: async (id) => {
        const account = await Account.findById(id).select('-__v').populate('user', selectUser);

        if (!account) throw new Error('This account is currently unavailable');

        return account;
    },

    findByEmail: async (email) => {
        const account = await Account.findOne({ email });
        return account;
    },

    findByPasswordResetToken: async (token) => {
        const account = await Account.findOne({ passwordResetToken: token , passwordResetExpires: { $gt: Date.now() }});
        return account;
    },

    filterAccounts: async (query, skip, size) => {
        return await Product.find(query)
            .populate("user", selectUser)
            .select("-__v")
            .skip(skip)
            .limit(size);
    },

    assign: async (account) => {
        try {
            const query = [];
            if (account.username) {
                query.push({ username: account.username });
            }
            if (account.email) {
                query.push({ email: account.email });
            }

            const usernameExist = await Account.findOne({ $or: query });

            // mỗi 1 account chỉ có 1 username và 1 email
            if (usernameExist) {
                if (usernameExist.username === account.username) {
                    throw new Error('This username is already taken');
                } else {
                    throw new Error('This email is already taken');
                }
            }

            const user = new User({
                firstName: account.firstName,
                lastName: account.lastName,
                phone: account.phone,
            });

            const newAccount = new Account({
                username: account.username,
                password: account.password,
                email: account.email,
                role: account.formatRole,
                user,
            });

            if (account.password) {
                const salt = bcrypt.genSaltSync();
                newAccount.password = bcrypt.hashSync(newAccount.password, salt);
            }

            await newAccount.save();

            await user.save();

            return newAccount.populate('user', selectUser);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    totalDocuments: async (query) => {
        return await Account.countDocuments(query);
    },

    editRole: async (accountId, newRole) => {
        const account = await accountRepository.findById(accountId);
        account.role = newRole;
        await account.save();
        return account;
    },

    blockById: async (accountId) => {
        const account = await accountRepository.findById(accountId);
        account.isBlocked = !account.isBlocked;
        await account.save();
        return account
    },
};

export default accountRepository;