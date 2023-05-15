import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
    synchronize: false,
    logging: false,
    entities: ["./src/modules/**/infra/typeorm/entities/*.ts"], // Tenho qucolocar ** , caso contrário, ele vai indetificar só uma tabela , se eu colocar "cars" por exemplo
    migrations: ["./src/shared/infra/database/migrations/*.ts"],
    subscribers: [],
});

export function createConnection1(host = "localhost"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}

// OBS => de onde vem o "NODE_ENV" => no nosso package json, nos scripts na parte do "jest" a gente consegue definir que o nosso NODE_ENV = "test" => "test": "NODE_ENV=test jest"
// OBS => Então basicamente para eu rodar os testes eu vou precisar mudar o "host para "localhost"" e para testar a aplicação no insomnia vamos precisar mudar para "database" que é o nome definido no docker isso serve justamente para que nós possamos driblar o erro do docker com o localhost.
