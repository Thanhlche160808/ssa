// ** Libs
import axios from 'axios';

// ** Constants
import { GHN_TOKEN } from '../constants';

const GHN_ENDPOINT = 'https://dev-online-gateway.ghn.vn/shiip/public-api';

const provincesHelper = {
    getPublicProvinces: async () => {
        try {
            const response = await axios.get(`${GHN_ENDPOINT}/master-data/province`, {
                headers: {
                    Token: GHN_TOKEN
                }
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching province:", error);
            return [];
        }
    },

    getDistricOfProvince: async (provinceId) => {
        try {
            const response = await axios.get(
                `${GHN_ENDPOINT}/master-data/district`,
                {
                    params: { province_id: provinceId },
                    headers: {
                        Token: GHN_TOKEN,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.data;
        } catch (error) {
            console.error("Error fetching districts:", error);
            return [];
        }
    },

    getWardOfDistrict: async (districtId) => {
        try {
            const response = await axios.get(
                `${GHN_ENDPOINT}/master-data/ward`,
                {
                    params: { district_id: districtId },
                    headers: {
                        Token: GHN_TOKEN,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.data;
        } catch (error) {
            console.error("Error fetching ward:", error);
            return [];
        }
    },

    getShippingFee: async ({
        fromDistrictId,
        fromWardCode,
        toDistrictId,
        toWardCode,
        amount,
    }) => {
        try {
            console.log(`${GHN_ENDPOINT}/v2/shipping-order/fee?service_type_id=2&insurance_value=${amount}&from_district_id=${fromDistrictId}&from_ward_code=${fromWardCode}&to_district_id=${toDistrictId}&to_ward_code=${toWardCode}&weight=500`);
            const response = await axios.get(
                `${GHN_ENDPOINT}/v2/shipping-order/fee?service_type_id=2&insurance_value=${amount}&from_district_id=${fromDistrictId}&from_ward_code=${fromWardCode}&to_district_id=${toDistrictId}&to_ward_code=${toWardCode}&weight=500`,
                {
                    headers: {
                        Token: GHN_TOKEN,
                        shop_id: 192587,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const fee = response.data.data.service_fee;
            return { fee };
        } catch (error) {
            console.error("Error fetching shipping fee:", error);
            return 0;
        }
    }
}

export default provincesHelper