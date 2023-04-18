import { Router } from "express";
const specificationRoutes = Router()
import { Request , Response } from "express";
import { createSpecificationController } from "../modules/cars/useCases/CreateSpecifications";



//Perceba que até a estruturação para chamar a pasta é muito parecida, para montar o router
//O que será preciso para chamar as funções e executar na rota(São exatamente as pastas do Repository e a pasta do CreateSpecificationService) que são as unicas pastas que fazem interação com a rota



specificationRoutes.post("/" , (req:Request , res:Response) =>{
    createSpecificationController.handle(req , res)
    
})




export {specificationRoutes}