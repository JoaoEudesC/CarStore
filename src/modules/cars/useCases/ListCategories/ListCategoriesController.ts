import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryUseCase } from "./ListCategoriesUseCases";

class ListCategoriesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listCategoryUseCase = container.resolve(ListCategoryUseCase);
        const all = await listCategoryUseCase.execute();
        return res.status(200).json({
            message: "Categorias localizadas",
            data: all,
        });
    }
}

export { ListCategoriesController };
