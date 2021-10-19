"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherBank = void 0;
class OtherBank {
    constructor(props) {
        this.makeValidation(props);
    }
    makeValidation(props) {
        try {
            this.agencyIsValid(props.bankAgency);
            this.agencyDigitIsValid(props.bankAgencyDigit);
            this.accountIsValid(props.bankAccountNumber);
            this.accountDigitIsValid(props.bankAccountDigit);
            this.accountTypeIsValid(props.bankAccountType);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    // maxLength: 4, required: true
    agencyIsValid(bankAgency) {
        if (!/^(?:^0*)[1-9][0-9]{0,3}$/.test(bankAgency)) {
            throw new Error("Campo 'agência' inválido");
        }
    }
    // maxLength: 1, required: false
    agencyDigitIsValid(bankAgencyDigit) {
        if (!/^[xX0-9]{0,1}$/.test(bankAgencyDigit)) {
            throw new Error("Campo 'Dígito da agência' inválido");
        }
    }
    // maxLength: 11, required: true
    accountIsValid(bankAccountNumber) {
        if (!/^(?:^0*)[1-9][0-9]{0,10}$/.test(bankAccountNumber)) {
            throw new Error("Campo 'Conta corrente' inválido");
        }
    }
    // maxLength: 11, required: true
    accountDigitIsValid(bankAccountDigit) {
        if (!/^[0-9]{0,1}$/.test(bankAccountDigit)) {
            throw new Error("Campo 'Dígito da conta corrente' inválido");
        }
    }
    accountTypeIsValid(bankAccountType) {
        if (!['CONTA_CORRENTE', 'CONTA_POUPANCA'].includes(bankAccountType)) {
            throw new Error("Campo 'Tipo da conta' inválido");
        }
    }
}
exports.OtherBank = OtherBank;
