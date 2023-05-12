import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1683573709918
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specifications_cars",
                columns: [
                    {
                        name: "car_id",
                        type: "uuid",
                    },
                    {
                        name: "specification_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKSpecificationCar", // Nome da nossa chave estrangeira, ela ta na tabela com o nome category_id, mas a gente da um nome para referenciar seguindo a convenção(FKNomeDaTabelaEstrangeira:NomeDaTabelaCriada)
                referencedTableName: "specifications", // A referência de qual tabela a gente ta pegando a chave estrangeira.
                referencedColumnNames: ["id"], // Referencia da coluna que a gente ta pegando da tabela, que está fornecendo a chave estrangeira.
                columnNames: ["specification_id"], // A coluna desta nossa tabela atual que vai ser referenciada com a chave estrnageira.
                onDelete: "SET NULL", // Se a categoria referenciada do nosso carro for removida na outra tabela, esse campo vai ser colocado como "nulo", mas tbm tem a opção de caso isso aconteça a gente apagar o registro inteiro de cars da tabela que foi referencida. (Cascade).
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKCarSpecification", // Nome da nossa chave estrangeira, ela ta na tabela com o nome category_id, mas a gente da um nome para referenciar seguindo a convenção(FKNomeDaTabelaEstrangeira:NomeDaTabelaCriada)
                referencedTableName: "cars", // A referência de qual tabela a gente ta pegando a chave estrangeira.
                referencedColumnNames: ["id"], // Referencia da coluna que a gente ta pegando da tabela, que está fornecendo a chave estrangeira.
                columnNames: ["car_id"], // A coluna desta nossa tabela atual que vai ser referenciada com a chave estrnageira.
                onDelete: "SET NULL", // Se a categoria referenciada do nosso carro for removida na outra tabela, esse campo vai ser colocado como "nulo", mas tbm tem a opção de caso isso aconteça a gente apagar o registro inteiro de cars da tabela que foi referencida. (Cascade).
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "specifications_cars",
            "FKCarSpecification"
        );
        await queryRunner.dropForeignKey(
            "specifications_cars",
            "FKSpecificationCar"
        );

        await queryRunner.dropTable("specifications_cars");
    }
}

// 1 - Geralemente quando uma tabela é inteiramente de relacionamentos, nos utilizamos o nome das duas tabelas que estão se relacionando, ou seja ,  a tabela "specifications_cars" é a tabela de especificações e tabela de carros.

// 2 - Repare que no arquivo de "createCars" na migration a gente criou uma "foreign key" logo após de ter criado as colunas, mas existe uma outra forma de se criar a foreing key, do jeito que vamos criar aqui neste arquivo.

// 3 - A gente roda o nosso "Query" e em seguida criamos a nossa chave estrangeira e precisamos passar o nome da tabela que vai ser adicionanda a chave eestrangeira

// 4 - Perceba que a gente vai ter que fazer o mapeamento de duas chaves estrnageiras, por isso nós vamos ter que colocar duas funções de foreign key, a lógica é a mesma so muda a tabela e nós podemos criar quantas foreign key a gente quiser na mesma tabela.

// 5 - Repare que a referência para a tabela é a mesma , o que muda são as informações para a tabela.

// 6 - No nosso down ele vai mudar um pouco => Neste caso eu preciso fazer o processo reverso, primeiro eu removo as minhas "foreign keys" e depois é que eu removo a minha "tabela".

// 7 - O método do "drop table" mudou pq neste arquivo nós criamos a nossa foreign key de forma diferente , nos não criamos logo em seguida, junto com as colunas igual no "CreateCars" por isso nós precisamos dropar as chaves estrangeiras para depois dropar a tabela
