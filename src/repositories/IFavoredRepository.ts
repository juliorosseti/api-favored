import { Favored } from "../entities/Favored";

interface ListFavored {
    limit: number;
    offset: number;
    search: string;
    orderBy: string;
    orderByKey: string;
};

export interface IFavoredRepository {
    findByUuid(uuid: string): Promise<Favored>
    update(uuid: string, favored: Favored): Promise<Favored>
    save(favored: Favored): Promise<Favored>
    index(params: ListFavored): Promise<any>
}