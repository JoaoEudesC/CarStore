import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./refreshTokenUseCase";

class RefreshTokenController {
    async handle(req: Request, res: Response): Promise<Response> {
        const token =
            req.body.token || req.headers["x-access-token"] || req.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const refresh_token = await refreshTokenUseCase.execute(token);

        return res.json(refresh_token);
    }
}

export { RefreshTokenController };

// 1 -  Aqui neste arquivo a gente vai receber o nosso refresh token.

// 2 - Existem algumas formas que a gente pode receber o nosso token entre elas:

// - Quem fizer a solicitação na nossa requisição não vai passar o token no campo "auth" como a gente tem passado o outro token normal, nós vamos disponibilizar uma maneira de passar esse token pelo "body da requisição" ou pelo os "headers" ou até mesmo pelas querys.

// - A gente vai disponibilizar essas tres formas que a gente pode receber este nosso token.

// 3 - esse parametro "x-access-token" vem da própria documentação do jwt, que deve se utilizar esse parametro para utilizar o "headers".
