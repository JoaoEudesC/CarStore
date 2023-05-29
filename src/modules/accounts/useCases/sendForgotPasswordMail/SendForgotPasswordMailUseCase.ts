import dotenv from "dotenv";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

dotenv.config();

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider,

        @inject("EtherealMailProviser")
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "forgotPassword.hbs"
        );

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3); // Aqui dentro dessa função implementada do meu provider eu coloco a quantidade de horas que vai expirar o token(Porque eu defini que eu quero em horas, vou adicionar tres horas a frente da hora atual).

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`, // Perceba que aqui temos uma outra maneira de utilizar o dotEnv, nós passamos o process.env diretammente no obejto sem armazenar em um objeto.
        };

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordMailUseCase };

// 1 - A gente faz a verificação se o usuário existe, se ele existir a gente vai gerar um token, só que a gente não quer que ele gere um número extenso como aquele token gigante

// 2 - Eu vou definir que o meu token vai ser um "uuid", mas eu poderia simplesmente utilizar o "crypto" para gerar um token , igual eu fiz no crm tera e defini um limite de expiração para este token.

// 3 - Então repare que se o usuário existir nós vamos gerar um novo token, através do usersTokensRepository, sendo que esse campo refreshToken vai ser um "uuidV4" diferente do caso de uso da geração do refresh token, que é realmente um token, que é gerada pela função "sign" do jwt.

// 4 - Vamos ter que criar uma data de expiração no nosso "dateProvider" para implemenatar, porque a gente quer que esse token seja expirado dentro de 3 horas.

// 5 - Chamei a função de enviar um email do meu mailProvider,e passei o "email" como o "to" o "subject" é a linha a seguir e o terceiro é o link, resumindo eu só tenho que passar o "subject" e o "body" porque eu não passei na minha função como definido.

// 6 - Depois nós temos que criar as nossas "variables", que serão passadas para p handleBars, que a gente colocou entre as {{}} que é o name e o link.

// 7 -
