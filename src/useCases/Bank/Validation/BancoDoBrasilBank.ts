import { IBankSchema, IBankValidation } from "./IBank";

export class BancoDoBrasilBank implements IBankValidation {
    constructor(props: IBankSchema) {
        this.makeValidation(props)
    }

    makeValidation(props: IBankSchema) {
        try {
            this.agencyIsValid(props.bankAgency);
            this.agencyDigitIsValid(props.bankAgencyDigit);
            this.accountIsValid(props.bankAccountNumber);
            this.accountDigitIsValid(props.bankAccountDigit);
            this.accountTypeIsValid(props.bankAccountType);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // maxLength: 4, required: true
    agencyIsValid(bankAgency: string): void {
        if (!/^(?:^0*)[1-9][0-9]{0,3}$/.test(bankAgency)) {
            throw new Error("Campo 'agência' inválido");
        }
    }

    // maxLength: 1, required: false
    agencyDigitIsValid(bankAgencyDigit: string): void {
        if (!/^[xX0-9]{0,1}$/.test(bankAgencyDigit)) {
            throw new Error("Campo 'Dígito da agência' inválido");
        }
    }

    // maxLength: 8, required: true
    accountIsValid(bankAccountNumber: string): void {
        if (!/^(?:^0*)[1-9][0-9]{0,7}$/.test(bankAccountNumber)) {
            throw new Error("Campo 'Conta corrente' inválido");
        }
    }

    // maxLength: 1, required: true
    accountDigitIsValid(bankAccountDigit: string): void {
        if (!/^[xX0-9]{0,1}$/.test(bankAccountDigit)) {
            throw new Error("Campo 'Dígito da conta corrente' inválido");
        }
    }

    accountTypeIsValid(bankAccountType: string): void {
        if (!['CONTA_CORRENTE', 'CONTA_POUPANCA', 'CONTA_FACIL'].includes(bankAccountType)) {
            throw new Error("Campo 'Tipo da conta' inválido");
        }
    }
}