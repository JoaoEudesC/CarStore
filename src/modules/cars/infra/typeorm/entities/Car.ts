import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specifications";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{ name: "car_id" }], // Aqui é a propriedade que vai ser referenciada da nossa tabela de cars => criada na migration , o nome da coluna na tabela de relacionamento que referencia essa tabela que a gente está.
        inverseJoinColumns: [{ name: "specification_id" }], // É a outra tabela que referencia a coluna que a gente está colocando dentro do nosso "many to many" que é a outra chave estrangeira criada na tabela de "cars"
    })
    specifications: Specification[]; // Criei esse atributo de specificação, por isso é um array, pq cada carro vai poder receber mais que uma "specificação".
    // Vamos ter que alterar a entidade de "Car.ts" pq ela vai receber a propriedade das especificações que a gente quer cadastrar dentro dela.

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
        this.available = true;
    }
}

export { Car };

// OBS => Perceba que o "category_id" ele é uma chave estrangeira, então aqui na nossa entidade a gente tambem tem que referenciar ele.

// 1 - Então a gente utiliza o atributo do "typeorm", "JoinColumn" para referenciar a junção da chave estrangeira , colocando o name, o nome da coluna que é a chave estrangeira, ou seja essa chave está vindo da "entity" categories, pois essa chave vai ser utilizada na "entity" Car.

// 2 - Uma categoria, ela pode está disponivel para um ou vários carros, ou seja , um carro pode ter uma única "categoria", mas uma categoria pode estar associada a vários carros diferntes (é uma associação "many to one".)

// 3 - Um carro para cada categoria , uma categoria para vários carros.

// 4 - Sabendo disso eu posso passar que o "join collumn" ele é "many to one".

// 5 - Specification recebe "many to many" porque um carro pode ter várias especificações, uma specificação pode ter varios carros e varios carros podem ter varias sepcificaçõe e não um única.

// 6 - Na relação com categoria ele recebe "many to one" porque um carro pode ter uma única categoria, porém podem ter categorias para carros diferentes.

// 7 - Entaão a logica para relacionamentos de tabela é mesma o que muda é se é many to many , many to one , one to one, e eu posso ter vários relacionamentos com a mesma tabela.

// 8 -
