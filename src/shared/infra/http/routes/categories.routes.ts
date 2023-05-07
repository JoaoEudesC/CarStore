//Importação de modulos e tipagens
import { ListCategoriesController } from "../../../../modules/cars/useCases/ListCategories/ListCategoriesController";
import { CreateCategoryController } from "../../../../modules/cars/useCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/importCategoryController";

//Utilização do router
import { Router } from "express";
const categoriesRoutes = Router()

//Configuração do multer
import multer from "multer"
const upload = multer({
    dest: "./tmp",
})

//Importação de middlewares
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";



//Criação dos controllers que serão passados nas rotas
const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()



//Rota para cadastrar nova categoria!!!
categoriesRoutes.post("/" ,ensureAuthenticated ,ensureAdmin ,createCategoryController.handle)


//Rota para listar as categorias presentes na tabela
categoriesRoutes.get("/" , listCategoriesController.handle )


//Rota que será testada o upload
categoriesRoutes.post("/import" ,ensureAuthenticated , ensureAdmin, upload.single("file"), importCategoryController.handle )








//Perceba que aqui a gente vai utilizar o principio da responsabilidade única , criando um service para fazer o req e res , deixando o as rotas com sua unica função, de passar as rotas









//A utilização do uuid para a geração de id está cada vez mais comum atualmente, principalmente na clean architeture, porque é de melhor prática deixar a geração do id por conta da aplicação e não necessariamente por conta de serviçoes externos como o nosso banco de dados
//A nossa rota ela não precisa conhecer o nosso modelo , ela tem que ser totalmente idependente
export {categoriesRoutes}



//Aqui a gente vai criar uma função que não vai permitir que a gente cadastre a mesma categoria mais de uma vez, se eu tivesse trabalhando com banco de dados , eu poderia facilmente fazer isso através de um middleware














