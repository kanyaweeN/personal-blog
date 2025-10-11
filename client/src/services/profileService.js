import axios from "axios";

const url = "http://localhost:4000";

export const ProfileService = {
    getAll: async (params) => {
        try {
            const result = await axios.get(`${url}/profile`,
                {
                    params: params
                }
            )

            return result.data.data;
        } catch (e) {
            console.error("ProfileService.getAll : ", e);
            return [];
        }
    }, getById: async (id) => {
        try {
            const result = await axios.get(`${url}/profile/${id}`,
            )
            return result.data.data;
        } catch (e) {
            console.error("ProfileService.getById : ", e);
            return [];
        }
    }, updateById: async (newData) => {
        try {
            const result = await axios.put(`${url}/profile/${newData.id}`,
                newData
            )
            return result.data;
        } catch (e) {
            console.error("ProfileService.updateById : ", e);
            return [];
        }
    }
}
