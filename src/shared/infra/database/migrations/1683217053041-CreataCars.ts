import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreataCars1683217053041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
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
                        name:"daily_rate",
                        type:"numeric"
                    },
                    {
                        name:"available",
                        type:"boolean",
                        default:"true"
                    },
                    {
                        name: "licence_plate",
                        type:"varchar"
                    },
                    {
                        name:"fine_amount",
                        type:"numeric"
                    },
                    {
                        name: "brand",
                        type: "varchar"
                    },
                    {
                        name:"category_id",
                        type:"uuid",
                        isNullable: true
                    },
                    {
                        name:"created_at",
                        type: "timestamp",
                        default:"now()"
                    },
                ],
                foreignKeys:[
                    {
                        name: "FKCategoryCar", //Nome da nossa chave estrangeira, ela ta na tabela com o nome category_id, mas a gente da um nome para referenciar seguindo a convenção(FKNomeDaTabelaEstrangeira:NomeDaTabelaCriada)
                        referencedTableName:"categories",//A referência de qual tabela a gente ta pegando a chave estrangeira.
                        referencedColumnNames:["id"],//Referencia da coluna que a gente ta pegando da tabela, que está fornecendo a chave estrangeira.
                        columnNames:["category_id"],//A coluna desta nossa tabela atual que vai ser referenciada com a chave estrnageira.
                        onDelete:"SET NULL", //Se a categoria referenciada do nosso carro for removida na outra tabela, esse campo vai ser colocado como "nulo", mas tbm tem a opção de caso isso aconteça a gente apagar o registro inteiro de cars da tabela que foi referencida. (Cascade).
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars");
    }

}



// OBS => Chave estrangeira, como fazer uma criação de "chave estrangeira" ? , ou seja um relacionamento entre tabelas através de um campo.

// 1 - Temos que passar do  "category_id" que vai vir de dentro da tabela de categoria, para dentro da tabela "cars", como chave estrangeira esse campo vai vir de categories

// 2 - Temos que partir de um pressuposto de que essa "foreign key", ela possui uma tabela de origem, ou seja, ela foi criada em outra tabela e está fazendo um relacionamento com a nossa.

// 3 - Então para a gente cadastrar uma categoria dentro da tabela "cars" é necessário e fundamental so pode cadastrar, se o id que a gente colocar em "cars" existir dentro de categorias.

// 4 - Nos vamos fazer um link entre o "category_id" e o "id" da nossa categoria.(o "category_id" é uma chave estrangeira do "id" da tabela de categorias).

// 5 - Temos  algumas formas de criar a "foreign key" , neste caso vamos utilizar a opção acima , e dentro desse array, nos podemos colocar quantas "foreign keys", a gente precisar, visto que cada tabela pode ter mais de uma "foreign key".~

// 6 - No beekeeper , ele deixa o campo de "foreign key" com um icone de "chave", para deixar claro que aquilo é uma "Chave Estrangeira".

// 7 - 