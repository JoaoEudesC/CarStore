import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1681753225920 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "categories",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
        // Este método vai servir para caso algo der de errado na nossa migration, esse comando down vai dar um drop nessa nossa tabela.
        // Ele faz o inverso do método up, mas como a gente quer excluir a tabela inteira, a gente não precisa passar coluna por coluna para excluir.(Usa o drop logo).
    }
}

// Nos possuimos dois metodos ("up" e "down") sempre que a gente quiser subir a nossa migration, a gente vai rodar o comando para o "up" , se a gente quiser desfazer essa nossa migration, a gente vai fazer o comando apontando para o down.

// Perceba que são metodos já prontos que são nativos do typeorm(que auxilia na criação de tabelas).

// No name eu defino um nome para a nossa tabela , e as colunas é um array de obejtos , então para cada coluna , é uma chave(ex:A primeira coluna vai ter o nome "id", e em seguida eu posso definir um tipo)
// Note que o id ele vai ser a nossa chave primária da tabela(O identificador da nossa tabela (Toda tabela tem que ter uma chave primária, uma coluna que reprensente o reconhecimento dela e a gente precisa dizer que aquela coluna tem a chave primária))
// O default atual quer dizer a hora que a gente ta fazendo

// OBS => Sempre que for trabalhar com banco de dados relacional , é indispensável o uso de "MIGRATIONS", sendo assim sempre utilize(O typeOrm é muito bom para utilizar mysql tambem), portanto se voce quiser trabalhar com migrations e mysql , o typeORM é tão bom quanto o sequelize.
// Então todo "orm" é compativel com quase todo banco de dados relacional, sendo assim voce pode escolher o melhor orm.
