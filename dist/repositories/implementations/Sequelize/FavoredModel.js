"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize_1 = require("../../../schemas/implementations/Sequelize");
exports.default = Sequelize_1.sequelize.define("favored", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize_1.DataTypes.INTEGER
    },
    uuid: Sequelize_1.DataTypes.STRING,
    name: Sequelize_1.DataTypes.STRING,
    email: Sequelize_1.DataTypes.STRING,
    cpf: Sequelize_1.DataTypes.STRING,
    cnpj: Sequelize_1.DataTypes.STRING,
    status: Sequelize_1.DataTypes.STRING,
    bankCompe: Sequelize_1.DataTypes.STRING,
    bankAgency: Sequelize_1.DataTypes.STRING,
    bankAgencyDigit: Sequelize_1.DataTypes.STRING,
    bankAccountType: Sequelize_1.DataTypes.STRING,
    bankAccountNumber: Sequelize_1.DataTypes.STRING,
    bankAccountDigit: Sequelize_1.DataTypes.STRING,
});
