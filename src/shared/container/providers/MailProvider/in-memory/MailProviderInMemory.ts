import { IMailProvider } from "../IMailProvider";

class MailproviderInMemory implements IMailProvider {
    private message: any[] = [];

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        this.message.push({
            to,
            subject,
            variables,
            path,
        });
    }
}

export { MailproviderInMemory };

// 1 - Essa nossa função não vai ter funcionalidade nenhuma porque eu não vou enviar um email a partir dela, é como se fosse dados mocados

// 2 - Portnato o retorno da função pode ser um console.log, ou associar ela a variável private message

// 3 -
