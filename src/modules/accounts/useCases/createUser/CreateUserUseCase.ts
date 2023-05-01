import "reflect-metadata";
import { ICreateUserDTO, IUsersRepository } from "../../repositories/IUserRepository";
import { inject , injectable } from "tsyringe";
import {hash} from "bcrypt"
import { AppError } from "@errors/AppError";



@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository:IUsersRepository){}
    async execute({name , email , password , driver_license }:ICreateUserDTO):Promise<void>{
        console.log(password)
        const passwordHash = await hash(password , 10); //O número significa o salt da senha, para dificultar o hash.
        
        const userAlreadyExists = await this.usersRepository.findByEmail(email)
        
        if(userAlreadyExists){
            throw new AppError("User already exists")
        }
        
        await this.usersRepository.create({
            name, 
            email,
            password:passwordHash,
            driver_license
        })
    }   
}


export {CreateUserUseCase}


//Repare que aqui eu estou pegando a função diretamente  "hash" do bcrypt , diferente dos outros projetos em que eu , pegava uma varivel "bcrypt" e fazi "bcrypt.hash"
//