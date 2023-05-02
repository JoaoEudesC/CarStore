//Import de multer e upload
import multer from "multer"
import uploadConfig from "../config/upload"

//Importação de middlware
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


//Importação do router
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import {Router} from "express"
const usersRoutes = Router()

//Importação do controller
import { CreateUserController } from "../modules/accounts/useCases/createUser/createUserController"


//Controllers
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController()





//Rotas

//Criação da rota de post de usuários
usersRoutes.post("/" , createUserController.handle);



//Criação de rota para upload de avatar
const uploadAvatar =   multer(uploadConfig.upload("./tmp/avatar")) //Isto vai fazer com que essas informações sejam redirecionadas para a pasta avatr criada dentro de "tmp", dentro do upload.single, eu passei o nome do arquivo.
usersRoutes.patch("/avatar" , ensureAuthenticated,   uploadAvatar.single("avatar")   , updateUserAvatarController.handle)

//Nessa rota acima, nós vamos utilizar o patch, porque justamente nós queremos, fazer uma pequena alteração que é justamente o nosso upload de "avatar", que até então foi passado nulo na criação de usuário "ou foi passado lá".
//Eu preciso passar o meu middleware de validação , porque o usuário para autenticar o avatar terá que ser autenticado, ou seja , ter um cadastro, porque na criação nao vai ser preciso passar o avatar, mas depois de autenticado voce pode dar um uploada nesse avatar, que vai ser nulo quando voce cria.






export {usersRoutes}