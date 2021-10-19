import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('api_test', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

export default sequelize;

export {
    sequelize,
    DataTypes
};