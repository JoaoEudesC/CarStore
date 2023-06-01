// Middleware de autenticação de usuário

import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"; // Vamos utilizar essa função para verificar o nosso token.

import auth from "../../../../config/auth";
import { AppError } from "../../../errors/AppError";

dotenv.config();

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401); // Caso o token não tenha sido passado
    }
    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, auth.secret_token);

        if (typeof user_id !== "string") {
            throw new Error("Invalid user id"); // Aqui precisei fazer uma verificação primeiro, para dizer que o tipo, do user_id não pode vir undefined, se vier , vai da erro(se não o typescript reclama, pq eu tipei como string e ele pode retornar undefined)
        }

        next();
    } catch (error) {
        throw new AppError("Invalid Token", 401);
    }
}

// Aqui os middlewares são feitos em forma de função, para serem passados nas rotas em seguida.

// Passos -*********
// 1 - O nosso token ele vem "bearer - akskjskjkasjksjkajs" so que eu so quero pegar o token , por isso eu utilizo esse método split, pq a posição 0 do array o nome "bearer", e a posição "1" , é o token , então estou dizen para ele colocar o valor daposição 1 (token), dentro da minha variavel "token"
// 2 - Basicamente essa estrutura jwt, segue a mesma estrutura utilizada no projeto com javascript puro.
// 3 -  Se der sucesso a gente vai precisar as informações que estão contidas dentro desse token.
// 4 - passei esse "sub" porque quando eu dei um console.log(decoded) , eu peguei as informações que o token , ta trazendo , e o "sub" tava intitulado como o "id" do usuário, porque quando eu fiz o "sign" para gerar o token , eu mandei ele gerar(O tempo de expiração,o id do usuário como subject.)
// 5 - A gente precisa verificar se esse usuário de fato existe no nosso banco de dados.(Por isso eu tenho que chamar o repositório de usuários)pq o repositório que está em contato com o banco de dados, e utilizar o findeById, vamos ter que criar ele.
// 6 - Eu tenho que gerar o refresh_token baseado nele mesmo ou seja, eu pego o refresh_token gerado que eu utilizei para acessar alguma rota e passo novamente , na rota refresh_token, gerando um novo token com base naquele.
// 7 - E se eu gerar um novo a partir desse , se eu passar o antigo novamente ele não deve existir na minha base de dados porque eu já gerei um novo no lugar dele.
