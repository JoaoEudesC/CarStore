import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuuidV4 } from "uuid";

@Entity("users")
class Users {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: "avatar_url" }) // Definição de nome que ele vai receber quando eu chamar o meu json na requisição
    avatar_url(): string {
        switch (process.env.disk) {
            case "local":
                return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
                break;
            case "s3":
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
                break;
            default:
                throw new Error("Inválid getAvatarUrl, check the function");
        }
    }

    constructor() {
        if (!this.id) {
            this.id = uuuidV4();
        }
    }
}

export { Users };

// 1 - ## 6 - Gerar url => ("class-transformer"), bibilioteca para gerar url => npm i class-transformer, com essa bibilioteca a gente consegue manipular a nossa entidade

// 2 - Vou criar uma função com essa bibilioteca para quando a gente fizer um requisição eu tenha tambem a url, "Expose" ele vai expor essa informação

// 3 - Dentro da função a gente retorna a url de acesso para o avatar.

// 4 - A gente vai utilizar um "switch" se a gente tiver utilizano "local" a url vai ser local , se a gente tiver utilizando o "s3" a url vai ser do s3.

// 5 - O switch case funciona como um if e else , então o retorno seria esse mesmo, caso local retorna uma coisa , caso "s3" retorna outra, tenho que por um break , para ele não retornar o resto dos casos caso encontre o correto, mas neste caso não precisa porque eu tenho o "return" e depois do return não passa mais nada.

// 6 -
