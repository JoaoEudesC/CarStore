import { Car } from "../infra/typeorm/entities/Car";
import { Specification } from "../infra/typeorm/entities/Specifications";

interface ICreateCarDTO {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    specifications?: Specification[];
    id?: string;
}

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car | undefined>;
    findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>;
    findById(id: string): Promise<Car | undefined>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository, ICreateCarDTO };

// 1 - Coloquei o available como boolean , porque eu quero que quando o carro seja alugado ele fique como "falso" o carro não ta disponivel , porém quando o carro for devolvido quero que fique como "true" afirmando que o carro está disponível.
// 2 -
