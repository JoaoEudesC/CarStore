import "reflect-metadata";
import "express-async-errors";
import dotenv from "dotenv";
import express, { Response, Request, NextFunction } from "express";
import "../../container";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import { createConnection1 } from "../database/DataSource";
import { router } from "./routes";

const app = express();
app.use(express.json());

createConnection1()
    .then(() => {
        console.log("Banco de dados conectado");
    })
    .catch((error) => {
        console.log(`Falha na conexão${error}`);
    });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    next();
    // Remova o next() daqui para corrigir a ordem de execução dos middlewares
    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
});

dotenv.config();

export { app };
