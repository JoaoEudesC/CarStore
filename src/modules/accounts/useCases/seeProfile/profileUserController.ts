import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./profileUserUseCase";

class ProfileUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;
        const profileUserUseCase = container.resolve(ProfileUserUseCase);

        const user = await profileUserUseCase.execute(id);
        return res.json(user);
    }
}

export { ProfileUserController };

// Repare que eu consigo sempre pegar o id do usuário utilizando o "req.user" que a gente definiu na pasta "types" que seria uma tipagem do express , para a gente pegar o id pelo token do usuário passado.
