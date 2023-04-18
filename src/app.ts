import express from "express"
const app = express()
app.use(express.json())
import 'reflect-metadata';

import swaggerFile from "./swagger.json"  //Importação do arquivo json de documentação



//Utilização do swagger 
import swaggerUi from "swagger-ui-express"
app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup()) //Url de onde a nossa documentação vai ficar (Uma rota para documentação), o setup é o arquivo json, onde vai ficar toda a nossa documentação , onde vai ter as informações sobre nossa documentação


import { createConnection } from "./database/DataSource"
createConnection()
.then(() =>{
    console.log("Conexão feita com sucesso")
})
.catch(error => {
    console.log("Erro na sua requisição " + error)
})



import { router } from "./routes"
app.use( router) //Essa criação de arquivo router diminuiu a quantidade de codigos e organizou














export default app