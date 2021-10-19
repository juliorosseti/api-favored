import { Router } from "express"

import { createFavoredController } from "./useCases/Favored/CreateFavored"
import { listFavoredController } from "./useCases/Favored/ListFavored"
import { updateFavoredController } from "./useCases/Favored/UpdateFavored"
import { deleteFavoredController } from "./useCases/Favored/DeleteFavored"

const router = Router()

router.post("/favoreds", (req, res) => createFavoredController.handle(req, res))
router.get("/favoreds", (req, res) => listFavoredController.handle(req, res))
router.put("/favoreds/:uuid", (req, res) => updateFavoredController.handle(req, res))
router.delete("/favoreds/", (req, res) => deleteFavoredController.handle(req, res))

export { router }