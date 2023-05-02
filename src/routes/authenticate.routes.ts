//Importação de controller
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

//Importação de middlewares
import {ensureAuthenticated} from "../middlewares/ensureAuthenticated"

//Importação do router
import { Router } from "express";
const authenticateRoutes = Router()

//Nova instacia do controller
const authenticateUserController = new AuthenticateUserController();


//Criação da rota de autenticidade
authenticateRoutes.post("/sessions" ,ensureAuthenticated   , authenticateUserController.handle);

















export {authenticateRoutes}