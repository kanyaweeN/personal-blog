import axios from "axios";

const url = "http://localhost:4000";

export const PostService = {
    create: async (newData) => {
        try {
            const result = await axios.post(`${url}/posts`,
                newData
            )

            return result.data.data;
        } catch (e) {
            console.error("PostService.getAllPost : ", e);
            return [];
        }
    },
    getAllPost: async (params) => {
        try {
            const result = await axios.get(`${url}/posts`,
                {
                    params: params
                }
            )

            return result.data.data;
        } catch (e) {
            console.error("PostService.getAllPost : ", e);
            return [];
        }
    },
    getPostById: async (id) => {
        try {
            const result = await axios.get(`${url}/posts/${id}`)

            return result.data.data;
        } catch (e) {
            console.error("PostService.getPostById : ", e);
            return [];
        }
    },
    getPostBykeyword: async (keyword) => {
        try {
            const result = await axios.get(`${url}/posts/?keyword=${keyword}`,
            )
            return result.data;
        } catch (e) {
            console.error("PostService.getPostBykeyword : ", e);
            return [];
        }
    },
    updateById: async (newData) => {
        try {
            const result = await axios.put(`${url}/posts/${newData.id}`,
                newData
            )
            return result.data;
        } catch (e) {
            console.error("PostService.getPostBykeyword : ", e);
            return [];
        }
    },
    likePost: async (postId) => {
        try {
            const result = await axios.patch(`${url}/posts/${postId}/like`);
            return result.data;
        } catch (e) {
            console.error("PostService.likePost:", e);
            throw e;
        }
    },
    deleteById: async (postId) => {
        try {
            const result = await axios.delete(`${url}/posts/${postId}`);
            return result.data;
        } catch (e) {
            console.error("PostService.deletePost:", e);
            throw e;
        }
    },
}