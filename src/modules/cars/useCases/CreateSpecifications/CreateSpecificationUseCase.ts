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
    execute({name , description}:IRequest):void{
        const specicationsRepositoryAlreadyExists = this.specicationsRepository.findByName(name)

        if(specicationsRepositoryAlreadyExists){
            throw new Error ("Specification already exists")
        }
        this.specicationsRepository.create({
            name,
            description
        });
    }
}

export {CreateSpecificationUseCase}