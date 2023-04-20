//Repare que a estrutura para quase todos os arquivos de criação segue a mesma lógica e o mesmo schema , somente  muda pouquissimas coisas , o implemnetation , entities , migrations , useCases , controllers , Interfaces, geralmente segue a mesma logica em cada arquivo.
import { User } from "@modules/accounts/entities/User";
import { getRepository, Repository } from "typeorm";
import { IUsersRepository , ICreateUserDTO } from "../IUserRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor(){
        this.repository = getRepository(User)
    }
    
    async create({name, username , email , driver_license, password}:ICreateUserDTO):Promise<void>{
        const User = this.repository.create({
            name,
            username,
            email,
            driver_license,
            password
        });

        await this.repository.save(User)
    }
}


export {UsersRepository}









//Sempre p mesmo schema , a implementation recebe a interface do seu arquivo criado.