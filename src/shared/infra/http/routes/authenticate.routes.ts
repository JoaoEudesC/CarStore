// Importação de controller
import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

// Importação do router
const authenticateRoutes = Router();

// Nova instacia do controller
const authenticateUserController = new AuthenticateUserController();

// Criação da rota de autenticidade
authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
