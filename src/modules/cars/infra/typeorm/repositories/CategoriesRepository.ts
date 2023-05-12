import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/database/DataSource";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

// Importação de classe do typeOrm(Se voce aplicar um "ctrl + click" em qualquer pacote ou modulo exportado voce consegue ver o que tem dentro dele que pode ser utilizado )

// Com a nova atualização precisou do typeorm precisou-se colocar eu não posso utilizar o get Repository diretamente do typeorm mais , tenho que utilizar o getRepository do meu DataSource

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }
    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category | undefined> {
        const category = await this.repository.findOneBy({ name }); // SELECT * FROM category WHERE name = "name"

        return category || undefined;
    }
}

export { CategoriesRepository };

// Ainda estamos utilizando um banco de dados ficticio, por isso o insert nos estamos fazendo em um array, imagine que esse array é uma tabela do nosso banco de dados , quem é responsável por essa interação com o banco de dados são os repositories, então esse array quu esta lá na nossa rota , nos temos que trazer pra cá
// Não se pode declarar const dentro de uma class , por isso quando eu trouxe o array categories do nosso router "Nosso banco ficticio" tive que remover o const.
// A gente deve definir esse atributo como publico ou privado, neste caso a gente vai definir como privado, porque so quem vai ter acesso a esse array e essa class é o nosso repository , ele não poderá ser alterado externamente(Utilizamos isso quando formos exportar arrays , variaveis e atributos)
// Ter atenção que sempre que for utilizar uma classs, na maioria das vezes voce vai ter que utilizar um constructor , para conseguiri estanciar como metodo, igual neste caso em que eu tirei um array completo do meu router e trouxe pra cá dessa maneira, mesmo este array esta sendo tipado por outra classe, que está e model

// Repare que eu criei um Create, que será uma função responsável por cadastrar , a nossa categoria , dentro da nossa "Tabela fake"., então ja fica a ideia que o repository vai ser responsavel pela a interação com o banco.

// OBSERVAÇÕES*********************************************************
// OBS => Perceba que todos os métodos que vão ser criados em realação a interação com o banco de dados que digam respeito a categoria , vão estar no CategoriesRepositorys, ou seja , é um arquivo destes para cada tabela
// OBS => para tabela de vendas e categoria por exemplo, são dois arquivos separados, em que vão ser criados uma única classe, com as funç~eos de Listagem , de post , de delete , de update  e etc.
// OBS => até a função findByName, que é para verificar se já existe uma categoria no meu banco e não deixar cadastrar a mesma categoria duas vezes, eu faço aqui no CategoriesRepositorys, que é justamente um tipo de interação com o banco de dados por isso vai ser feito aqui na pasta repositories, na ala da tabalea de Categories.
