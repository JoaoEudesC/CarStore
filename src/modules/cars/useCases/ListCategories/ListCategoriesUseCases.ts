import { Category } from "../../model/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepositorys"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"




class ListCategoryUseCase{
    constructor(private categoriesRepository:CategoriesRepository){  //O tipo dele vai ser do tipo do meu repositorio, porém , eu to criando um novo constructor, utilizando a mesma tipagem, porém não utilizando a criação de um "new Repository"
    }
    execute():Category[]{
            const categories = this.categoriesRepository.list()
            return categories;
        }
}

//O corpo é igual o que mudou será o modo de executar a função que eu so quero retornar as categorias listadas


export {ListCategoryUseCase}