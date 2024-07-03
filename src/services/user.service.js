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
        delete accountInfo.password;

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
            item.province.provinceId === address.province.provinceId || 
            item.district.districtId === address.district.districtId || 
            item.ward.wardId === address.ward.wardId
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
                fullName: item.fullName,
                phone: item.phone,
                email: item.email,
                address: item.address,
                province: {
                    provinceId: item.province.provinceId,
                    provinceName: item.province.provinceName,
                },
                district: {
                    districtId: item.district.districtId,
                    districtName: item.district.districtName,
                },
                ward: {
                    wardId: item.ward.wardId,
                    wardName: item.ward.wardName,
                },
                isDefault: item.isDefault,
            }
        });
    },

    updateDeliveryAddress: async (accountId, addressId, address) => {
        const account = await accountRepository.findById(accountId);
        const user = account.user;
    
        const deliveryAddress = user.deliveryAddress.id(addressId);

        if (!deliveryAddress) {
            throw new Error('Address not found');
        }
    
        if (address.isDefault) {
            user.deliveryAddress.forEach(item => {
                item.isDefault = false;
            });
        }
    
        deliveryAddress.address = address.address;
        deliveryAddress.city = address.city;
        deliveryAddress.district = address.district;
        deliveryAddress.ward = address.ward;
        deliveryAddress.isDefault = address.isDefault;
    
        await user.save();
    
        const result = userService.handleDeliveryAddressResult(user.deliveryAddress);
        return result;
    },

    getUserDeliveryAddress: async (accountId) => {
        const account = await accountRepository.findById(accountId);
        const user = account.user;
    
        const result = userService.handleDeliveryAddressResult(user.deliveryAddress);
        return result;
    },

    deleteDeliveryAddress: async (accountId, addressId) => {
        const account = await accountRepository.findById(accountId);
        const user = account.user;

        const deliveryAddress = user.deliveryAddress.id(addressId);

        if (!deliveryAddress) {
            throw new Error('Address not found');
        }

        if (deliveryAddress.isDefault) {
            throw new Error('Cannot delete default address');
        }

        user.deliveryAddress.pull({ _id: addressId });

        await user.save();

        const result = userService.handleDeliveryAddressResult(user.deliveryAddress);

        return result;
    },
};

export default userService;