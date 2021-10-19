"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFavoredController = void 0;
class CreateFavoredController {
    constructor(createFavoredUseCase) {
        this.createFavoredUseCase = createFavoredUseCase;
    }
    async handle(request, response) {
        try {
            const { name, email, cpf, cnpj, status, bankCompe, bankAgency, bankAgencyDigit, bankAccountType, bankAccountNumber, bankAccountDigit, } = request.body;
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
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Ocorreu um erro interno'
            });
        }
    }
}
exports.CreateFavoredController = CreateFavoredController;
