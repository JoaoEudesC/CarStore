import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersToken1684953513740 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_tokens",
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
                        name: "FKUserToken", // Nome do campo no banco de dados
                        referencedTableName: "users", // Tabela referenciada("migration", referenciada).
                        referencedColumnNames: ["id"], // Campo da tabela que vai ser referenciado como chave estrangeira(ou seja , da tabela users), o campo que vai ser adicionado como chave estrangeira.
                        columnNames: ["user_id"], // O campo "desta tabela" createUsersToken que vai receber essa chave estrangeira, porém no banco o nome vai ficar "FKUserToken".
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
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
// 3 - Com esses dois campos relacionados a cascade => qualquer ação de exclusão ou atualização na tabela principal afetará automaticament as linhas correspondentes na tabela relacionada. isso significa se uma linha for atualizada ou excluida na tabela principal todas as linhas relacionadas na tabela secundária tambem serão excluidas ou atualizadas em conformidade(Isso é util quando voce deseja manter a integridade referencial entre as tabelas e garantir que não haja registros orfãos).
// 4 - Quando voce define os campos como SET NULL => Qualquer ação de exclusão ou atualização na tabela principal resultará em definição do valor das colunas correspondentes nas tabelas secundárias como 'NULL' , isso significa que quando as linhas forem excluidas ou atualizadas da tabela principal as colunas relacionadas nas tabelas secundárias vão ter o campo definido como "null", permitindo valores nulos nestas colunas, (esse metodo é bom quando voce quer permitir registros orfãos na tabela secundária ou quando as colunas relacionadas não são obrigatórias)
