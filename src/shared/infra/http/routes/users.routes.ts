import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

// Criação da rota de post de usuários
usersRoutes.post("/", createUserController.handle);

// Criação de rota para upload de avatar
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar")); // Isto vai fazer com que essas informações sejam redirecionadas para a pasta avatr criada dentro de "tmp", dentro do upload.single, eu passei o nome do arquivo.
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes };
