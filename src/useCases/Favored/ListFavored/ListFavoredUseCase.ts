import { IFavoredRepository } from "../../../repositories/IFavoredRepository"
import { IListFavoredRequestDTO } from "./IListFavoredRequestDTO"

export class ListFavoredUseCase {
    constructor(
        private favoredRepository: IFavoredRepository
    ) { }

    async execute(data: IListFavoredRequestDTO) {
        const limit: number = data.limit;
        const offset: number = data.offset;
        const search: string = data.search;
        const orderBy: string = data.orderBy;
        const orderByKey: string = data.orderByKey;

        return await this.favoredRepository.index({
            limit,
            offset,
            search,
            orderBy,
            orderByKey
        });
    }
}