import { IFavoredRepository } from "../../../repositories/IFavoredRepository"
import { IUpdateFavoredRequestDTO } from "./IUpdateFavoredRequestDTO"

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

export class UpdateFavoredUseCase {
    constructor(
        private favoredRepository: IFavoredRepository
    ) { }

    async execute(uuid: string, data: IUpdateFavoredRequestDTO): Promise<IUpdateFavoredRequestDTO> {
        const favored = await this.favoredRepository.findByUuid(uuid);

        if (!favored) {
            throw new Error("UUID do Favorecido não existe");
        }

        const newFavored = { ...favored, ...this.getDataUpdate(favored.status, data) };

        try {
            this.makeValidate(favored.status, newFavored);
        } catch (error) {
            throw new Error(error.message);
        }

        return await this.favoredRepository.update(uuid, newFavored);
    }

    makeValidate(status: string, favored: IUpdateFavoredRequestDTO): void {
        try {
            if (status == 'valid') this.makeValidateByStatusValid(favored);
            if (status == 'draft') this.makeValidateByStatusDraft(favored);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    makeValidateByStatusValid(favored: IUpdateFavoredRequestDTO): void {
        if (!favored.email) {
            throw new Error(`Campos obrigatórios: E-mail`);
        }
    }

    makeValidateByStatusDraft(favored: IUpdateFavoredRequestDTO): void {
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
    }

    getDataUpdate(status: string, data: IUpdateFavoredRequestDTO) {
        if (status == 'valid') return this.getAllowedDataUpdateByStatusValid(data.uuid, data.email);
        if (status == 'draft') return this.getAllowedDataUpdateByStatusDraft(data);
    }

    getAllowedDataUpdateByStatusValid(uuid: string, email: string) {
        return { uuid, email }
    }

    getAllowedDataUpdateByStatusDraft(data: IUpdateFavoredRequestDTO) {
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
        }
    }
}