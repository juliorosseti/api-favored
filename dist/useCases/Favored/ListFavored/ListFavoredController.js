"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFavoredController = void 0;
class ListFavoredController {
    constructor(listFavoredUseCase) {
        this.listFavoredUseCase = listFavoredUseCase;
    }
    async handle(request, response) {
        try {
            request;
            const page = request.query.page ? parseInt(request.query.page) : 1;
            const limit = 10;
            const offset = 0 + (page - 1) * limit;
            const search = request.query.search ? request.query.search : "";
            const orderBy = request.query.orderBy ? request.query.orderBy : "ASC";
            const orderByKey = request.query.orderByKey ? request.query.orderByKey : "name";
            await this.listFavoredUseCase.execute({
                limit,
                offset,
                search,
                orderBy,
                orderByKey
            }).then(result => {
                return response.status(201).json(result);
            });
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Ocorreu um erro interno'
            });
        }
    }
}
exports.ListFavoredController = ListFavoredController;
