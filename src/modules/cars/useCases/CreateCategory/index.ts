//Este arquivo vai ser responsável por instaciar o nosso "Repositories de Categoria", O nosso "O nosso UseServices De categoria" para ser repassado para o router através do controller.

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepositorys";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


export default ():CreateCategoryController =>{
        const categoriesRepository = new CategoriesRepository();

        const createCategoryUseCase =  new CreateCategoryUseCase(categoriesRepository)

        const createCategoryController = new CreateCategoryController(createCategoryUseCase);

        return createCategoryController;




}




//A gente teve que passar o categoriesRepository dentro do CreateCategoryUseCase , pq se voce reparar nos arquivos está exatamente assim, a gente recebe o "categoriesRepository", dentro do constructor do  "createCategoryUseCase"
//Este é basicamente um arquivo que vai fazer um intermedio com o controller , porque , agora eu passo para dentro de uma variave controller , com o meu newController , o meu UseCase ,    que possui o "repositories" dentro dele , e vai ser colocado tudo dentro do controller e ser transmitido para a rota