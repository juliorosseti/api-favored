"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankByCompe = void 0;
const utils_1 = require("./utils");
const getBankByCompe = (compe) => {
    return utils_1.allowedBankCompes.filter(val => val.compe == compe);
};
exports.getBankByCompe = getBankByCompe;
