import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";

//Este Arquivo vai servir para que eu consiga colocar todas as rotas aqui e diminuir o codigo lá server.ts , uma forma de organização



const router = Router()



router.use("/categories" , categoriesRoutes)
router.use("/specifications" , specificationRoutes )



export {router}
