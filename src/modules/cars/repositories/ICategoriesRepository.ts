//Aqui é onde eu vou criar a minha interface , o meu "Contrato"
//Perceba que aqui a  tipagem que eu estou dando  para o meu findByName é o meu Icategory que é o meu model
//E estou passando a função findByname e tipando ela , que é justamente a função que não vai permitir criar mais de uma categoria igual

import { Category } from "../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO{
    name:string;
    description:string;
}


interface ICategoriesRepository{
    findByName(name:string):Promise<Category | null>;
    list():Promise<Category[]>;
    create({name , description}:ICreateCategoryDTO):Promise<void>;
}


export {ICategoriesRepository}