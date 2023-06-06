import dotenv from "dotenv";
import { container } from "tsyringe";

import { IMailProvider } from "../IMailProvider";
import { EtherealMailProviser } from "./EtherealMailProvider";
import { SESMailProvider } from "./SESMailProvider";

dotenv.config();
const mail = process.env.MAIL_PROVIDER as "ethereal" | "ses";

const mailProvider = {
    ethereal: container.resolve(EtherealMailProviser),
    ses: container.resolve(SESMailProvider),
};

// Provider de teste de envio de email
container.registerInstance<IMailProvider>("MailProvider", mailProvider[mail]);

// Provider de envio de email em produção

// 1 - Aqui neste caso eu não pude utilizar o singleton, tive que utilizar o instaceOf, pq a gente precisa que isso seja gerado antes do client antes da nossa app ser inicializada, se colocasse singlton ele dava erro.

// 2 - A gente vai precisar colocar uma estrutura parecida mais ou menos com  a que a gente utilizou no nosso "diskStorage" para as váriavies de ambiente

// 3 - Ou seja  a gente vai ter a opção de criar como "ethereal" e vamos ter a opção de criar como "sess" por enquanto, igual fizemos no "storage" a opção local e s3, para quando for testar local e quando for em produção, e aqui vai ser igual.

// 4 - Criei o "Container.resolve" para que o próprio resolve crie pra a gente a instancia de Ethereal para que eu não precise colocar o new EtherealMailProviser());

// 5 - Tive que fazer o container.resolve para os dois, porque como estou utilizando "instance" e não singleton quando eu chamar, tenho que passar o "new"

// 6 - Para testar o envio do email => A gente já tem uma função sendForgotEmail e devemos enviar novamente e ver se funciona
