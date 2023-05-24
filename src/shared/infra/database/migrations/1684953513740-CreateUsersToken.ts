import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersToken1684953513740 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_token",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "refresh_token",
                        type: "varchar",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "expires_date",
                        type: "timestamp",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUserToken",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASACADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_token");
    }
}

// 1 - A nossa foreign key vai ser o usuário em si, é única foreign key que nós vamos ter na tabela de tokens.
// 2 - A gente pois na tabela o tempo de expiração desse token.
// 3 -
