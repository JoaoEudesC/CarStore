// Importe a biblioteca antes de usar o tsyringe
import { container } from "tsyringe";

import "reflect-metadata";
import "./providers/DateProvider/implementations"; // Tenho que passar o provider criado para que eu possa utilizar ele como conteiner para fazer a implementação das datas nos useCases.
import "./providers/MailProvider/Implementations";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUserRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { CarsImageRepository } from "../../modules/cars/infra/typeorm/repositories/CarImagensRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsImagesRepository } from "../../modules/cars/repositories/ICarsImageRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";

// 1 - Conteiner de categorias
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

// 2 - conteiner de specification
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

// 3 - conteiner de criação de usuário (CreateUser)
container.registerSingleton<IUsersRepository>(
    "UsersRepository", // Repare que a criação de conteiner recebe todos os mesmos atributos quase , a logoca para criaçaõ é quase a mesma, "register" e passa a nossa interface e em seguida dentro passa o nome do conteiner e a "classe", que á a classe do nosso repository que ta dentro do nosso implementation(Que é o nosso repository)
    UsersRepository // Esse uso de conteiners facilita muito para que a gente consiga escrever menos codigo e importações na hora de utilizar as classes nos nossos useCases de cada regra de negocio
);

// 4 - conteiner de criação de carro (CreateCar)
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

// 5 - conteiner de criação de upload de imagem do carro
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImageRepository
);

// 6 - conteiner de Criação de rentals
container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

// 7 - conteiner de Criação de tokens para cada usuárió
container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);

// Então com essa bibilioteca as implementações das instancias vão facilitar , porque não será preciso fazer na mão.(A gente consegue até registrar um singleton)
