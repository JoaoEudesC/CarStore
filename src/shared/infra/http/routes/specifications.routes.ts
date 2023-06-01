import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecifications/CreateSpecificationController";
import { specificationsCreateValidation } from "../../../../validations/SpecificationsValidations";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// Rota de criação de specificação
specificationRoutes.post(
    "/",
    specificationsCreateValidation,
    ensureAuthenticated,
    createSpecificationController.handle
);

export { specificationRoutes };
