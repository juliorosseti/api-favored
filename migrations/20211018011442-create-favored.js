"use strict";

const { allowedBankAccountTypes } = require("../src/useCases/Bank/utils");
const { allowedStatusFavored } = require("../src/useCases/Favored/utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface
      .createTable("favoreds", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        uuid: {
          type: Sequelize.STRING(36),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING(11),
        },
        cnpj: {
          type: Sequelize.STRING(14),
        },
        status: {
          type: Sequelize.ENUM({
            values: Object.keys(allowedStatusFavored),
          }),
        },
        bankCompe: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        bankAgency: {
          type: Sequelize.STRING(10),
        },
        bankAgencyDigit: {
          type: Sequelize.STRING(1),
        },
        bankAccountType: {
          type: Sequelize.ENUM({
            values: Object.keys(allowedBankAccountTypes),
          }),
        },
        bankAccountNumber: {
          type: Sequelize.STRING(10),
        },
        bankAccountDigit: {
          type: Sequelize.STRING(1),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addIndex("favoreds", [
          "name",
          "cpf",
          "cnpj",
          "bankAgency",
          "bankAccountNumber",
        ])
      );
  },

  down: async (queryInterface) => await queryInterface.dropTable("favoreds"),
};
