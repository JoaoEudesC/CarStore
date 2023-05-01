import { Router } from "express";
const specificationRoutes = Router()
import { CreateSpecificationController } from "../modules/cars/useCases/CreateSpecifications/CreateSpecificationController";



//Perceba que até a estruturação para chamar a pasta é muito parecida, para montar o router
//O que será preciso para chamar as funções e executar na rota(São exatamente as pastas do Repository e a pasta do CreateSpecificationService) que são as unicas pastas que fazem interação com a rota

const createSpecificationController = new CreateSpecificationController()

specificationRoutes.post("/" , createSpecificationController.handle )




export {specificationRoutes}