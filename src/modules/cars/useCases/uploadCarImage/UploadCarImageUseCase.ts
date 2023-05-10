import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImageRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private carsImagesRepository:ICarsImagesRepository
    ) {

    }
        
    async execute({ car_id, images_name }: IRequest) {}
}

export { UploadCarImageUseCase };
