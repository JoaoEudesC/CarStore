//Estou passando a utilizar a bibilioteca "tsyring, para a implementação das classes", para facilitar a escrita do código.

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
            throw new Error ("Specification already exists")
        }
        await this.specicationsRepository.create({
            name,
            description
        });
    }
}

export {CreateSpecificationUseCase}