"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaOtherBanks = exports.validateSchemaBancoDoBrasilBank = exports.validateIfExistsBankAccountType = exports.validateIfExistsBankCompe = exports.validateIfExistsStatus = exports.validateLengthCpfOrCnpj = exports.validateRequiredCpfOrCnpj = exports.validateRequiredFields = exports.separator = void 0;
const common_1 = require("../Bank/common");
const utils_1 = require("../Bank/utils");
const utils_2 = require("./utils");
const BancoDoBrasilBank_1 = require("../Bank/Validation/BancoDoBrasilBank");
const OtherBank_1 = require("../Bank/Validation/OtherBank");
const separator = '\n- ';
exports.separator = separator;
const validateRequiredFields = (name, email, bankCompe) => {
    const favored = {
        name, email, bankCompe
    };
    const required = {
        name: 'Nome',
        email: 'E-mail',
        bankCompe: 'Código do banco',
    };
    let errors = Object.keys(required).map(key => {
        if (!favored[key])
            return required[key];
        return false;
    }).filter(Boolean);
    if (errors.length > 0) {
        const fields = errors.join(separator);
        throw new Error(`Campos obrigatórios: ${separator}${fields}`);
    }
};
exports.validateRequiredFields = validateRequiredFields;
const validateRequiredCpfOrCnpj = (cpf, cnpj) => {
    if (!cpf && !cnpj) {
        throw new Error(`Campos obrigatórios: ${separator}CPF ou CNPJ`);
    }
};
exports.validateRequiredCpfOrCnpj = validateRequiredCpfOrCnpj;
const validLength = (length, field, fieldName) => {
    if (field) {
        if (field.toString().length !== length) {
            throw new Error(`Campo '${fieldName}' inválido`);
        }
    }
};
const validateLengthCpfOrCnpj = (cpf, cnpj) => {
    try {
        validLength(11, cpf, 'CPF');
        validLength(14, cnpj, 'CNPJ');
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.validateLengthCpfOrCnpj = validateLengthCpfOrCnpj;
const validateIfExistsStatus = (status) => {
    if (status) {
        if (!utils_2.allowedStatusFavored[status]) {
            throw new Error(`Campo 'Status' inválido`);
        }
    }
};
exports.validateIfExistsStatus = validateIfExistsStatus;
const validateIfExistsBankCompe = (bankCompe) => {
    const Bank = (0, common_1.getBankByCompe)(bankCompe);
    if (Bank.length === 0) {
        throw new Error(`Campo 'Código do banco' inválido`);
    }
};
exports.validateIfExistsBankCompe = validateIfExistsBankCompe;
const validateIfExistsBankAccountType = (type) => {
    if (!utils_1.allowedBankAccountTypes[type]) {
        throw new Error(`Campo 'Tipo de conta' inválido`);
    }
};
exports.validateIfExistsBankAccountType = validateIfExistsBankAccountType;
const validateSchemaBancoDoBrasilBank = (data) => {
    if (data.bankCompe != '001')
        return;
    try {
        new BancoDoBrasilBank_1.BancoDoBrasilBank(data);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.validateSchemaBancoDoBrasilBank = validateSchemaBancoDoBrasilBank;
const validateSchemaOtherBanks = (data) => {
    if (data.bankCompe == '001')
        return;
    try {
        new OtherBank_1.OtherBank(data);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.validateSchemaOtherBanks = validateSchemaOtherBanks;
