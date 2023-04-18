//Note que cada arquivo do model diz respeito a uma tabela , essa é a tabela de especificações, a que a gente fez anteriormente foi a tabela de Categoria
import { v4 } from "uuid";




export class Specification {
    id?:string;
    name:string;
    description:string;
    created_at:Date

    constructor(id:string , name:string , description:string , created_at:Date){
        this.id = v4()
        this.name = name
        this.description = description
        this.created_at = created_at


        
    }
}