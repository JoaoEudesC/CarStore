import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"
import { Category } from "./Category";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id:string;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate:string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;
    
    @ManyToOne(() => Category)
    @JoinColumn({name: "category_id"})
    category:Category;

    @Column()
    category_id:string; 

    @CreateDateColumn()
    created_at:Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
        this.available = true
    }
}


export {Car}


//OBS => Perceba que o "category_id" ele é uma chave estrangeira, então aqui na nossa entidade a gente tambem tem que referenciar ele.

// 1 - Então a gente utiliza o atributo do "typeorm", "JoinColumn" para referenciar a junção da chave estrangeira , colocando o name, o nome da coluna que é a chave estrangeira, ou seja essa chave está vindo da "entity" categories, pois essa chave vai ser utilizada na "entity" Car.

// 2 - Uma categoria, ela pode está disponivel para um ou vários carros, ou seja , um carro pode ter uma única "categoria", mas uma categoria pode estar associada a vários carros diferntes (é uma associação "many to one".)

// 3 - Um carro para cada categoria , uma categoria para vários carros.

// 4 - Sabendo disso eu posso passar que o "join collumn" ele é "many to one".