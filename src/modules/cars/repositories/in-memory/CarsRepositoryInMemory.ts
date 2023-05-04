import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";
import { Car } from "../../../../modules/cars/infra/typeorm/entities/Car";


class CarsRepositoryInMemory implements ICarsRepository{
    cars: Car[] = [] //Basicamente eu estou dizendo que cars , é uma variavel que recebe um array de Car, então a variavel é "cars"
    async create({brand, category_id, daily_rate, description, fine_amount, name , license_plate}:ICreateCarDTO): Promise<Car> {
        const cars = new Car()

        Object.assign(cars, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            name, 
            license_plate
        });

        this.cars.push(cars)

        return cars
    }
    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        return this.cars.find((car) => car.license_plate === license_plate) || undefined
    }
}

export {CarsRepositoryInMemory}