import { Request , Response } from "express";

import { ListCategoryUseCase } from "./ListCategoriesUseCases";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepositorys";

class ListCategoriesController{
    constructor(private listCategoryUseCase:ListCategoryUseCase){

    }

    handle(req:Request , res:Response){
        const all = this.listCategoryUseCase.execute()
        return res.status(200).json({
            message:"Categorias localizadas",
            data:all
            
        })
    }
}


export {ListCategoriesController}