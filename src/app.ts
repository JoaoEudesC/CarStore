//Importação do express
import express from "express"
const app = express()
app.use(express.json())
import 'reflect-metadata';

//Importação do dotEnv(Variaveis de ambiente)
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT



//Importação da ligação com o banco de dados
import { createConnection1 } from "./database/DataSource";
createConnection1()
.then(() =>{
  console.log("Banco de dados conectado")
})
.catch((error) =>{
  console.log("Falha na conexão" + error)
})

//Importação do conteiner da pasta shared
import "./shared/container"



//Utilização do swagger 
import swaggerUi from "swagger-ui-express"
import swaggerFile from "./swagger.json"  //Importação do arquivo json de documentação
app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(swaggerFile)) //Url de onde a nossa documentação vai ficar (Uma rota para documentação), o setup é o arquivo json, onde vai ficar toda a nossa documentação , onde vai ter as informações sobre nossa documentação





//routers
import { router } from "./routes"
app.use( router) //Essa criação de arquivo router diminuiu a quantidade de codigos e organizou






//Servidor onde a aplicação vai rodar
app.listen(PORT , () =>{
    console.log(`O servidor está rodando em http://localhost:${PORT}`)
})




