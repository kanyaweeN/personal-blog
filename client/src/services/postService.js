import axios from "axios";

const url = "http://localhost:4000";

export const PostService = {
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
    }, getPostById: async (id) => {
        try {
            const result = await axios.get(`${url}/posts/${id}`,
            )
            return result.data.data;
        } catch (e) {
            console.error("PostService.getPostById : ", e);
            return [];
        }
    }, getPostBykeyword: async (keyword) => {
        try {
            const result = await axios.get(`${url}/posts/?keyword=${keyword}`,
            )
            return result.data;
        } catch (e) {
            console.error("PostService.getPostBykeyword : ", e);
            return [];
        }
    }, likePost: async (postId) => {
        try {
            console.log("likePost", postId);

            const result = await axios.patch(`${url}/posts/${postId}/like`);
            return result.data;
        } catch (e) {
            console.error("PostService.likePost:", e);
            throw e;
        }
    },
}