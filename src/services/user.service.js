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

    createDeliveryAddress: async (id, address) => {
        const account = await accountRepository.findById(id);
        const user = account.user;
    
        const isExist = user.deliveryAddress.find(item => 
            item.address === address.address || 
            item.city === address.city || 
            item.district === address.district || 
            item.ward === address.ward
        );
    
        if (isExist) {
            throw new Error('Address already exists');
        }
    
        if (address.isDefault) {
            user.deliveryAddress.forEach(item => {
                item.isDefault = false;
            });
        }
    
        user.deliveryAddress.push(address);
    
        await user.save();
    
        const result = userService.handleDeliveryAddressResult(user.deliveryAddress);
        return result;
    },
    

    handleDeliveryAddressResult: (deliveryAddress) => {
        return deliveryAddress.map(item => {
            return {
                id: item._id,
                address: item.address,
                city: item.city,
                district: item.district,
                ward: item.ward,
                isDefault: item.isDefault,
            }
        });
    }
};

export default userService;