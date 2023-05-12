import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuiV4 } from "uuid";

@Entity("cars_image")
class CarImage {
    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuiV4();
        }
    }
}

export { CarImage };
