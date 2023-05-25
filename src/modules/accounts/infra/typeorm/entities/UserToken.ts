import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Users } from "./User";

@Entity("users_tokens")
class UserTokens {
    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    user_id: string;

    @ManyToOne(() => Users) // Entidade que vai ter uma relação many to one
    @JoinColumn({ name: "user_id" }) // Campo que vai juntar como referencia da tabela "users" e receber o valor da chave estrangeira nesse campo (ou seja o campo "id")
    user: Users; // Objeto relacionado a tabela que o usuário vai receber a entidade algum campo como chave estrangeira

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { UserTokens };
