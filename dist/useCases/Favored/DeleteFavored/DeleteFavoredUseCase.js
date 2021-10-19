"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFavoredUseCase = void 0;
// import { IDeleteFavoredRequestDTO } from "./IDeleteFavoredRequestDTO"
class DeleteFavoredUseCase {
    constructor(favoredRepository) {
        this.favoredRepository = favoredRepository;
    }
    async execute(uuid) {
        return await this.favoredRepository.delete(uuid);
    }
}
exports.DeleteFavoredUseCase = DeleteFavoredUseCase;
