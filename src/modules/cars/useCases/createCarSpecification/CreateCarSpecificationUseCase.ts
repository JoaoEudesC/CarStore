import { ICarsRepository } from "../../../../modules/cars/repositories/ICarsRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest{
    car_id: string;
    specifications_id: string[];
}



@injectable()
class CreateCarSpecificationUseCase{

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationsRepository") //Repare que aqui eu tive que utilizar 2 inject, pq eu estou trabalhando com "many to many" injetando duas chaves estrangeiras, uma de uma tabela e outra de outra tabela(essa tabela esta recebendo duas chaves estrangeiras, de duas tabelas diferentes)
        private specificationsRepository: ISpecificationsRepository
    ){}

    async execute({car_id, specifications_id}:IRequest):Promise<Car>{
        const carExists =  await this.carsRepository.findById(car_id)

        if(!carExists){
            throw new AppError("Car does not exists!")
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );

        carExists.specifications = specifications;

        await this.carsRepository.create(carExists)

        return carExists;
    
    }
}

export {CreateCarSpecificationUseCase}





// OBS => quando estiver realizando um teste, nunca utilize o inject e injectable , só após passar o teste,e que for fazer de fato a implementação para o banco e ativar a funcionalidade é que se usa.