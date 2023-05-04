import "reflect-metadata"
import { DataSource } from "typeorm"

  export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: false,
  logging: false,
  entities: ['./src/modules/**/infra/entities/entities/*.ts'], //Tenho qucolocar ** , caso contrário, ele vai indetificar só uma tabela , se eu colocar "cars" por exemplo
  migrations: ["./src/shared/infra/database/migrations/*.ts"],
  subscribers: [],
})

export function createConnection1(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

