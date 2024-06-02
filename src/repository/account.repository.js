// ** Lib
import bcrypt from 'bcrypt';

// ** Models
import Account from '../models/account.js';
import User from '../models/user.js';

class AccountRepository {
    async create(account) {
        // let session = null;
        try {
            // session = await mongoose.startSession();
            // session.startTransaction();

            const usernameExist = await Account.findOne({ $or: [{ username: account.username }, { email: account.email }] });

            if (usernameExist) {
                throw new Error('Username is exist');
            }

            const user = new User({
                firstName: account.firstName,
                lastName: account.lastName,
                phone: account.phone,
            });

            const newAccount = new Account({
                userName: account.username,
                password: account.password,
                email: account.email,
                user,
            });

            // account.user = user._id;

            const salt = bcrypt.genSaltSync();

            newAccount.password = bcrypt.hashSync(newAccount.password, salt);

            await newAccount.save();

            return await user.save();

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
            throw error;
        }
    }

    async findByUsername(username) {
        const account = await Account.findOne({ username });

        if (!account) throw new Error("Incorrect username");

        return account;
    }

    async createOrUpdate({ email, firstName, lastName, avatar }) {
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
            return this.create({ email, firstName, lastName, picture });
        }

    }
};

export default new AccountRepository();