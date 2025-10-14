import { CommentRepository } from "../repositories/CommentRepository.js";

export const CommentService = {
    async create(newData) {
        const dataWithTimestamp = { ...newData, created_at: new Date() };
        return await CommentRepository.create(dataWithTimestamp);
    },
    async getAll(param) {
        return await CommentRepository.getAll(param);
    },
    async getByPostId(id) {
        return await CommentRepository.getByPostId(id);
    },
    async updateById(newData) {
        const dataWithTimestamp = { ...newData, created_at: new Date() };
        return await CommentRepository.updateById(dataWithTimestamp);
    },
    async deleteById(id) {
        return await CommentRepository.deleteById(id);
    },
}