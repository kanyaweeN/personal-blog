import axios from "axios";

// Prefer env; fallback to Vite proxy for dev
const url = import.meta.env.VITE_API_URL || "/api";

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
    }, updateById: async (id, formData) => {
        try {
            const result = await axios.put(
                `${url}/profile/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return result.data;
        } catch (e) {
            console.error("ProfileService.updateById : ", e);
            return []
        }
    },
    resetPassword: async (id, passwordData) => {
        try {
            const result = await axios.put(
                `${url}/profile/${id}/reset-password`,
                passwordData
            );
            return result.data;
        } catch (error) {
            throw error;
        }
    }
}
