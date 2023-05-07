
// Importe a biblioteca antes de usar o tsyringe
import "reflect-metadata"; 
import { container } from "tsyringe";

//Importação de elementos para a criação do conteiner de categorias
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";

//Importação de elementos para criação do conteiner de specifications
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";

//Importação de elementos para a criação de conteiner de Criação de usuários(CreateUser)
import {IUsersRepository} from "../../modules/accounts/repositories/IUserRepository"
import {UsersRepository} from "../../modules/accounts/infra/typeorm/repositories/UsersRepository"

//Importação de elementos para a criação de conteiner de criação de carro(CreateCar)
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";






//1 - Conteiner de categorias
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);



//2 - conteiner de specification
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository

);


//3 - conteiner de criação de usuário (CreateUser)
container.registerSingleton<IUsersRepository>(
    "UsersRepository",      //Repare que a criação de conteiner recebe todos os mesmos atributos quase , a logoca para criaçaõ é quase a mesma, "register" e passa a nossa interface e em seguida dentro passa o nome do conteiner e a "classe", que á a classe do nosso repository que ta dentro do nosso implementation(Que é o nosso repository)
    UsersRepository         //Esse uso de conteiners facilita muito para que a gente consiga escrever menos codigo e importações na hora de utilizar as classes nos nossos useCases de cada regra de negocio

);

//4 - conteiner de criação de carro (CreateCar)
container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)




//Então com essa bibilioteca as implementações das instancias vão facilitar , porque não será preciso fazer na mão.(A gente consegue até registrar um singleton)