import { IsNull, Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/database/DataSource";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
        const openByCar = await this.repository.findOneBy({
            car_id,
            end_date: IsNull(), // Tenho que passar aqui como "IsNull" se eu passar como undefined ele vai da erro quando eu entrar o carro, ele vai alterar o campo "available" para true sendo que quando eu tentar fazer um rental com esse carro devolvido ele vai cair no "car unavailable".
        });
        return openByCar || undefined;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
        const openByUser = await this.repository.findOneBy({
            user_id,
            end_date: IsNull(),
        });
        return openByUser || undefined;
    }

    async create({
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total,
        });
        await this.repository.save(rental);
        return rental;
    }

    async findById(id: string): Promise<Rental | undefined> {
        const rental = await this.repository.findOneBy({ id });
        return rental || undefined;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"], // Fiz isso fazendo um relacionamento de tabela com a tabela "car" na minha entity "rental" que eu relacionei com a entidade "Car" juntando a coluna do "id" do carro.
            // E com esse relations eu consigo pegar o relacionamento entre essas duas tabelas para melhorar uma "listagem" de carros ou produtos por exemplo, sendo assim vai vir todas as informações do carro quando eu listar antes de utilizar este metodo estava vindo "id", "car_id" , "user_id" "expected_returd", "end_date", "start_date", "total" , "creted" e "updated" como esse novo metodo ele vai listar todas as informações do carro como modelo ,specificação e tudo que esta na tabela de carros.
        });
        return rentals; // Não utiliza o findOneBy e sim o findBy porque a gente quer mostrar tudo que está disponível e não só um.
    }
}

export { RentalsRepository };
