import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1682017370074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users",
                columns:[
                    {
                        name:"id",
                        type:"uuid"
                    },
                    {
                        name:"name",
                        type:"varchar"
                    },
                    {
                        name:"username",
                        type:"varchar",
                        isUnique:true
                    },
                    {
                        name:"pasword",
                        type:"varchar"
                    },
                    {
                        name:"email",
                        type:"varchar"
                    },
                    {
                        name:"driver_licence",
                        type:"varchar"
                    },
                    {
                        name: "isAdmin",
                        type:"boolean",
                        default:false
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}


// 1 - Coloquei a coluna username como única com a flag isUnique, o username da pessoa vai ser unico (ou seja , a gente não vai permitir que seja criado dois usernames iguais no mesmo banco).

// 2 - No exemplo que você forneceu, default: false na coluna "isAdmin" significa que se nenhum valor for especificado para essa coluna ao inserir um novo registro, o valor padrão será false.Isso significa que, se você não especificar o valor da coluna "isAdmin" ao inserir um novo registro, o valor padrão será false, o que indica que o usuário não é um administrador.