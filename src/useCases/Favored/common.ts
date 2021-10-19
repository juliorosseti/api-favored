import { IBankSchema } from "../Bank/Validation/IBank";
import { getBankByCompe } from "../Bank/common";
import { allowedBankAccountTypes } from "../Bank/utils";
import { allowedStatusFavored } from "./utils";
import { BancoDoBrasilBank as validateBancoDoBrasilBank } from "../Bank/Validation/BancoDoBrasilBank";
import { OtherBank as validateOtherBanks } from "../Bank/Validation/OtherBank";

const separator: string = '\n- ';

const validateRequiredFields = (name: string, email: string, bankCompe: string): void => {
    const favored = {
        name, email, bankCompe
    };

    const required = {
        name: 'Nome',
        email: 'E-mail',
        bankCompe: 'Código do banco',
    };

    let errors = Object.keys(required).map(key => {
        if (!favored[key]) return required[key];
        return false;
    }).filter(Boolean)

    if (errors.length > 0) {
        const fields = errors.join(separator);
        throw new Error(`Campos obrigatórios: ${separator}${fields}`);
    }
}

const validateRequiredCpfOrCnpj = (cpf: string, cnpj: string): void => {
    if (!cpf && !cnpj) {
        throw new Error(`Campos obrigatórios: ${separator}CPF ou CNPJ`);
    }
};

const validLength = (length: number, field: string, fieldName: string): void => {
    if (field) {
        if (field.toString().length !== length) {
            throw new Error(`Campo '${fieldName}' inválido`);
        }
    }
}

const validateLengthCpfOrCnpj = (cpf: string, cnpj: string): void => {
    try {
        validLength(11, cpf, 'CPF');
        validLength(14, cnpj, 'CNPJ');
    } catch (error) {
        throw new Error(error.message);
    }
};

const validateIfExistsStatus = (status: string): void => {
    if (status) {
        if (!allowedStatusFavored[status]) {
            throw new Error(`Campo 'Status' inválido`);
        }
    }
};

const validateIfExistsBankCompe = (bankCompe: string): void => {
    const Bank = getBankByCompe(bankCompe);

    if (Bank.length === 0) {
        throw new Error(`Campo 'Código do banco' inválido`);
    }
};

const validateIfExistsBankAccountType = (type: string): void => {
    if (!allowedBankAccountTypes[type]) {
        throw new Error(`Campo 'Tipo de conta' inválido`);
    }
};

const validateSchemaBancoDoBrasilBank = (data: IBankSchema): void => {
    if (data.bankCompe != '001') return;

    try {
        new validateBancoDoBrasilBank(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

const validateSchemaOtherBanks = (data: IBankSchema): void => {
    if (data.bankCompe == '001') return;

    try {
        new validateOtherBanks(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export {
    separator,
    validateRequiredFields,
    validateRequiredCpfOrCnpj,
    validateLengthCpfOrCnpj,
    validateIfExistsStatus,
    validateIfExistsBankCompe,
    validateIfExistsBankAccountType,
    validateSchemaBancoDoBrasilBank,
    validateSchemaOtherBanks
};