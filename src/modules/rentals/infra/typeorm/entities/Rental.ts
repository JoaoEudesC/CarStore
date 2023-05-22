import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Car } from "../../../../cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date; // Smpre que criar a primeira vez ele vai mostrar a data que foir criado

    @UpdateDateColumn()
    updated_at: Date; // Sempre que fizer um update ele vai mostrar a data do update

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Rental };
