import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    retals: Rental[] = [];

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        return (
            this.retals.find(
                (rental) => rental.car_id === car_id && !rental.end_date
            ) || undefined
        );
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        return (
            this.retals.find(
                (rental) => rental.user_id === user_id && !rental.end_date
            ) || undefined
        );
    }
    async create({
        car_id,
        expected_return_date,
        user_id,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            expected_return_date,
            user_id,
            start_date: new Date(),
        });

        this.retals.push(rental);

        return rental;
    }
}

export { RentalsRepositoryInMemory };
