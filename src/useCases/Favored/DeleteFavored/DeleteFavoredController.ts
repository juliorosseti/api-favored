import { Request, Response } from "express"
import { DeleteFavoredUseCase } from "./DeleteFavoredUseCase";

export class DeleteFavoredController {

    constructor(
        private deleteFavoredUseCase: DeleteFavoredUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let uuid = request.body.uuid;

            if (typeof uuid == "string") {
                uuid = [request.body.uuid];
            }

            await this.deleteFavoredUseCase.execute(uuid).then(() => {
                return response.status(204).send();
            });
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Ocorreu um erro interno'
            });
        }

    }
}