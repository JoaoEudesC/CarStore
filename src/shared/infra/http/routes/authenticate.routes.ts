import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/refreshToken/refreshTokenController";

const authenticateRoutes = Router();

// Nova instacia do controller
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

// Criação da rota de autenticidade
authenticateRoutes.post("/sessions", authenticateUserController.handle);

// Criação de rota de autenticidade refresh Token
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };

// Para testar a rota de refresh-Token;

// 1 - Tenho que me autenticar primeiro na "session" onde ele vai gerar um token e um refresh_token
// 2 - Na resposta da requisição ele vai gerar como resposta o meu "Normal Token" e o meu "Refresh_token",
// 3 - Vou pegar o meu refresh_token, posspo passar em json "BODY" "token":{token} e ele tem que gerar um novo refresh token baseado nisso
// 4 - E eu posso pegar esse refresh token gerado apos eu ter realizado a rota "Refresh_token" a resposta dele e eu posso passar como token para criar um "specificação" por exemplo, tudo que precisava de autenticidade eu posso usar esse refresh_token.
// 5 - O Nosso middleware ele está só verificando o "Normal Token" por isso vamos ter que modificar o nosso midleware para verificar também o "Refresh_Token"
// 6 - então após gerar outro token se eu tentar fazer uma criação em uma rota privada com o token antigo que foi utilizado para gerar outro ele deve me fornecer um erro, de que o token não existe
