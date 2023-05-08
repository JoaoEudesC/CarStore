//Controllers, Middlewares , routes
import {Router} from "express"
import { CreateCarController } from "../../../../modules/cars/useCases/CreateCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";


//Criação de rotas
const carsRoutes = Router();

// instancia dos Controllers
const  createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController



//Rota de criação de carros
carsRoutes.post("/",ensureAuthenticated ,ensureAdmin,createCarController.handle )

//Rota para listar os carros disponiveis existentes
carsRoutes.get("/available" , listAvailableCarsController.handle)







export { carsRoutes}





// 1 - Perceba que nos routes nos sempre passamos só o "/" , pq a referencia da rota vai ser sempre passada no "index", ou seja se eu passasse alguma referencia aqui com "/games", eu teria que passar nas rotas "games" e mais o que tem no index..ts

// 2 - Igual quando chamamos o router no app.ts nos outros apps que criamos que só possui um "router" e lá nos passamos o app.use com o nome da rota principal que vai ser passada no arquivo , aqui é igual só que o arquivo de rotas está no index.ts.

// 3 - Aqui eu vou passar os dois "middlewares" na rota de criação do usuário que vai verificar se o usuário é um admin ou não e se ele está logado.

// 4 - Então agora para criar o carro , vai ser preciso passar o token que é gerado na rota de sessão(login), e se o usuário não for um admin, vai fornecer um erro. dizendo que ele não é admin

// 5 - A nossa regra de negocio diz que o usuárioso pode cadastrar carros se ele for um "admin"