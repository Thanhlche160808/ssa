// ** Repository
import accountRepository from "../repository/account.repository.js";
import productService from "./product.service.js";

const accountService = {
    assignAccount: async ({ username, password, email, role }) => {
        const formatRole = productService.formatName(role);
        const account = await accountRepository.assign({ username, password, email, formatRole });

        return accountService.formatAccountResponse(account);
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
        accounts.map((account) => accountService.formatAccountResponse(account));

        return {
            accounts,
            totalPage,
            totalDocuments,
        };
    },

    editAccountRole: async ( accountId, { role }) => {
        const account = await accountRepository.findById(accountId);
        if (account.role === role) return accountService.formatAccountResponse(account);
        
        const editAccount = await accountRepository.editRole(accountId, role);
        return accountService.formatAccountResponse(editAccount);
    },

    blockAccount: async (accountId) => {
        const account = await accountRepository.blockById(accountId);
        return accountService.formatAccountResponse(account);
    },

    formatAccountResponse: async (account) => {
        const accountJson = account.toJSON();
        delete accountJson.password;
        delete accountJson.__v;

        return accountJson;
    }
};

export default accountService;