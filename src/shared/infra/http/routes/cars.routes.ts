import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController(); // Repare que eu estou utilizando a rota de cars para passar a função da rota da tabela de "CreateCarSpecification" que é uma tabela que vai receber as chaves estrangeiras das tabelas "car" e "specifications", mas faz mais sentido, deixar essa rota no "router" de cars.
const uploadCarImagesController = new UploadCarImageController();

// Rota de criação de carros
carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

// Rota para listar os carros disponiveis existentes
carsRoutes.get("/available", listAvailableCarsController.handle);

// Rota para CreateCarSpecifications (Chaves estrangeiras das tabelas "cars" e "specifications")
carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

// Função de upload do nosso config
const uploadImageCar = multer(uploadConfig.upload("./tmp/cars"));

// Criação de post de imagens
carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    uploadImageCar.array("images"),
    uploadCarImagesController.handle
);

export { carsRoutes };
