import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/createUserController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/seeProfile/profileUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { userCreateValidation } from "../../../../validations/UserValidations";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

// Criação da rota de post de usuários
usersRoutes.post("/", createUserController.handle);

// Criação de rota para upload de avatar
const uploadAvatar = multer(uploadConfig); // Isto vai fazer com que essas informações sejam redirecionadas para a pasta avatr criada dentro de "tmp", dentro do upload.single, eu passei o nome do arquivo.
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

// 1- Essa rota vai ser passado o token do usuário autenticado e ele vao retornar as informações deste usuário autenticado como o "id", "driver_license", "avatar " e etc
// 2 - Só que ele tambem ta retornando a senha hasheada do usuário e a gente não quer isso, é sensível e is admin tambem não deve retornar
// 3 - E a gente não ta retornando a url do avatar para o usuário acessar para ver o avatra dele , a a gente avi ter que criar isso.
// 4 - Conceito de Maper => "mapper" que é quando a gente não quer retornar para o usuário o  "objeto" completo, só algumas informações de forma melhorada, como é o caso da nossa rota profile em que a gente quer retornar uma "url" acessível e não quer retornar a senha hasheada do usuário quando a gent dar um "get" neste usuário.

export { usersRoutes };
