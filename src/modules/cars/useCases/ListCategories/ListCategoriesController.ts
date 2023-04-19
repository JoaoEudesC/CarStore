import { Request , Response } from "express";

import { ListCategoryUseCase } from "./ListCategoriesUseCases";
import { container } from "tsyringe";


class ListCategoriesController{
    

    

    async handle(req:Request , res:Response):Promise<Response>{
        const listCategoryUseCase = container.resolve(ListCategoryUseCase)
        const all = await listCategoryUseCase.execute()
        return res.status(200).json({
            message:"Categorias localizadas",
            data:all
            
        })
    }
}


export {ListCategoriesController}