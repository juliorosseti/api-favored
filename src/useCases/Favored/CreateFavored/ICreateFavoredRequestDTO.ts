export interface ICreateFavoredRequestDTO {
    // Person
    uuid: string
    name: string
    email: string
    cpf: string
    cnpj: string
    status: string

    // Bank
    bankCompe: string
    bankAgency: string
    bankAgencyDigit: string
    bankAccountType: string
    bankAccountNumber: string
    bankAccountDigit: string

}