import { jest } from "@jest/globals";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailproviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailproviderInMemory; // O meu MailProviderInMemory é como se fosse o repositório inMemory, que seria o meu "EthrealMailProvider" que vai ser igual o meu Repostório, mas como é provider eu não dou o nome de repositório, o mesmo vale para o "dateProvider", porém não teve necessidade de criar um "inMemory" para a inserção de datas.

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailproviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "BRC-2121",
            email: "joao@gmail.com",
            name: "joão",
            password: "1234",
        });
        await sendForgotPasswordMailUseCase.execute("joao@gmail.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("rafael@gmail.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to creat an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );
        await usersRepositoryInMemory.create({
            driver_license: "BBB-1223",
            email: "marcio@gmail.com",
            name: "marcio",
            password: "1234",
        });
        await sendForgotPasswordMailUseCase.execute("marcio@gmail.com");

        expect(generateTokenMail).toBeCalled();
    });
});

// 1 - O primeiro teste é enviar um email para o usuário e para isso é preciso ter um usuário criado, sendo assim teremos que utilizar o "usersRepositoryInMemory" com a função de create.

// 2 - Com o usuário criado a gente precisa testar de fato se a gente está conseguindo fazer o envio de email

// 3 - Como a gente não pode testar a funcionalidade da bibilioteca nodemailler e Etherium nós vamos utilizar o metodo "spy" nativo do jest

// 4 - esse método do jest fica espiando uma classe para observar "se determinado metodo daquela class foi chamado" ou não e o teste é baseado encima disso.

// 5 - spyOn => o primeira parametro é "a classe que a gente quer que seja espiada", o segundo parametro é o metodo que a gente quer que seja observado dentro dessa classe, que neste caso é o parametro "sendMail"

// 6 - Então eu estou dizendo que eu espero que o nossa função "sendMail", toHaveBeenCalled();seja chamada.

// 7 - posso testar testes especificos sem ter que testar todos os testes de uma só vez => "npm test src/modules/accounts/sendForgotPasswordMail/sendForgot.spec.ts" , posso navegar até um determinado teste e executalo.

// 8 - Ele a primeiro passo vai dar erro porque eu tenho que chamar essa função no test, ele espera que a função seja chamada => await sendForgotPasswordMailUseCase.execute("joao@gmail.com"); e dentro do meu execute, eu tenho que passar exatamente o email utilizado no usersRepositoryInMemoryUseCase.execute.

// 9 - na função toHveBeenCalled a gente pode colocar quuantas vezes ele foi chamada, com que parametro ele foi chamada e diversos outros testes.

// 10 - O segundo teste ele não vai permitir que a gente faça o envio de email se o usuário não existir, perceba que no segundo teste eu não precisei criar um usuário, pq eu quero que falhe caso o usuário não exista.

// 11 - A gente também pode testar se ele chamou a função "this.usersTokenRepository.create()" que é uma função que esta dentro de "SendForgotPasswordMailUseCase.ts"

// 12 - Que é basicamente o token que eu gerei a aprtir do "uuid" com expiração de tres horas e é com esse token que o usuário vai poder utilizar a função de esquecer a senha, e nesta função eu vou utilizar a função "spy" para ver se o metodo de geração de token tambem é chamada ao invés de fazer a criação de um token aqui.

// 13 -
