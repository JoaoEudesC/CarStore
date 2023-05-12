// Então repare que a gent mudou o nome de service para useCase
// Aqui nos vamos criar O nosso controller, justamente para diminuir ainda mais a resposabilidade do router , e deixar o codigo mais limpo, deixar somente o essencial lá
// Perceba que no useaCase , utiliza o metodo "execute", já no  service ou useCases , utiliza o metodo "handle" para lidar com tudo isso.(Isso é uma convenção)

import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description } = req.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        await createCategoryUseCase.execute({
            name,
            description,
        });
        return res.status(201).send();
    }
}

export { CreateCategoryController };
