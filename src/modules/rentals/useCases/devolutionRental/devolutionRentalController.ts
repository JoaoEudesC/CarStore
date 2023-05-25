import { Response, Request } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./devolutionRentalUseCase";

class DevolutionRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: user_id } = req.user; // Esse id está vindo do token do usuário logado, porque o req.user tem um id do token alocado a ele que foi definido, então ele vai checar o id do usuário através do token passado.
        const { id } = req.params;

        const devolutionRentalUseCase = container.resolve(
            DevolutionRentalUseCase
        );
        const rental = await devolutionRentalUseCase.execute({
            id,
            user_id,
        });
        return res.status(200).json(rental);
    }
}

export { DevolutionRentalController };
