"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFavoredUseCase = void 0;
class ListFavoredUseCase {
    constructor(favoredRepository) {
        this.favoredRepository = favoredRepository;
    }
    async execute(data) {
        const limit = data.limit;
        const offset = data.offset;
        const search = data.search;
        const orderBy = data.orderBy;
        const orderByKey = data.orderByKey;
        return await this.favoredRepository.index({
            limit,
            offset,
            search,
            orderBy,
            orderByKey
        });
    }
}
exports.ListFavoredUseCase = ListFavoredUseCase;
