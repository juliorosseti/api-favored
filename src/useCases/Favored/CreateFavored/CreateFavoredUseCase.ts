import { Favored } from "../../../entities/Favored";
import { IFavoredRepository } from "../../../repositories/IFavoredRepository"
import { ICreateFavoredRequestDTO } from "./ICreateFavoredRequestDTO"

import {
    validateRequiredFields,
    validateRequiredCpfOrCnpj,
    validateLengthCpfOrCnpj,
    validateIfExistsStatus,
    validateIfExistsBankCompe,
    validateIfExistsBankAccountType,
    validateSchemaBancoDoBrasilBank,
    validateSchemaOtherBanks
} from "../common";

export class CreateFavoredUseCase {
    constructor(
        private favoredRepository: IFavoredRepository,
    ) { }

    async execute(data: ICreateFavoredRequestDTO): Promise<Favored> {
        const favored = new Favored(data);

        try {
            this.makeValidate(favored);
        } catch (error) {
            throw new Error(error.message);
        }

        if (!favored.status) {
            favored.status = "draft";
        }

        return await this.favoredRepository.save(favored);
    }

    makeValidate(favored: ICreateFavoredRequestDTO): void {
        try {

            // Default rules
            validateRequiredFields(favored.name, favored.email, favored.bankCompe)
            validateRequiredCpfOrCnpj(favored.cpf, favored.cnpj);
            validateLengthCpfOrCnpj(favored.cpf, favored.cnpj);
            validateIfExistsStatus(favored.status);

            // Bank rules
            const bankSchema = {
                bankCompe: favored.bankCompe,
                bankAgency: favored.bankAgency,
                bankAgencyDigit: favored.bankAgencyDigit,
                bankAccountNumber: favored.bankAccountNumber,
                bankAccountType: favored.bankAccountType,
                bankAccountDigit: favored.bankAccountDigit,
            };

            validateIfExistsBankCompe(favored.bankCompe);
            validateIfExistsBankAccountType(favored.bankAccountType);
            validateSchemaBancoDoBrasilBank(bankSchema);
            validateSchemaOtherBanks(bankSchema);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}