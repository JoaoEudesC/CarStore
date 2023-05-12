// Importação do express
import "reflect-metadata";
import "express-async-errors";

// Importação do dotEnv(Variaveis de ambiente)
import dotenv from "dotenv";
import express, { Response, Request, NextFunction } from "express";
// Importação da ligação com o banco de dados
// Importação do conteiner da pasta shared
import "../../container";
// Utilização do swagger
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json"; // Url de onde a nossa documentação vai ficar (Uma rota para documentação), o setup é o arquivo json, onde vai ficar toda a nossa documentação , onde vai ter as informações sobre nossa documentação
// routers
import { AppError } from "../../errors/AppError";
import { createConnection1 } from "../database/DataSource";
import { router } from "./routes";

const app = express();
app.use(express.json());
dotenv.config();
const { PORT } = process.env;
createConnection1()
    .then(() => {
        console.log("Banco de dados conectado");
    })
    .catch((error) => {
        console.log(`Falha na conexão${error}`);
    }); // Importação do arquivo json de documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router); // Essa criação de arquivo router diminuiu a quantidade de codigos e organizou

// Importação de middleware de erro, para que nossa rota consiga retornar o nosso erro, quando cai nele
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Quando a gente ta trabalhando com middlewares de erro, o nosso erro , sempre tem que vir como parametro de erro
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    return res.status(500).json({
        status: "error",
        message: `Internal server errror - ${err.message}`, // Aqui nos aplicamos o nosso middleware de erro costumizado, se o erro não for do tipo AppError, ele vai retornar o status(500) com o status e a mensagem.
    });
    next();
});

// Servidor onde a aplicação vai rodar
app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});
