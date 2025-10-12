import axios from "axios";

const url = "http://localhost:4000";

export const statusService = {
    getAll: async (newData) => {
        try {
            const result = await axios.get(`${url}/status`
            )

            return result.data.data;
        } catch (e) {
            console.error("statusService.getAll : ", e);
            return [];
        }
    },
}