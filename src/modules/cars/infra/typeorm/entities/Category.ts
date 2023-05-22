// Importação de uuid V4 para a geração do id
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

// Aqui a gente precisa dizer que essa classe é um referencia para a nossa tabela

@Entity("categories")
class Category {
    @PrimaryColumn()
    id?: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Category };
