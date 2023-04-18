//Repare que as tipagens da bibilioteca e o ts-node-dev , são baixadas como dependencias de desenvolvimento(-D OU --save-dev)
//Então no package json elas ficam no dev-dependencies ao invés de ficar diretamente no dependencies

import app from "./app"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT























app.listen(PORT , () =>{
    console.log(`O servidor está rodando em http://localhost:${PORT}`)
})


