import { SequelizeFavoredRepository } from "../../../repositories/implementations/Sequelize/FavoredRepository";
import { CreateFavoredUseCase } from "./CreateFavoredUseCase";
import { CreateFavoredController } from "./CreateFavoredController";

const sequelizeFavoredRepository = new SequelizeFavoredRepository();

const createFavoredUseCase = new CreateFavoredUseCase(
    sequelizeFavoredRepository
);

const createFavoredController = new CreateFavoredController(
    createFavoredUseCase
);

export {
    createFavoredUseCase,
    createFavoredController
}