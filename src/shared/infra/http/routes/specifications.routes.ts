import { Router } from "express";
const specificationRoutes = Router()
import { CreateSpecificationController } from "../../../../modules/cars/useCases/CreateSpecifications/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";



//Perceba que até a estruturação para chamar a pasta é muito parecida, para montar o router
//O que será preciso para chamar as funções e executar na rota(São exatamente as pastas do Repository e a pasta do CreateSpecificationService) que são as unicas pastas que fazem interação com a rota

const createSpecificationController = new CreateSpecificationController()
specificationRoutes.post("/" ,ensureAuthenticated ,createSpecificationController.handle )




export {specificationRoutes}

//OBS => Se voce utilizar um "app.use(middleware)" esse middleware vai ser utilizado em todas as rotas , porém se voce usa por exemplo  specificationsRoutes.use(middleware) todas as rotas que vierem abaixo desse middleware serão executadas por ele , as que vierem acima dele não sofrerá efeitos.