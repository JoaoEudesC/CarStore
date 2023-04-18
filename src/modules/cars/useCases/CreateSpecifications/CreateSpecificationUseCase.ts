//Perceba que eu criei um service somente para a categoria, para  a tabela de criaçaõ de categoria, aonde o req e res serão enviados para fazer a listagem de usuários , o findByname , a post de categorias , serão feitos todos aqui e a rota so vai receber a execução feita
 //Ou seja , esse metodo execute, que vai estar em cada service de cada tabela, ele vai ser responsave por executar aquilo que por exemplo, precisa ser feito na criação de usuário, como o findByName


import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
    name:string;
    description:string
}


class CreateSpecificationUseCase{
    constructor(private specicationsRepository : ISpecificationsRepository){}
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