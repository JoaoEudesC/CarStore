import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    id: string;
    user_id: string;
}
@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("CarsRepository")
        private CarsRepository: ICarsRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider // Aqui nós vamos utilizar o provider de data igual nós utilizamos no createRental, por isso nós criamos um conteiner provider e não diretamente no arquivo createRentals, porque nós iriamos utilizar em outros arquivos tambem como esse agora de devolução.
    ) {}

    async execute({ id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id); // Verificando pelo o id do carro se existe um aluguel, se não existir um aluguel, o carro não pode ser devolvido.
        const car = await this.CarsRepository.findById(rental?.car_id ?? ""); // Tive que fazer essa verificação devido as tipagens do typescript, porque o rental.car_id pode ser undefined e eu defini como string
        const minimum_daily = 1;

        if (!rental) {
            throw new AppError("Rental does not exists");
        }
        // Verificar o tempo de aluguel porque se o carro for devolvido com menos de 24 horas será cobrada a diária do mesmo jeito. (Regra de negócio).
        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow() // Quantas diárias o nosso aluguel tem.
        );

        if (daily <= 0) {
            daily = minimum_daily; // Se o dia de uso for menor ou igual ao zero , o daily vai ser igual a "1 diária". pq o minimo é 24 horas vai ser cobrada uma diária na mesma.
        }

        // Calculando a quantidade de atrasos para a aplicação da multa , para realizar o calculo a multa (a quantidade de dias de atraso x o fine_amount para esse carro) a multa é diferente para cada carro.
        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date // Comparação dos dias para ver se houve atraso na entrega ou não
        );
        // Ou seja, se teve atraso
        let total = 0; // Inicializa a multa em zero
        if (delay > 0) {
            const calculate_fine =
                delay * (car?.fine_amount !== undefined ? car.fine_amount : 0); // Por conta da tipagem do javascript tive que colocar essa verificação(se o fineAmount for diferente de undefined ele vai retornar o car.fine_amount, caso o contrário ele retorna o numero 0).
            total = calculate_fine;
            // Aqui acima é os dias de atraso * a multa (delay * fine_amount).
        }
        total += daily * (car?.daily_rate !== undefined ? car.daily_rate : 0); // Aqui a gente está a acarescendo no valor total o valor da nossa diária + total para colocar a multa já junto do valor a pagar no total

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        if (car !== undefined) {
            await this.CarsRepository.updateAvailable(car.id, true); // Mais uma vez tive que realizar essa verificação devido as tipagens do typescript
        }
        return rental;
    }
}

export { DevolutionRentalUseCase };

// 1 - Aqui seria o caso de uso somente da devolução do carro,
// 2 - Nós vamos utilizar a bibilioteca Dayjs, para datas igual nós utilizamos no "CreateRental" com a mesma lógica para comparar a hora atual com a hora de entrega do carro "expected_return_date".
// 3 - Aqui a gente não vai fazer a comparação mais em horas, nós vamos fazer a comparação em dias diferente do "Create Rental".
// 4 - Nós precisamos saber quantas diárias teve o nosso aluguel(data do aluguel e a data da entrega) = total de diárias.
// 5 - Verificar se teve multa (Data de atual + Data do expected return ), para saber em qual dia foi devolvido se aplica a multa ou não.
// 6 - OBS => Se você for precisar alterar uma váriavel, deixar essa váriavel de forma dinámica utilize sempre o "let" pq ele poderá ser alterada mais a frente como é o caso do "total".
// 7 - a lógica é um pouco complexa, deve se ler mais de uma vez para entender.
// 8 -  total += daily * (car?.daily_rate !== undefined ? car.daily_rate : 0);  => total = total + daily * car.daily_rate;
