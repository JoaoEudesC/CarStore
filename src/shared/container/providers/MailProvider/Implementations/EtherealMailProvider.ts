import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProviser implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });

                this.client = transporter;
            })
            .catch((err) => console.error(err));
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

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br",
            subject,
            html: temaplateHTML,
        });
        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", message.getTestMessageUrl(message));
    }
}

export { EtherealMailProviser };

// 1 - Nós vamos basicamente seguir a documentação, nós vamos criar o nodemailler, e criar o account que é que vai gerar pra uma conta para passar todas as informações

// 2 - Nós Criamos um transporter com o nodemailler assim como fizemos no outro projeto, porém de uma forma um pouco diferente pq estamos utilizando constructor e class e estamos utilizando a bibilioteca "Ethereal" para realizar o envio de emails.

// 3 - Perceba que a lógica de enviar o email é a mesma e a construção tambem , muda só um pouco o código, devido ao uso da bibilioteca e está sendo usado o class , mas a contrução do "nodemailler" é igual.

// 4 - Nós ultimos dois consoles.log ele vai enviar o 'id da mensagem' e uma "url" onde a gente vai poder ver e acessar o que está sendo enviado no teste.

// 5 - Fiz algumas alterações para que seja possível enviar o nosso "html" como o email, utilizando o "fs" fileSystem nativo do node.

// 6 -
