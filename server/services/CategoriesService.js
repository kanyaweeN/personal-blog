import { CategoriesRepository } from "../repositories/CategoriesRepository.js";

export const CategoriesService = {
    async getAll(param) {
        return await CategoriesRepository.getAll(param);
    },
}