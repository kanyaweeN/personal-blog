import { CategoriesRepository } from "../repositories/CategoriesRepository.js";

export const CategoriesService = {
    async create(param) {
        return await CategoriesRepository.create(param);
    },
    async getAll(param) {
        return await CategoriesRepository.getAll(param);
    },
    async getById(param) {
        return await CategoriesRepository.getById(param);
    },
    async updateById(param) {
        return await CategoriesRepository.updateById(param);
    },
    async deleteById(param) {
        return await CategoriesRepository.deleteById(param);
    },
}