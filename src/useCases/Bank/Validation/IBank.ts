export interface IBankSchema {
    bankCompe: string,
    bankAgency: string,             // agency
    bankAgencyDigit: string         // agency.digit
    bankAccountNumber: string,      // account
    bankAccountType: string         // accountType
    bankAccountDigit: string        // account.digit
};

export interface IBankValidation {
    makeValidation(props: IBankSchema): void
    agencyIsValid(bankAgency: string): void
    agencyDigitIsValid(bankAgencyDigit: string): void
    accountIsValid(bankAccountNumber: string): void
    accountDigitIsValid(bankAccountDigit: string): void
    accountTypeIsValid(bankAccountDigit: string): void
}

