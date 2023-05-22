import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUserRepository";

interface IRequest {
    user_id: string;
    avatar_File: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ user_id, avatar_File }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);
        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_File;

        await this.usersRepository.create(user);
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
