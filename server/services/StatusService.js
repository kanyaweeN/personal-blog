import { StatusRepository } from "../repositories/StatusRepository.js";

export const StatusService = {
    async getAll(param) {
        return await StatusRepository.getAll(param);
    },
}