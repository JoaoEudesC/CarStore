import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { brand, name, category_id } = req.query;

        const listAvailableCarsUseCase = container.resolve(
            ListAvailableCarsUseCase
        );

        const cars = await listAvailableCarsUseCase.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string,
        });

        return res.status(200).json({
            message: "Carros localizado com sucesso",
            statusCode: 201,
            data: cars,
        });
    }
}

export { ListAvailableCarsController };

// 1 - Repare que a gente vai utilizar o req.query para passar os atributos como parametro para a pesquisa, pq a pesquisa não pode ser feita através do "body da requisição" não faz sentido

// 2 - Repare que  a gente utiliza op req.query pq a gente não quer que a busca seja obrigatória, por isso não utilizamos o "req.params" pq o parametro a gente passa direto na rota como o url e se torna obrigatório passar esse parametro.

// 3 - Aqui por conta do erro do typescript, como o req.query não é obrigatório passar , possa ser que venha indefinido, que vai contra o nosso tipo string e da erro , dessa forma temos que força-los a ser string

// 4 -
