import { Specification } from "../infra/typeorm/entities/Specifications";



export interface ICreateSpecificationDTO{
    name:string 
    description:string;
}



interface ISpecificationsRepository{
    create({name , description}:ICreateSpecificationDTO):Promise<Specification>
    findByName(name:string):Promise<Specification | null>;
    findByIds(ids:string[]): Promise<Specification[]>;

}   




export {ISpecificationsRepository}