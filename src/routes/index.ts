import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

//Este Arquivo vai servir para que eu consiga colocar todas as rotas aqui e diminuir o codigo lá server.ts , uma forma de organização



const router = Router()
//Rota de categorias
router.use("/categories" , categoriesRoutes)

//Rota de specificação
router.use("/specifications" , specificationRoutes )

//Rota de users
router.use("/users" , usersRoutes)

//Rota de autenticação de usuário
router.use(authenticateRoutes) //Se eu passo a rota deste jeito , eu não preciso passar o "path", sendo assim , ele fica com o "/", que é o caminho principal quye eu defini na rota delet



export {router}
