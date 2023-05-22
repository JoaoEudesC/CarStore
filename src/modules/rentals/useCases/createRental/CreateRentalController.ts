import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { expected_return_date, car_id } = req.body;
        const { id } = req.user;
        const createRentalUseCase = container.resolve(CreateRentalUseCase);
        const rental = await createRentalUseCase.execute({
            car_id,
            expected_return_date,
            user_id: id,
        });

        return res.status(201).json(rental);
    }
}

export { CreateRentalController };

// 1 - A Criação do controller é basicamente igual em todos os metodos, vai so  mudar um pouco a lógica de cada um , mas a estruturação é a mesma.
// 2 - Depois nós vamos ter que criar a injeção de dependencias como sempre através do "container" que vai ser criado.
// 3 - O usuário vai estar logado por isso nós vamos precisar que pegar o "id" do req.user , pq como o usuário vai estar logado ele vai ter que utilizar o "token" e nos vamos poder pegar esse token do usuário
