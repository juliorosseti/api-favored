"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTypes = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_1.DataTypes; } });
const sequelize = new sequelize_1.Sequelize('api_test', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});
exports.sequelize = sequelize;
exports.default = sequelize;
