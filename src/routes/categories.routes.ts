//Importação de modulos e tipagens
import { Router } from "express";
const categoriesRoutes = Router()
import { Request , Response } from "express-serve-static-core";
import { CategoriesRepository } from "../repositories/CategoriesRepositorys";
import { CreateCategoryService } from "../services/CreateCategoryService";




//Aqui é onde entra a parte mais importante que é a interface, onde a gente vai tipar quais propriedades essa categoria pode possuir , ou seja, de tal forma que eu não posso, passar qualquer nome , como o title ali , tem que ser so  o que eu defini




const categoriesRepository  = new CategoriesRepository()  //Uma boa convenção que é bom adotar quando for chamar uma classe é , a variavel que for igualar ao new, ser com a letra minuscula , enquanto a classe dever ser com letra maiuscula


//Rota para cadastrar nova categoria!!!

categoriesRoutes.post("/" , (req:Request , res:Response) =>{
    const {name , description} = req.body;
    const createCategoryService = new CreateCategoryService(categoriesRepository)
    createCategoryService.execute({name:name , description:description});
    return res.status(201).send()   
    
    //Aqui eu substrair tudo, e deixei na rota somenete a função de cadstrar uma nova categoria vindo da pasta repositories.
    //E aqui nesta camada eu já estou utilizando o service , que eu exportei e criei a new one , para o cadastro de categorias, e a função para verificar se a categoria ja foi cadastrada duas vezes tbm está no service de createUser, tudo que diz respeito a criação do usuário está lá
    
})

//Essa função de verificar se o nome já existe foi feita no repositories da categoria, onde possui acesso ao banco de dados, foi criado uma função para achar o nome no banco e a validação foi feita aqui





//Rota para listar as categorias presentes na tabela
categoriesRoutes.get("/" , (req:Request , res:Response) =>{
    const categoriesList = categoriesRepository.list()
    return res.status(200).json({
        message:"Categorias localizadas",
        category:categoriesList
    })
})

//Perceba que aqui a gente vai utilizar o principio da responsabilidade única , criando um service para fazer o req e res , deixando o as rotas com sua unica função, de passar as rotas









//A utilização do uuid para a geração de id está cada vez mais comum atualmente, principalmente na clean architeture, porque é de melhor prática deixar a geração do id por conta da aplicação e não necessariamente por conta de serviçoes externos como o nosso banco de dados
//A nossa rota ela não precisa conhecer o nosso modelo , ela tem que ser totalmente idependente
export {categoriesRoutes}



//Aqui a gente vai criar uma função que não vai permitir que a gente cadastre a mesma categoria mais de uma vez, se eu tivesse trabalhando com banco de dados , eu poderia facilmente fazer isso através de um middleware














