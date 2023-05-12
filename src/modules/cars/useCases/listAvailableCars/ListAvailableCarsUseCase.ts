import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            brand,
            category_id,
            name
        );

        return cars;
    }
}

export { ListAvailableCarsUseCase };

// 1 - se eu enviar a requisição sem enviar um query , ele vai listar todos os carros que estão como "available" = true, porém se eu colocar um nome , uma marca um id no query como name  e value, ele vai me retornar somente esses especificados.

// 2 -
