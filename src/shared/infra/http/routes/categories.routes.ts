import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { categoryCreateValidation } from "../../../../validations/CategoryCreateValidations";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

// Rota para cadastrar nova categoria!!!
categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);

// Rota para listar as categorias presentes na tabela
categoriesRoutes.get("/", listCategoriesController.handle);

// Rota que será testada o upload
categoriesRoutes.post(
    "/import",
    ensureAuthenticated,
    ensureAdmin,
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };
