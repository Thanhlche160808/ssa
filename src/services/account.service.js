// ** Repository
import accountRepository from "../repository/account.repository.js";
import productService from "./product.service.js";

const accountService = {
    assignAccount: async ({ username, password, email, role, phone, firstName, lastName }) => {
        const formatRole = productService.formatName(role);
        const account = await accountRepository.assign({ username, password, email, formatRole, phone, firstName, lastName });

        const accountJson = account.toJSON();
        delete accountJson.password;
        delete accountJson.__v;

        return accountJson;
    },

    getAccountDashboard: async ({
        page,
        size,
        nameKey,
        role,
        isBlocked,
    }) => {
        const skip = (page - 1) * size;
        let query = {};
        if (nameKey) query = {
            $or: [
                { username: { $regex: nameKey, $options: 'i' } },
                { email: { $regex: nameKey, $options: 'i' } },
            ]
        };
        if (role) query.role = role;
        if (isBlocked) query.isBlocked = isBlocked;
    
        const totalDocuments = await accountRepository.totalDocuments(query);
        const totalPage = Math.ceil(totalDocuments / size);
    
        const accounts = await accountRepository.filterAccounts(
          query,
          skip,
          size
        );
        accounts.map((account) => account.password = undefined);

        return {
            accounts,
            totalPage,
            totalDocuments,
        };
    },

    editAccountRole: async ( accountId, {role}) => {
        const account = await accountRepository.editRole(accountId, role);
        return account;
    },

    blockAccount: async (accountId) => {
        const account = await accountRepository.blockById(accountId);
        return account;
    },
};

export default accountService;