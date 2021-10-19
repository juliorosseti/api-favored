import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT)
});

export default sequelize;

export {
    sequelize,
    DataTypes
};