// Repare que a estrutura para montar os testes vai ser igual para todos os useCases, criação de repository in memory, criação de cada teste unitário dentro de cada useCase e etc..
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/IUserRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        ); // Aqui vai seguir a mesma linha de raciocinio, vamos colocar o repository in memmory , dentro do useCase , para a gente não trabalhar diretamente com o repositório que traz o banco de dados, que é basicamente o nosso banco de dados fake.
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "00123",
            email: "user@teste.com",
            password: "1234",
            name: "User Test",
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an non existent user", async () => {
        // Aqui nos vamos utilizar o rejects tbm , pq aqui nos vamos utilizar o "app.Error" para verificar.
        await expect(
            authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect")); // Nós aqui estamos utilizando o "to Equal" no lugar de "to be instaceOf" porque a gente te vários erros e assim faz com que a gente consiga passar exatamente a mensagem que a gente ta enviando daquele useCase(Porque a mensagem tem que bater com o useCase) se não da erro de compatibilidade assim fica mais forçado e orgnizado.
    });

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "9999",
            email: "user@user.com",
            password: "1234",
            name: "User Test Error",
        };
        await createUserUseCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorretct Password",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});

// OBS
// 1 - Precisamos testar se o usuário é correto(A senha se for incorreta ela da o erro.)
// 2 - Precisamos testar se está gerando o token
// 3 - Para testar essa rota a gente precisa ter um usuário cadastrado, por isso a gente vai ter que fazer um import a mais, pq só gera token se o usuário estiver cadastrado.
// 4 - A gente vai ter que importar tbm o createUserUseCase, porque só assim teremos o usuário criado então antes da autenticação vamos criar um usuário
// 5 - Repare que eu nunca posso esquecer de utilizar o "expect", a mesma coisa que eu fiz com o "id", eu fiz com o token, quando o resultado é alcançado ele gera o "token" do usuário , mas na criação não , então para eu saber que funcionou ("vai ter que", toHavePrperty("token")).
// 6 - Apos o envio do token , nos precisamos passar o cenário onde vamos verificar se a senha e o usuário esta correto =>
// 7 - Repare que sempre que eu utilizar o "rejects" eu tenho que passar o expects como uma função e não como um "result".
// 8 - Eu posso utilizar como instacia qualquer middlware que eu tiver crido, neste caso foi o "middlware de erro".
// 9 - Perceba que para executar o terceiro teste do incorect password , eu tive que criar um usuário novamente, para fazer o teste como no primeiro teste de autenticar usuário, so que passei uma senha diferente , para ativar o erro ("que a senha não existe"), eu poderia ter utilizado o modelo de usuário criado no primeiro teste(mas a boa prática é fazer testes isolados).
// 10 -
