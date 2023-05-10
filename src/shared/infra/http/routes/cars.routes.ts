//Controllers, Middlewares , routes
import {Router} from "express"
import { CreateCarController } from "../../../../modules/cars/useCases/CreateCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import multer from "multer"
import uploadConfig from "../../../../config/upload"


//Criação de rotas
const carsRoutes = Router();

// instancia dos Controllers
const  createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController() //Repare que eu estou utilizando a rota de cars para passar a função da rota da tabela de "CreateCarSpecification" que é uma tabela que vai receber as chaves estrangeiras das tabelas "car" e "specifications", mas faz mais sentido, deixar essa rota no "router" de cars.
const uploadCarImagesController = new UploadCarImageController()



//Rota de criação de carros
carsRoutes.post("/",ensureAuthenticated ,ensureAdmin,createCarController.handle )

//Rota para listar os carros disponiveis existentes
carsRoutes.get("/available" , listAvailableCarsController.handle)

//Rota para CreateCarSpecifications (Chaves estrangeiras das tabelas "cars" e "specifications")
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)


// Função de upload do nosso config
const uploadImageCar =   multer(uploadConfig.upload("./tmp/cars"))


//Criação de post de imagens
carsRoutes.post("/images:/id" , ensureAuthenticated ,ensureAdmin , upload.array("images")    ,uploadCarImagesController.handle )


//Só quem vai poder realizar as atividades dessa rota é um usuário "admin" e autenticado

// COMO TESTAR ESSA ROTA

//1 - Criar uma sessão com as credenciais do admin

//2 - pegar o token gerado nessa sessão e passar 

//3 - A gente vai passar o "id" da criação de carro, na rota available a gente consegue pegar porque lista esse "id" lá.

//4 -  a gente vai passar no corpo um "specifications_id":[] esse id é gerado quando a gente cria uma specification, na rota de "createSpecifications"

//5 - Então essa rota ela vai servir para a gente adicionar uma especificação ao carro cadastrado, esse nosso carro vai receber a nossa especificação, que foi criada na rota specifications.

//6 - ele adiciona essa camada de specification a nossa tabela de "cars" entre aspas , o retorno dessa rota vai se retornar o carro que foi passado o id com o retorno da  nova especificação passado para ele.

//7 - Também posso salvar duas especificações ao mesmo tempo dentro desse array, por isso eu salvo como um array, para eu poder passar mais de uma especificação.

//8 - Posso adicionar quantas



export { carsRoutes}





// 1 - Perceba que nos routes nos sempre passamos só o "/" , pq a referencia da rota vai ser sempre passada no "index", ou seja se eu passasse alguma referencia aqui com "/games", eu teria que passar nas rotas "games" e mais o que tem no index..ts

// 2 - Igual quando chamamos o router no app.ts nos outros apps que criamos que só possui um "router" e lá nos passamos o app.use com o nome da rota principal que vai ser passada no arquivo , aqui é igual só que o arquivo de rotas está no index.ts.

// 3 - Aqui eu vou passar os dois "middlewares" na rota de criação do usuário que vai verificar se o usuário é um admin ou não e se ele está logado.

// 4 - Então agora para criar o carro , vai ser preciso passar o token que é gerado na rota de sessão(login), e se o usuário não for um admin, vai fornecer um erro. dizendo que ele não é admin

// 5 - A nossa regra de negocio diz que o usuárioso pode cadastrar carros se ele for um "admin"