import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { AppDataSource } from "../../../../../shared/infra/database/DataSource";
import {  Repository } from "typeorm";
import { Car } from "../entities/Car";


export class CarsRepository implements ICarsRepository{

    private repository: Repository<Car>

    constructor(){
        this.repository = AppDataSource.getRepository(Car)
    }

    async create({brand , category_id , daily_rate , description , fine_amount , license_plate, name}:ICreateCarDTO): Promise<Car> {
        const car =  this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name
        });
        await this.repository.save(car)
        return car
    }
    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const car = await this.repository.findOneBy({license_plate})
        return car || undefined
    }
    
}


// 1 - Repare que a construção de todos os "repository"  seguem a mesma linha de raciocinio, o que diz respeito que a logica para a criação do repositorio que vai interagir com o banco de dados diretamente para cada "tabela" são iguais.

// 2 - 