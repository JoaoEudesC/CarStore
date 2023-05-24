import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string; // Estou criando essa interface para retornar somente o nome e o email , pq eu nao quero o retorno da senha(eu poderia colocar:user.email , user.name) mas assim fica mais sintatico, e passo essa interface como o retorno do "execute" Promise<IResponse>
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DateProvider")
        private dateProvider: DayjsDateProvider
    ) {}
    // se o email está correto
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        // Se a senha esta correta
        const passwordMatch = await compare(password, user.password); // Comparação da senha passada, com a senha registrada no banco de dados
        if (!passwordMatch) {
            throw new AppError("Email or password incorrect");
        }

        // Geração de token Normal e criação
        const token = sign({ user: user.name }, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token,
        });

        // Criação e implementação de REFRESH TOKEN (POSSO CRIAR O REFRESH TOKEN UTILIZANDO O JWT TAMBÉM).

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token,
        }); // Eu quero que o nosso sistema tenha uma chave para o nosso token e outra chave para o nosso Refresh_token, caso a gente queira fazer uma validação separada fica mais fácil.

        const refresh_token_expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            expires_date: refresh_token_expires_date, // Vamos utilizar o dayjs para fazer o calculo da quantidade de dias para dizer quando esse token vai ser expirado.(Vamos seguir a mesma lógica de utilizar o nosso provider também). que está com o nosso dayjs.
            refresh_token,
            user_id: user.id,
        });

        const tokenReturn: IResponse = {
            // Tive que tipar um IResponse, para poder passar as informações que eu quero retornar, então criei uma variavel e tipei com minha interface.
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refresh_token,
        };
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };

// O nosso metodo "execute" ele vai receber somente duas informações que é o email e a senha , é como se fosse um sitema de login

//* ***** O que precisamos fazer dentro deste authenticateUseCase function(Tem que seguir estes tres passos na ordem)
// 1 - Usuário existe

// 2 - Senha está correta(De acordo com o cadastro feito)

// 3 - Gerar o jwt

//* ***** Observações

// O jeito vai ser sempre o mesmo , de criar os outros useCases, ou seja , utilização do conteiner, criado no "shared",e criação , porem neste caso a gente ja tem a função que verifica se o usuário existe.
// Repare na utilização do "throw new error", ja que nos não possuimos o 'res' aqui , assim como nos fazemos na arquitetura "msc"
// Dentro do "bcrypt" nos vamos utilizar a função compare , para verificar a hash da senha que está no banco de dados , para comparar se o usuário passou a senha correta.
//
