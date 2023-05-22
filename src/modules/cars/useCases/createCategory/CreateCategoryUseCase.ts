// Perceba que eu criei um service somente para a categoria, para  a tabela de criaçaõ de categoria, aonde o req e res serão enviados para fazer a listagem de usuários , o findByname , a post de categorias , serão feitos todos aqui e a rota so vai receber a execução feita
// Ou seja , esse metodo execute, que vai estar em cada service de cada tabela, ele vai ser responsave por executar aquilo que por exemplo, precisa ser feito na criação de usuário, como o findByName

import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category already exists", 400);
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };

// Aqui no service nos vamos ter que criar uma interface para que possamos ter acesso ao name e ao description , visto que o service ele não tem que ter acesso a nossa req e a nossa res
// Sempre ter em mente que tudo é independente do banco de dados e de sim proprio, o unico que tem acesso direto com o banco de dados é o repositories
// Porque o service não pode ter acesso ao nosso "res" ? , pq se futuramente a gente mudar do express para outro frame, todo o service vai ter que ser alterado , então isso não é responsabilidade do service, por isso eu utilizei o throw new error;

// OBS => O Nosso service é o alto nivel , é a camada de alto nivel , ele é a camada mais proxima do dominio , por isso ela não deve saber , o que está dentro do meu repositorio, nao deve saber o tipo do repositorio, se  a gente ta utilizando mongo ou mysql, é idependente tbm => por isso que seria errado eu fazer isso => const categoriesRepository = new CategoriesRepository(), eu iria estar estanciando e inicializando o meu array do repositorio , eu tenho que ter um proprio
// OBS => Imagina ter quatro ou 5 services para acessar o repositório, e a gente colocasse um new, a gente teria um novo repositório todas as vezes que a gente estanciasse um new CategoriesRepository, desse jeito a gente nunca teria acesso a mesma instacia ao mesmo tempo no repositorio
// OBS => Tive que utilizar o private para criar um constructor => categoriesRepository:CategoriesRepository, o private recebe o que vem do constructor
// OBS => Isso que eu fiz acima foi a mesma coisa de eu fazer , private categoriesRepository:CtegoriesRepository  , constructor(categoriesRepository:CategoriesRepository){this,categorirsRepository = categoriesRepository}
