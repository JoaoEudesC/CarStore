

import "reflect-metadata"; // Importe a biblioteca antes de usar o tsyringe
import { container } from "tsyringe";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepositorys";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);




//Então com essa bibilioteca as implementações das instancias vão facilitar , porque não será preciso fazer na mão.(A gente consegue até registrar um singleton)