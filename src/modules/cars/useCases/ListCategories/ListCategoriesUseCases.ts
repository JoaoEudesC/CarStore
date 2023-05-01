import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";




@injectable()
class ListCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository:ICategoriesRepository){}
    async execute():Promise <Category[]>{
            const categories = await this.categoriesRepository.list()
            return categories;
        }
}

//O corpo é igual o que mudou será o modo de executar a função que eu so quero retornar as categorias listadas


export {ListCategoryUseCase}