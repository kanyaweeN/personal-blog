import axios from "axios";

const url = "http://localhost:4000";

export const CommentService = {
    create: async (newData) => {
        try {
            const result = await axios.post(`${url}/comment/${newData.postId}`,
                newData
            )

            return result.data.data;
        } catch (e) {
            console.error("PostService.getAllPost : ", e);
            return [];
        }
    }, getByPostId: async (id) => {
        try {
            const result = await axios.get(`${url}/comment/${id}`,
            )
            return result.data.data;
        } catch (e) {
            console.error("PostService.getPostById : ", e);
            return [];
        }
    },
}