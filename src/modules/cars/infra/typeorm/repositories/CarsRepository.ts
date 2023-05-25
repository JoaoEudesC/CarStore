import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/database/DataSource";
import { ICreateCarDTO } from "../../../DTO/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id,
        });
        await this.repository.save(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const car = await this.repository.findOneBy({ license_plate });
        return car || undefined;
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand });
        }
        if (name) {
            carsQuery.andWhere("c.name = :name", { name });
        }
        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car | undefined> {
        const car = await this.repository.findOneBy({ id });
        return car || undefined;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id }) // Aqui é como se eu estivesse fazendo uma busca "findById" só que estou utilizando um novo metodo do "createQueryBuilder" ta na documentação.
            .execute();
        // Seto uma condição em que eu digo que o nome "id" no banco de dados deve ser o igual passado no parametro.
        // o setParameters serve para definir os valores dos parametros da consulta(neste caso será o id que recebemos como parametro da função).
        // Em seguida, chamamos o método set({ available }), onde { available } é uma sintaxe abreviada que significa { available: available }. Isso define o valor do campo available no banco de dados com o valor passado como parâmetro.
        // É como se eu estivesse escrevendo um "sql" puro ("update cars set available = 'true' where id = :id").
        // O método execute ele não retorna nada, por isso tive que mudar a "promise" para void,e no ICars Repository também a função "update available" vai ser promise<void> também.
    }
}

// 1 - Repare que a construção de todos os "repository"  seguem a mesma linha de raciocinio, o que diz respeito que a logica para a criação do repositorio que vai interagir com o banco de dados diretamente para cada "tabela" são iguais.

// 2 - Há um novo metodo de buscas que o typeOrm possui que se chama (createQueryBuilder), onde a gente passa um "alias" que é um nome que a gente vai utilizar para realizar nossas buscas.

// 3 - Utilizamos o where => esperamos que o nosso campo "available" ele seja igual, dentro do objeto a gente coloca que aquele atributo que a gente colocou como dois pontos("ele seja com valor de true").

// 4 - O alias é o novo nome que a gente está dando para a nossa tabela

// 5 - Então com esse alias eu estou dizendo que se tiver a "marca" completa, ou o nome , ele vai retornar o category_id , name , ou marca, que vai me permitir fazer o mecanismo  de busca com esses campos, essa é uma outra forma de realizar buscas.

// 6 - No final o retorno que eu recebo é => a gente vai rodar essa query com o comando carsQuery.get many , que vai pegar todos os nosso objetos que nos temos que retornar, sendo eles uma promise de "Car"

// 7 - Dessa forma é mais fácil porque a gente não precisa ficar criando "findAvailableByname", "findAvailableBybrand", "findAvailableByCategory_id", fazemos logo tudo de uma só maneira.

// 8 -
