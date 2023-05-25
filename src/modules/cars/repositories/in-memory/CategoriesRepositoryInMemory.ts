// Basicamente vai ter um arquivo destes para cada useCase que for ter um teste implementando a interface do repository "para virar um fake repository" in memory , para que a gente faç o teste sem interagir diretamente com o arquivo de banco de dados.

import { ICreateCategoryDTO } from "../../DTO/ICreateCategoryDTO";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async findByName(name: string): Promise<Category | undefined> {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category || undefined;
    }
    async list(): Promise<Category[]> {
        const listAll = this.categories;
        return listAll; // Repare que todas as funções tem que ser assicronas,mesmo não sendo direto no banco de dados.
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });
        this.categories.push(category);
    }
}

export { CategoriesRepositoryInMemory };

// Quando a gente faz uma implementação, a gente consegue pegar todas as informações daquela interface implementada automaticamente exatamente igual como a interface passa.

// Perceba que eu estou criando um banco de dados fake, igual estava antes de utilizar banco de dados (utilizando array).

// O CategoriesRepository in memory nada mais é do que a criação de um repositório com a mesma regra de negocio do repositório original porém com a utilização de um "array" como banco de dados , um banco de dados "fake", para que a gente possa realizar os testes encima dele e não encima de do banco de dados original.("A gente começou a aplicação assim")
