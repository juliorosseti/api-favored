"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFavoredController = void 0;
class DeleteFavoredController {
    constructor(deleteFavoredUseCase) {
        this.deleteFavoredUseCase = deleteFavoredUseCase;
    }
    async handle(request, response) {
        try {
            let uuid = request.body.uuid;
            if (typeof uuid == "string") {
                uuid = [request.body.uuid];
            }
            await this.deleteFavoredUseCase.execute(uuid).then(() => {
                return response.status(204).send();
            });
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Ocorreu um erro interno'
            });
        }
    }
}
exports.DeleteFavoredController = DeleteFavoredController;
