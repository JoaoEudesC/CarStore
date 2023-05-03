import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import {v4 as uuuidV4} from "uuid"

@Entity("users")
class users {
    @PrimaryColumn()
    id:string;

    @Column()
    name:string;

    @Column()
    username:string;
    
    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    driver_license:string;

    @Column()
    isAdmin:boolean;
    
    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuuidV4()
        }
    }
}



export {users}