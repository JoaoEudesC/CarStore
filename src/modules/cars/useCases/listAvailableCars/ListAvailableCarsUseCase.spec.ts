import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DOF-5541",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Car_brand_test",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DOF-1526",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DOF-1526",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "12345",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    });
});

// Como a gente está utilizando o "TDD" na confexão dos testes, nesta funcionalidade a gente vai ter que criar alguns dados para que a gente possa lista-los.

// 1 - Igual quando fizemos para testar a autenticação do usuário onde nos tivemos que criar um usuário para que o teste seja realizado, pq sem um usuário não teria como testar. assim como sem carros criados, não temos como testar a funcionalidade de lista-los

// 2 - Aqui nós vamos utilizar outra estratégia para criar esses carros, diferente da estratégia que utilizamos para criar o usuário e testar a autenticação, que foi chamar o useCase da criação de usuário para o nosso teste de autenticação.

// 3 - Uma outra forma de utilizar as propriedades do "jest" é (toEqual), então eu estou dizer que eu quero que eu espero que o objeto retornado de cars , seja igual a um array "de car" que foram o dados que eu criei para o teste.

// 4 - Perceba que todos os nossos testes possuem a mesma lógica de criação e execução, e não estão em constatnte contato com o banco de dados, por isso eu passo como se fossem as informações do execute.

// 5 -
