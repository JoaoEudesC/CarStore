// Aqui é onde eu vou criar a minha interface , o meu "Contrato"
// Perceba que aqui a  tipagem que eu estou dando  para o meu findByName é o meu Icategory que é o meu model
// E estou passando a função findByname e tipando ela , que é justamente a função que não vai permitir criar mais de uma categoria igual

import { ICreateCategoryDTO } from "../DTO/ICreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

interface ICategoriesRepository {
    findByName(name: string): Promise<Category | undefined>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository };

// Repare que aqui eu tipei o "name" direto dentro do findByName e assim eu não preciso criar outra interface porque é somente um elemento, não tem necessidade
// A interface foi criada somente para o "create" porque possuia dois elementos e eu vou utilizar no "useCase" mas eu poderia tipar diretamente dentro da função igual eu fiz om o "findByName"
