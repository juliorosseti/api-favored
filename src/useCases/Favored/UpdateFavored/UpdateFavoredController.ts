import { Request, Response } from "express"
import { UpdateFavoredUseCase } from "./UpdateFavoredUseCase";

export class UpdateFavoredController {

    constructor(
        private updateFavoredUseCase: UpdateFavoredUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {

        try {
            await this.updateFavoredUseCase.execute(request.params.uuid, request.body).then(() => {
                return response.status(204);
            });
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Ocorreu um erro interno'
            });
        }

    }
}