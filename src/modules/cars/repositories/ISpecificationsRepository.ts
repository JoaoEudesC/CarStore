import { Specification } from "../entities/Specifications";


export interface ICreateSpecificationDTO{
    name:string 
    description:string;
}



interface ISpecificationsRepository{
    create({name , description}:ICreateSpecificationDTO):void
    findByName(name:string):Specification | undefined;

}   




export {ISpecificationsRepository}