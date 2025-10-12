import axios from "axios";

const url = "http://localhost:4000";

export const categoriesService = {
    getAll: async (newData) => {
        try {
            console.log("newData", newData);

            const result = await axios.get(`${url}/categories`
            )

            return result.data.data;
        } catch (e) {
            console.error("categoriesService.getAll : ", e);
            return [];
        }
    },
}