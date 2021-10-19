import { IFavoredRepository } from "../../../repositories/IFavoredRepository"
// import { IDeleteFavoredRequestDTO } from "./IDeleteFavoredRequestDTO"

export class DeleteFavoredUseCase {
    constructor(
        private favoredRepository: IFavoredRepository
    ) { }

    async execute(uuid: []) {
        return await this.favoredRepository.delete(uuid);
    }
}