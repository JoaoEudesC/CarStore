//Repare que a estrutura para quase todos os arquivos de criação segue a mesma lógica e o mesmo schema , somente  muda pouquissimas coisas , o implemnetation , entities , migrations , useCases , controllers , Interfaces, geralmente segue a mesma logica em cada arquivo.
import { User } from "@modules/accounts/entities/User";
import { getRepository, Repository } from "typeorm";
import { IUsersRepository , ICreateUserDTO } from "../IUserRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor(){
        this.repository = getRepository(User)
    }

    //Função de criação de usuários.
    async create({name,  email , driver_license, password , avatar , id}:ICreateUserDTO):Promise<void>{
        const User = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id
        });

        await this.repository.save(User)
    }
    //Função de verificar se o usuário já está cadastrado no banco de dados.
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({where:{email}})
        if(!user){
            throw new Error(`User with this email ${email} not found`) //Essa é uma verificação caso o email passado não exista no banco de dados, se eu não fizer essa verificação, ele da erro, pq o email vai ser do tipo "string e null" e eu defini o tipo como "string", pq possa ser que o email não exista.
        }
        return user
    }

    //Função findById(Vamos achar o usuário pelo id, para utilizar junto com a autenticação)
    async findById(id: string):Promise<User> {
        const user = await this.repository.findOne({where: {id}});
        if(!user){
            throw new Error(`User with this id ${id} not found`) //Perceba que nos dois casos eu tenho que fazer essa validação, pq possa ser que o resultado retorna null e eu tipei como string, por isso dá erro no typescript.
        }
        return user;
    }
    
}


export {UsersRepository}









//Sempre p mesmo schema , a implementation recebe a interface do seu arquivo criado.