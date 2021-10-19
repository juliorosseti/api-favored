import { SequelizeFavoredRepository } from "../../../repositories/implementations/Sequelize/FavoredRepository";
import { UpdateFavoredUseCase } from "./UpdateFavoredUseCase";
import { UpdateFavoredController } from "./UpdateFavoredController";

const sequelizeFavoredRepository = new SequelizeFavoredRepository();

const updateFavoredUseCase = new UpdateFavoredUseCase(
    sequelizeFavoredRepository
);

const updateFavoredController = new UpdateFavoredController(
    updateFavoredUseCase
);

export {
    updateFavoredUseCase,
    updateFavoredController
}