//Aqui vai fazer a ligação direta com a rota , para ser passado o nosso controller e o nosso useCase, para que ao fazer um upload de uma categoria , ela seja cadastrada no nosso banco de dados "ficticio"

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepositorys";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryUseCase } from "./importCategoryUseCase";


const categoriesRepository = null //  gente não pode esquecer que esste nosso "Repository" está como "pattern singleton" para que so tenha uma instancia
const importCategoryUseCase = null
const importCategoryController = null


//Como semrpe eu tenho que passar o UseCase dentro do controller , porque é exatamente assim, que está sendo feito no meu controller , eu estou recebendo o useCase e o seu"File" e passando dentro do meu controller

export {importCategoryController}