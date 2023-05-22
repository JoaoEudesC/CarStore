import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;
        // Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }
        // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user!");
        }

        const dateNow = this.dateProvider.dateNow();
        // O aluguel deve ter duração minima de 24 horas.
        const compare = this.dateProvider.compareInHours(
            dateNow, // Pegando a hora de agora atual e dizeendo que essa hora não deve ser menor que 24 horas , cada aluguel deve durar no minimo 24horas caso contrário vai ocasionar erro
            expected_return_date
        );

        if (compare < minimumHour) {
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false); // Aqui eu estou chamando a função que vai dar um update no available car, que recebe como parametro o "id" do carro, e um booleano no campo "avaialble".
        return rental;
    }
}

export { CreateRentalUseCase };

// 1 - A gente aqui vai ter que colocar a regra para quando um carro for alugado, ou seja, passar o id do carro e o expected_return_date  o status deste carro vai ser mudado para "unavailable" por isso nós tivemos que receber o "inject" do carsRepository aqui.
// 2 - A gente vai no nosso "ICarsRepository" e vamos colocar um campo como "update available" para que a gente não precise fazer d duas buscas no "findById".
// 3 -
