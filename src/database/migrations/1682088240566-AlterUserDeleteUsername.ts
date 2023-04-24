import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterUserDeleteUsername1682088240566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users" ,"username" )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users" , 
            new TableColumn({
                name:"username",
                type:"varchar"
            })
        )
    }

}





//Esse arquivo foi o responsável por criar uma remoção de uma coluna da nossa tabela

//Aqui é onde a gente passa o nome da tabela, e o nome da coluna que a gente quer dar o drop column.
