import axios from "axios";

// const url = "http://localhost:4000";
const url = import.meta.env.VITE_API_URL;

export const categoriesService = {
    create: async (newData) => {
        try {
            const result = await axios.post(`${url}/categories`,
                newData
            )

            return result.data.data;
        } catch (e) {
            console.error("categoriesService.create : ", e);
            return [];
        }
    },
    getAll: async () => {
        try {
            const result = await axios.get(`${url}/categories`)

            return result.data.data;
        } catch (e) {
            console.error("categoriesService.getAll : ", e);
            return [];
        }
    },
    getById: async (id) => {
        try {
            const result = await axios.get(`${url}/categories/${id}`)

            return result.data.data;
        } catch (e) {
            console.error("categoriesService.getById : ", e);
            return [];
        }
    },
    updateById: async (newData) => {
        try {
            const result = await axios.put(`${url}/categories/${newData.id}`,
                newData
            )

            return result.data.data;
        } catch (e) {
            console.error("categoriesService.updateById : ", e);
            return [];
        }
    },
    deleteById: async (id) => {
        try {
            const result = await axios.delete(`${url}/categories/${id}`
            )

            return result.data.data;
        } catch (e) {
            console.error("categoriesService.deleteById : ", e);
            return [];
        }
    },
}