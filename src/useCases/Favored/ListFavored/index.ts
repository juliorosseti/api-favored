import { SequelizeFavoredRepository } from "../../../repositories/implementations/Sequelize/FavoredRepository";
import { ListFavoredUseCase } from "./ListFavoredUseCase";
import { ListFavoredController } from "./ListFavoredController";

const sequelizeFavoredRepository = new SequelizeFavoredRepository();

const listFavoredUseCase = new ListFavoredUseCase(
    sequelizeFavoredRepository
);

const listFavoredController = new ListFavoredController(
    listFavoredUseCase
);

export {
    listFavoredUseCase,
    listFavoredController
}