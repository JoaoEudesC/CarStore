//Importação de modulos e tipagens
import { Request , Response } from "express-serve-static-core";
import  createCategoryController  from "../modules/cars/useCases/CreateCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";


//Utilização do router
import { Router } from "express";
const categoriesRoutes = Router()

//Configuração do multer
import multer from "multer"
const upload = multer({
    dest: "./tmp",
})

//const upload = multer({}) //Aqui dentro destas chaves a gente pode utilizar algumas configurações que vai fazer com que a gente consiga colocar o upload, para repassar para outras partes da aplicação, como a gente so quer ler o arquivo aqui,a gente deixa da forma da configuração acima.



//Rota para cadastrar nova categoria!!!
categoriesRoutes.post("/" , (req:Request , res:Response) =>{
    return createCategoryController().handle(req , res)
    //Agora a gente precisa receber o nosso controller aqui!!, A gente pode criar um arquivo dentro do nosso Usecases , na pasta especifica , um arquivo que vai estanciar o nosso "repositorie" , "O nosso useCase" para instaciar através do controller nas nossas rotas, através do arquivo index.
    //Em seguida temos que passar o handle dentro dele passando o nosso req e o nosso res
})






//Rota para listar as categorias presentes na tabela
categoriesRoutes.get("/" , (req:Request , res:Response) =>{
    return listCategoriesController.handle(req , res)
})


//Rota que será testada o upload
categoriesRoutes.post("/import" , upload.single("file") , (req , res) =>{
    return importCategoryController.handle(req , res)
})









//Perceba que aqui a gente vai utilizar o principio da responsabilidade única , criando um service para fazer o req e res , deixando o as rotas com sua unica função, de passar as rotas









//A utilização do uuid para a geração de id está cada vez mais comum atualmente, principalmente na clean architeture, porque é de melhor prática deixar a geração do id por conta da aplicação e não necessariamente por conta de serviçoes externos como o nosso banco de dados
//A nossa rota ela não precisa conhecer o nosso modelo , ela tem que ser totalmente idependente
export {categoriesRoutes}



//Aqui a gente vai criar uma função que não vai permitir que a gente cadastre a mesma categoria mais de uma vez, se eu tivesse trabalhando com banco de dados , eu poderia facilmente fazer isso através de um middleware














