import { Request, Response } from "express"
import { ListFavoredUseCase } from "./ListFavoredUseCase";

export class ListFavoredController {

    constructor(
        private listFavoredUseCase: ListFavoredUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {

            request;

            const page: number = request.query.page ? parseInt(request.query.page as string) : 1;
            const limit: number = 10;
            const offset: number = 0 + (page - 1) * limit;
            const search: string = request.query.search ? request.query.search as string : "";
            const orderBy: string = request.query.orderBy ? request.query.orderBy as string : "ASC";
            const orderByKey: string = request.query.orderByKey ? request.query.orderByKey as string : "name";

            await this.listFavoredUseCase.execute({
                limit,
                offset,
                search,
                orderBy,
                orderByKey
            }).then(result => {
                return response.status(201).json(result);
            });
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Ocorreu um erro interno'
            });
        }

    }
}