import { verify, sign } from "jsonwebtoken";
import { inject } from "tsyringe";

import auth from "../../../../config/auth";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
    sub: string;
    email: string;
}

class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private userTokensRepository: IUsersTokensRepository,

        @inject("dateProvider")
        private dateProvider: DayjsDateProvider
    ) {}

    async execute(token: string) {
        const decode = verify(token, auth.secret_refresh_token) as IPayload; // Com isso ele vai fazer a verificação do nosso refreshToken baseado nessa nossa chave.
        const user_id = decode.sub; // Eu poderia ter criado uma interface Payload e passaod a variavel sub:string e tipado o decode com ela mas assim tambem serve.

        const userToken =
            await this.userTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh token does not exist!"); // Se não tiver nenhum registro, seignifica que esse token não existe mais na nossa base de dados.
        }

        await this.userTokensRepository.deleteById(userToken.id); // Se o nosso token ele existir, sempre que a gente da um refresh token a gente tem que ignorar aquele que ecistia para não ficar uma fila na nossa base de dados

        const refresh_token = sign(
            { email: decode.email },
            auth.secret_refresh_token,
            {
                subject: decode.sub,
                expiresIn: auth.expires_in_refresh_token,
            }
        );

        const expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        await this.userTokensRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        return refresh_token;
    }
}

export { RefreshTokenUseCase };

// 1 - Nós temos que passar duas informações para a função verify , o token que a gente ta recebendo e em seguida temos que receber o "secretKey" que a gente definiu lá no auth.
// 2 - A gente vai precisar verificar o user.id que a gente tira de dentro do token, assim como fizemos com o "token" normal , o nosso user.id ta dentro do nosso sbject, isso é basicamente fazer um decode.
// 3 - Nós vamos utilizar a mesma estratégia feita com o primeiro token, nós vamos utilizar o id extraido do token do usuário, que está dentro do meu subject tanto na criação do token normal como na criação do refresh_token.
// 4 - É preciso verificar no banco de dados se esse refresh_token existe para poder realizar as operações.
// 5 -
