import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { Repository } from "typeorm";
import { CarImage } from "../entities/carImage";
import { AppDataSource } from "../../../../../shared/infra/database/DataSource";



class CarsImageRepository implements ICarsImagesRepository{
    private repository: Repository<CarImage>;

    constructor(){
        this.repository = AppDataSource.getRepository(CarImage);
    }



    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({car_id , image_name});


        await this.repository.save(carImage)

        return carImage;
    }
}



export {CarsImageRepository}