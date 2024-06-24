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

            if (usernameExist.email === account.email) {
                throw new Error('Email is exist');
            }

            if (usernameExist.user === account.username) {
                throw new Error('Username is exist');
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
        const account = await Account.findById(id).select('-__v -password').populate('user', selectUser);

        if (!account) throw new Error('This account is currently unavailable');

        return account;
    },
};

export default accountRepository;