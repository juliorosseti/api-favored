"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFavoredController = void 0;
class UpdateFavoredController {
    constructor(updateFavoredUseCase) {
        this.updateFavoredUseCase = updateFavoredUseCase;
    }
    async handle(request, response) {
        try {
            await this.updateFavoredUseCase.execute(request.params.uuid, request.body).then(() => {
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
exports.UpdateFavoredController = UpdateFavoredController;
