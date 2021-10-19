"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFavoredUseCase = void 0;
const common_1 = require("../common");
class UpdateFavoredUseCase {
    constructor(favoredRepository) {
        this.favoredRepository = favoredRepository;
    }
    async execute(uuid, data) {
        const favored = await this.favoredRepository.findByUuid(uuid);
        if (!favored) {
            throw new Error("UUID do Favorecido não existe");
        }
        const newFavored = { ...favored, ...this.getDataUpdate(favored.status, data) };
        try {
            this.makeValidate(favored.status, newFavored);
        }
        catch (error) {
            throw new Error(error.message);
        }
        return await this.favoredRepository.update(uuid, newFavored);
    }
    makeValidate(status, favored) {
        try {
            if (status == 'valid')
                this.makeValidateByStatusValid(favored);
            if (status == 'draft')
                this.makeValidateByStatusDraft(favored);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    makeValidateByStatusValid(favored) {
        if (!favored.email) {
            throw new Error(`Campos obrigatórios: E-mail`);
        }
    }
    makeValidateByStatusDraft(favored) {
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
    getDataUpdate(status, data) {
        if (status == 'valid')
            return this.getAllowedDataUpdateByStatusValid(data.uuid, data.email);
        if (status == 'draft')
            return this.getAllowedDataUpdateByStatusDraft(data);
    }
    getAllowedDataUpdateByStatusValid(uuid, email) {
        return { uuid, email };
    }
    getAllowedDataUpdateByStatusDraft(data) {
        return {
            uuid: data.uuid,
            name: data.name,
            email: data.email,
            cnpj: data.cnpj,
            status: data.status,
            bankCompe: data.bankCompe,
            bankAgency: data.bankAgency,
            bankAgencyDigit: data.bankAgencyDigit,
            bankAccountType: data.bankAccountType,
            bankAccountNumber: data.bankAccountNumber,
            bankAccountDigit: data.bankAccountDigit,
        };
    }
}
exports.UpdateFavoredUseCase = UpdateFavoredUseCase;
