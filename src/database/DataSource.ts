
import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: false,
  logging: false,
  entities: ["./src/modules/cars/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}



export default AppDataSource


//Aqui é o arquivo onde vai a ligação do nosso banco de dados com o nosseo docker