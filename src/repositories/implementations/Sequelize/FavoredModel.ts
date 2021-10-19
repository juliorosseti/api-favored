import { sequelize, DataTypes } from "../../../schemas/implementations/Sequelize";

export default sequelize.define("favored", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    status: DataTypes.STRING,
    bankCompe: DataTypes.STRING,
    bankAgency: DataTypes.STRING,
    bankAgencyDigit: DataTypes.STRING,
    bankAccountType: DataTypes.STRING,
    bankAccountNumber: DataTypes.STRING,
    bankAccountDigit: DataTypes.STRING,
});