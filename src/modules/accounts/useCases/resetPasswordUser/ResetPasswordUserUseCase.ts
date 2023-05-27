import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider,

        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        // Verificar se o token existe!!
        if (!userToken) {
            throw new AppError("Token invalid!");
        }

        // Verificar se o token está expirado ou não!! => // Essa função vai verificar o nosso token de alterar senha está expirado comparando duas datas, comparado a data atual , com a data que o token foi gerado "a data atual é o end_date".
        if (
            this.dateProvider.compareIfBefore(
                userToken.expires_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppError("Token expired!");
        }

        // Encontrar o token pelo id do usuário
        const user = await this.usersRepository.findById(userToken.user_id);

        // Criar a nova senha hasheada
        user.password = await hash(password, 8);

        // Criar o update do usuário com a nova senha
        await this.usersRepository.create(user);

        // Apagar o token após o usuário ter utilizado ele
        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
