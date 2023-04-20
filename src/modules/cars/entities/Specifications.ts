//Note que cada arquivo do model diz respeito a uma tabela , essa é a tabela de especificações, a que a gente fez anteriormente foi a tabela de Categoria
import { v4 as uuidV4 } from "uuid";
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm"



@Entity("specifications")
export class Specification {
    @PrimaryColumn()
    id?:string;
    @Column()
    name:string;
    @Column()
    description:string;
    @CreateDateColumn()
    created_at:Date
    
    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }
}


//Perceba que a gente utiliza os decorators  para definir que essa nossa entidade vai estar junto com o banco de dados, se por acaso a nossa migration tiver com um nomde diferente da nossa entitty nos atributos , a gente pode passar dentro do parenteses de column Ex:@colum("nome")