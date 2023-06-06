// Aqui é onde a gente vai fazer a implementação do nosso envio de email, "ses" já em produção
// Se eu quiser utilizar o envio do email novamente, eu posso sempre utilizar a implementação do EtherealMailProvider novamente e testar o envio do email.

import aws from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_SES_REGION,
            }),
        });
    }

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const temaplateHTML = templateParse(variables);

        await this.client.sendMail({
            to,
            from: "Rentx <joaoeudes91135538@gmail.com>",
            subject,
            html: temaplateHTML,
        });
    }
}

export { SESMailProvider };

// 1 - Essa configuração do "nodemailler" com o "sess" está toda na documentação, é só conferir e utilizar. na documentação do "nodemailler".
// 2 - A estrutura é bem parecida com a estrutura que a gente tinha dentro do nosso "ETHREAL" de teste, só vai mudar agora algumas crendenciais, e o retorno por exemplo.
// 3 -
