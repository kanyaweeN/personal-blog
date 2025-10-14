import axios from "axios";

// const url = "http://localhost:4000";
const url = import.meta.env.VITE_API_URL;

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