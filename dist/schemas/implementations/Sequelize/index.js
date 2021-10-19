"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTypes = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_1.DataTypes; } });
const sequelize = new sequelize_1.Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT)
});
exports.sequelize = sequelize;
exports.default = sequelize;
