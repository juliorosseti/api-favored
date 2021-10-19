"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeFavoredRepository = void 0;
const FavoredModel_1 = __importDefault(require("./FavoredModel"));
const sequelize_1 = require("sequelize");
class SequelizeFavoredRepository {
    async findByUuid(uuid) {
        const favored = await FavoredModel_1.default.findOne({
            raw: true,
            where: {
                uuid
            },
            attributes: { exclude: ['id'] },
        });
        if (!favored) {
            return false;
        }
        return favored;
    }
    async delete(uuid) {
        try {
            if (uuid.length == 0) {
                throw new Error("Referência de uuid não fornecida");
            }
            await FavoredModel_1.default.destroy({
                where: {
                    uuid
                }
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async update(uuid, favored) {
        try {
            if (!uuid) {
                throw new Error("Referência de uuid não fornecida");
            }
            await FavoredModel_1.default.update(favored, {
                where: {
                    uuid
                }
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
        return favored;
    }
    async save(favored) {
        try {
            await FavoredModel_1.default.create(favored);
        }
        catch (error) {
            throw new Error(error.message);
        }
        return this.findByUuid(favored.uuid);
    }
    async index({ limit, offset, search, orderBy, orderByKey }) {
        let where = {};
        let searchTrim = search.trim();
        if (searchTrim) {
            where = {
                [sequelize_1.Op.or]: this.makeSearch(searchTrim)
            };
        }
        const order = this.makeOrder(orderByKey, orderBy);
        const result = await FavoredModel_1.default.findAndCountAll({
            offset: offset,
            limit: limit,
            order,
            where
        });
        return {
            paging: {
                limit,
                offset,
                total: result.count
            },
            results: result.rows
        };
    }
    makeSearch(search) {
        if (!search)
            return {};
        return this.getObjectSearchDefault(search).concat(this.getObjectSearchNumbers(search));
    }
    getObjectSearchDefault(search) {
        return [{
                name: {
                    [sequelize_1.Op.like]: `%${search}%`
                },
            }];
    }
    getObjectSearchNumbers(search) {
        let searchOnlyNumbers = search.replace(/\D/g, '');
        if (!searchOnlyNumbers)
            return [];
        return [
            {
                cpf: {
                    [sequelize_1.Op.like]: `%${searchOnlyNumbers}%`
                },
            },
            {
                cnpj: {
                    [sequelize_1.Op.like]: `%${searchOnlyNumbers}%`
                },
            },
            {
                bankAgency: {
                    [sequelize_1.Op.like]: `%${searchOnlyNumbers}%`
                },
            },
            {
                bankAccountNumber: {
                    [sequelize_1.Op.like]: `%${searchOnlyNumbers}%`
                },
            }
        ];
    }
    makeOrder(orderByKey, orderBy) {
        let permitted = ["DESC", "ASC"];
        let orderByUpper = orderBy.toLocaleUpperCase();
        if (!permitted.includes(orderByUpper)) {
            orderByUpper = "ASC";
        }
        if (!Object.keys(FavoredModel_1.default.rawAttributes).includes(orderByKey)) {
            orderByKey = "name";
        }
        return [
            [orderByKey, orderByUpper]
        ];
    }
}
exports.SequelizeFavoredRepository = SequelizeFavoredRepository;
