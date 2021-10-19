import { uuid as randomId } from "uuidv4"

export class Favored {
    public readonly uuid: string

    // Person
    public name: string
    public email: string
    public cpf: string
    public cnpj: string
    public status: string

    // Bank
    public bankCompe: string
    public bankAgency: string
    public bankAgencyDigit: string
    public bankAccountType: string
    public bankAccountNumber: string
    public bankAccountDigit: string

    constructor(props: Omit<Favored, "uuid">, uuid?: string) {
        Object.assign(this, props)

        if (!uuid) {
            this.uuid = randomId()
        }
    }
}