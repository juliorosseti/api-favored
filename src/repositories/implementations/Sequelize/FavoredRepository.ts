import FavoredModel from "./FavoredModel";
import { Op } from "sequelize";
import { IFavoredRepository } from "../../IFavoredRepository";
import { Favored } from "../../../entities/Favored";
import { IListFavoredRequestDTO } from "../../../useCases/Favored/ListFavored/IListFavoredRequestDTO";

export class SequelizeFavoredRepository implements IFavoredRepository {
    async findByUuid(uuid: string): Promise<any> {
        const favored = await FavoredModel.findOne({
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

    async delete(uuid: []): Promise<void> {
        try {
            if (uuid.length == 0) {
                throw new Error("Referência de uuid não fornecida");
            }

            await FavoredModel.destroy({
                where: {
                    uuid
                }
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(uuid: string, favored: Favored): Promise<Favored> {
        try {
            if (!uuid) {
                throw new Error("Referência de uuid não fornecida");
            }

            await FavoredModel.update(favored, {
                where: {
                    uuid
                }
            });
        } catch (error) {
            throw new Error(error.message);
        }

        return favored;
    }

    async save(favored: Favored): Promise<Favored> {
        try {
            await FavoredModel.create(favored);
        } catch (error) {
            throw new Error(error.message);
        }

        return this.findByUuid(favored.uuid);
    }

    async index({ limit, offset, search, orderBy, orderByKey }: IListFavoredRequestDTO): Promise<any> {
        let where: object = {};
        let searchTrim = search.trim();

        if (searchTrim) {
            where = {
                [Op.or]: this.makeSearch(searchTrim)
            };
        }

        const order = this.makeOrder(orderByKey, orderBy);

        const result = await FavoredModel.findAndCountAll({
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
        }
    }

    makeSearch(search: string): Object {
        if (!search) return {};

        return this.getObjectSearchDefault(search).concat(
            this.getObjectSearchNumbers(search)
        )
    }

    getObjectSearchDefault(search: string): Array<Object> {
        return [{
            name: {
                [Op.like]: `%${search}%`
            },
        }]
    }

    getObjectSearchNumbers(search: string): Array<Object> {
        let searchOnlyNumbers: any = search.replace(/\D/g, '');
        if (!searchOnlyNumbers) return [];

        return [
            {
                cpf: {
                    [Op.like]: `%${searchOnlyNumbers}%`
                },
            },
            {
                cnpj: {
                    [Op.like]: `%${searchOnlyNumbers}%`
                },
            },
            {
                bankAgency: {
                    [Op.like]: `%${searchOnlyNumbers}%`
                },
            },
            {
                bankAccountNumber: {
                    [Op.like]: `%${searchOnlyNumbers}%`
                },
            }
        ]
    }

    makeOrder(orderByKey: string, orderBy: string): any[] {
        let permitted = ["DESC", "ASC"];
        let orderByUpper: string = orderBy.toLocaleUpperCase();

        if (!permitted.includes(orderByUpper)) {
            orderByUpper = "ASC";
        }

        if (!Object.keys(FavoredModel.rawAttributes).includes(orderByKey)) {
            orderByKey = "name";
        }

        return [
            [orderByKey, orderByUpper]
        ]
    }
}