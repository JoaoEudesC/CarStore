//Estou passando a utilizar a bibilioteca "tsyring, para a implementação das classes", para facilitar a escrita do código.
import { AppError } from "../../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
    name:string;
    description:string
}

@injectable()
class CreateSpecificationUseCase{
    constructor(
        @inject("SpecificationsRepository")
        private specicationsRepository : ISpecificationsRepository
        ){}
    async execute({name , description}:IRequest):Promise<void>{
        const specicationsRepositoryAlreadyExists = await this.specicationsRepository.findByName(name)

        if(specicationsRepositoryAlreadyExists){
            throw new AppError ("Specification already exists")
        }
        await this.specicationsRepository.create({
            name,
            description
        });
    }
}

export {CreateSpecificationUseCase}