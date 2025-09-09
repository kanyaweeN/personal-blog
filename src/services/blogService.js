import axios from "axios";

const url = "https://blog-post-project-api.vercel.app";

const PostService = {
    getAllPost: async (params) => {
        try {
            const result = await axios.get(`${url}/posts`,
                {
                    params: params
                }
            )
            return result.data;
        } catch (e) {
            console.error("PostService.getAllPost : ", e);
            return [];
        }
    }, getPostById: async (id) => {
        try {
            const result = await axios.get(`${url}/posts/${id}`,
            )
            return result.data;
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
    },
}

export default PostService