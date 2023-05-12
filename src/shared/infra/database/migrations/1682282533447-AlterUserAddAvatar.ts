import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddAvatar1682282533447 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users", // Aqui a gente deve passar a coluna já criada nas migrations que a gente quer alterar, desta forma nos conseguimos, identificar
            new TableColumn({
                name: "avatar",
                type: "varchar",
                isNullable: true, // Esse campo eu estou dizendo que , o usuário pode ou não passar ele , não é obrigatório ele está preenchido.
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatar"); // Aqui eu estou dizendo que se a gente der um dowm, eu quero que ele remova da tabela "users" , a coluna , "avatar"
    }
}
