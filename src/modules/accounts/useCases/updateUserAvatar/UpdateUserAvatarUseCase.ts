//Aqui nessa rota nos vamos ter que utilizar o nosso middleware de autenticação, para permitir que somenete um usuário cadastrado possa realizar o upload desse avatar
//Então a gente só vai adicionar esse avatar na coluna de "users", ou seja, da essa possibilidade do usuário poder da upload de avatar , se o usuário ja for cadastrado.

import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { deleteFile } from "src/utils/file";

interface IRequest{
    user_id:string;
    avatar_File:string;
}

@injectable()
export class UpdateUserAvatarUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository:IUsersRepository
    ){}
    //Então aqui com esse código ele já vai  fazer a atualização do nosso avatar para o nosso banco de dados.
    async execute({user_id , avatar_File}:IRequest):Promise<void>{
        const user = await this.usersRepository.findById(user_id);
        //Antes da gente criar um avatar novo e subscrever a gente vai executar o delete
        if(user.avatar){
            await deleteFile(`./tmp/avatar/${user.avatar}`) //Temos que passar o caminho da pasta que ele vai verificar e realizar o delete.
            //Fiz essa trativa, porque se não houver avatar, não faz sentido ele passar por essa função.
        }

        user.avatar = avatar_File;

        await this.usersRepository.create(user)

    }
}












// ***  PASSOS PARA A CRIAÇÃO DESSA FUNÇÃO DE UPLOAD
// 1 -  Adicionar coluna avatr na tabela de users
// 2 -  Configuração upload multer
// 3 - Refatorar o usuário com coluna avatar
// 4 - Criar a regra de negocio do upload
// 5 - E criar o nosso controller
// 6 - Aqui a gente vai precisar receber basicamente duas informações, que é o id do usuário e o avatar.
// 7 - Nos já possuimos "rotas autenticadas", por isso aqui nos não vamos precisar verificar se o usuário existe e sim somenete fazer o upload de avatar.




//OBS => Repare que a estrutura é sempre a mesma, de todos o useCase a única coisa que vai mudar é a logica e o repositorio a ser usado.