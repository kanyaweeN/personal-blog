import axios from "axios";

const url = "https://blog-post-project-api.vercel.app";

const PostService = {
    getAllPost: async (params) => {
        try {
            let query = "";
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
    },
}

export default PostService