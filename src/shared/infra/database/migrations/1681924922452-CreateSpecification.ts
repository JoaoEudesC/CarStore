import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSpecification1681924922452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"specifications",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"name",
                        type:"varchar"
                    },
                    {
                        name:"description",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timeStamp",
                        default:"now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //Caso a nossa migração der errado , a gente vai dropar a tabela , a gente vai dar um drop table e a tabela vai ser descartada., o drop é um comando nativo da linguagem sql
        await queryRunner.dropTable("specifications")
    }

}
