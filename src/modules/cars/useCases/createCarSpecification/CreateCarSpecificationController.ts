import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
    async handle(req: Request, res: Response) {
        const createCarSpecificationUseCase = container.resolve(
            CreateCarSpecificationUseCase
        );
        const { id } = req.params;
        const { specifications_id } = req.body;

        const cars = await createCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id,
        });

        return res.json(cars);
    }
}

export { CreateCarSpecificationController };
