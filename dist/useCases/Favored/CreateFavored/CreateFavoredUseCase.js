"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFavoredUseCase = void 0;
const Favored_1 = require("../../../entities/Favored");
const common_1 = require("../common");
class CreateFavoredUseCase {
    constructor(favoredRepository) {
        this.favoredRepository = favoredRepository;
    }
    async execute(data) {
        const favored = new Favored_1.Favored(data);
        try {
            this.makeValidate(favored);
        }
        catch (error) {
            throw new Error(error.message);
        }
        if (!favored.status) {
            favored.status = "draft";
        }
        return await this.favoredRepository.save(favored);
    }
    makeValidate(favored) {
        try {
            // Default rules
            (0, common_1.validateRequiredFields)(favored.name, favored.email, favored.bankCompe);
            (0, common_1.validateRequiredCpfOrCnpj)(favored.cpf, favored.cnpj);
            (0, common_1.validateLengthCpfOrCnpj)(favored.cpf, favored.cnpj);
            (0, common_1.validateIfExistsStatus)(favored.status);
            // Bank rules
            const bankSchema = {
                bankCompe: favored.bankCompe,
                bankAgency: favored.bankAgency,
                bankAgencyDigit: favored.bankAgencyDigit,
                bankAccountNumber: favored.bankAccountNumber,
                bankAccountType: favored.bankAccountType,
                bankAccountDigit: favored.bankAccountDigit,
            };
            (0, common_1.validateIfExistsBankCompe)(favored.bankCompe);
            (0, common_1.validateIfExistsBankAccountType)(favored.bankAccountType);
            (0, common_1.validateSchemaBancoDoBrasilBank)(bankSchema);
            (0, common_1.validateSchemaOtherBanks)(bankSchema);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.CreateFavoredUseCase = CreateFavoredUseCase;
