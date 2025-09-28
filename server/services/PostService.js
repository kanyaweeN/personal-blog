import { PostRepository } from "../repositories/PostRepository.js";

export const PostService = {
    async createPost(postData) {
        const dataWithTimestamp = { ...postData, created_at: new Date() };
        return await PostRepository.createPost(dataWithTimestamp);
    },
    async getAll(param) {
        return await PostRepository.getAll(param);
    },
    async getById(id) {
        return await PostRepository.getById(id);
    },
    async updateById(postData) {
        const dataWithTimestamp = { ...postData, created_at: new Date() };
        return await PostRepository.updateById(dataWithTimestamp);
    },
    async deleteById(id) {
        return await PostRepository.deleteById(id);
    },
}