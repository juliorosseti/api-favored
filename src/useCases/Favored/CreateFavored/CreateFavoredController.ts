import { Request, Response } from "express"
import { CreateFavoredUseCase } from "./CreateFavoredUseCase";
import { ICreateFavoredRequestDTO } from "./ICreateFavoredRequestDTO"

export class CreateFavoredController {

    constructor(
        private createFavoredUseCase: CreateFavoredUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const {
                name,
                email,
                cpf,
                cnpj,
                status,
                bankCompe,
                bankAgency,
                bankAgencyDigit,
                bankAccountType,
                bankAccountNumber,
                bankAccountDigit,
            }: ICreateFavoredRequestDTO = request.body;

            const result = await this.createFavoredUseCase.execute({
                name,
                email,
                cpf,
                cnpj,
                status,
                bankCompe,
                bankAgency,
                bankAgencyDigit,
                bankAccountType,
                bankAccountNumber,
                bankAccountDigit,
            });

            return response.status(201).json(result);
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Ocorreu um erro interno'
            });
        }

    }
}