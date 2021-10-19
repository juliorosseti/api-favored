import { allowedBankCompes } from "./utils";

const getBankByCompe = (compe) => {
    return allowedBankCompes.filter(val => val.compe == compe);
}

export { getBankByCompe }