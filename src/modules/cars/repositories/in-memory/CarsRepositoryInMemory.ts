import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = []; // Basicamente eu estou dizendo que cars , é uma variavel que recebe um array de Car, então a variavel é "cars"
    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        name,
        license_plate,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const cars = new Car();

        Object.assign(cars, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            name,
            license_plate,
            id,
        });

        this.cars.push(cars);

        return cars;
    }
    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        return (
            this.cars.find((car) => car.license_plate === license_plate) ||
            undefined
        );
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const all = this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return undefined;
        });

        return all; // Tive que passar essa função assim, para que ele retorne somente os carros disponiveis e não todos os carros da lista
    }
    // Estou basicamente fazendo dois filtros, se o carro estiver disponivel , ele vier ou com a mrac preenchida ou o category_id ou o name , eu vou retornar.
    async findById(id: string): Promise<Car | undefined> {
        return this.cars.find((car) => car.id === id) || undefined;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id);
        this.cars[findIndex].available = available;
    }
}

export { CarsRepositoryInMemory };

// 1 - Perceba que por conta do uso dos operadores lógicos, nos transformamos o car available em obrigatótio, porque nos estamos utilizando o "&&" , as outras condições é que podem ser opcionais, podem acontecer ou não, pq estamos utilizando o operador "||"
// 2 - A função index vai fazer um map para achar o index desse meu objeto.
// 3 - Função findIndex => retorna o indice do elemento encontrado no array ou -1 se nenhum elemento satisfazer a condição , neste caso o indice é usado para acessar o objeto do carro no array e modificar sua propriedade 'available'.
