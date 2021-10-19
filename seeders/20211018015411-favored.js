"use strict";

const faker = require("faker");
const favoreds = [...Array(30)].map(() => {
  let cpf = faker.datatype.number({
    min: 11111111111,
    max: 99999999999,
  });
  let cnpj = null;

  if (faker.datatype.boolean()) {
    cpf = null;
    cnpj = faker.datatype.number({
      min: 11111111111111,
      max: 99999999999999,
    });
  }

  return {
    uuid: faker.datatype.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    cpf,
    cnpj,
    status: faker.helpers.randomize(["valid", "draft"]),
    bankCompe: faker.helpers.randomize(["237", "104", "756", "001"]),
    bankAgency: faker.datatype.number({
      min: 1111111111,
      max: 9999999999,
    }),
    bankAgencyDigit: faker.datatype.number(9),
    bankAccountType: faker.helpers.randomize([
      "CONTA_CORRENTE",
      "CONTA_POUPANCA",
      "CONTA_FACIL",
    ]),
    bankAccountNumber: faker.datatype.number({
      min: 1111111111,
      max: 9999999999,
    }),
    bankAccountDigit: faker.datatype.number(9),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
  };
});

module.exports = {
  up: async (queryInterface) =>
    await queryInterface.bulkInsert("favoreds", favoreds),

  down: async (queryInterface, Sequelize) =>
    await queryInterface.bulkDelete("favoreds", null, {}),
};
