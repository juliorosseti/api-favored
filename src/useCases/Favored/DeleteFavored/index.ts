import { SequelizeFavoredRepository } from "../../../repositories/implementations/Sequelize/FavoredRepository";
import { DeleteFavoredUseCase } from "./DeleteFavoredUseCase";
import { DeleteFavoredController } from "./DeleteFavoredController";

const sequelizeFavoredRepository = new SequelizeFavoredRepository();

const deleteFavoredUseCase = new DeleteFavoredUseCase(
    sequelizeFavoredRepository
);

const deleteFavoredController = new DeleteFavoredController(
    deleteFavoredUseCase
);

export {
    deleteFavoredUseCase,
    deleteFavoredController
}