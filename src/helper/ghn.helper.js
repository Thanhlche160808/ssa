import axios from 'axios';

const provincesHelper = {
    getPublicProvinces : async () =>  {
        try {
            const response = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: {
                  token: 'aa464af2-349c-11ef-8e53-0a00184fe694'
                }
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching province:", error);
            return [];
        }
    },

    getDistricOfProvince : async (provinceId) =>  {
        try {
            const response = await axios.get(
                "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
                {
                    params: { province_id: provinceId },
                    headers: {
                        token: 'aa464af2-349c-11ef-8e53-0a00184fe694',
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

    getWardOfDistrict : async (districtId) =>  {
        try {
            const response = await axios.get(
                "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
                {
                    params: { district_id: districtId },
                    headers: {
                        token: 'aa464af2-349c-11ef-8e53-0a00184fe694',
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
}

export default provincesHelper