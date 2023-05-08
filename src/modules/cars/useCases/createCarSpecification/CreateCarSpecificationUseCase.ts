import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    car_id: string;
    specifications_id: string[];
}




class CreateCarSpecificationUseCase{

    constructor(
        //@inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({car_id, specifications_id}:IRequest):Promise<void>{
        const carExists =  await this.carsRepository.findById(car_id)

        if(!carExists){
            throw new AppError("Car does not exists!")
        }
    }
}

export {CreateCarSpecificationUseCase}





// OBS => quando estiver realizando um teste, nunca utilize o inject e injectable , só após passar o teste,e que for fazer de fato a implementação para o banco e ativar a funcionalidade é que se usa.