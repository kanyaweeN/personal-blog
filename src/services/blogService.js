import axios from "axios";

const url = "https://blog-post-project-api.vercel.app";

const PostService = {
    getAllPost: async (str) => {
        try {
            console.log("str :", str);
            let query = "";
            if (str)
                query = str.trim() === "" ? "" : `?${str}`;
            const result = await axios.get(`${url}/posts${query}`)
            return result.data.posts;
        } catch (e) {
            console.error("PostService.getAllPost : ", e);
            return [];
        }
    },
}

export default PostService