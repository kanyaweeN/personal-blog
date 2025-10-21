import { ProfileRepository } from "../repositories/ProfileRepository.js";

export const ProfileService = {
    async getAll() {
        return await ProfileRepository.getAll();
    },
    async getById(id) {
        return await ProfileRepository.getById(id);
    },
    async updateById(postData) {
        const dataWithTimestamp = { ...postData, created_at: new Date() };
        return await ProfileRepository.updateById(dataWithTimestamp);
    },
    async updatePassword(id, hashedPassword) {
        return await ProfileRepository.updatePassword(id, hashedPassword);
    },
}