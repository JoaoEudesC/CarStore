import { ICreateUserDTO } from "../IUserRepository";
import { users } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUserRepository";


class UsersRepositoryInMemory implements IUsersRepository{
    users:users[] = [];
    async create({driver_license , email , name , password}:ICreateUserDTO): Promise<void> {
        const user = new users();
        Object.assign(user , {
            driver_license,
            email,
            name, 
            password
        });
        this.users.push(user);
    }
    async findByEmail(email: string): Promise<users | undefined> {
        //A gente pode criar uma variavel e retornar a variável direto igual nos estavamos fazendo , ou podemos dar logo um return , como vou fazer aqui abaixo.
        return this.users.find(user => user.email === email) || undefined //Eu posso fazer uma verificação com if , como tbm posso utilizar o operador logigo "||" no retorno(muito mais prático).
    }
    async findById(id: string): Promise<users> {
        const user =  this.users.find((user) => user.id === id)
        return user || {} as users //Outra forma de validação , estou dizendo que o retorno da função pode ser o "user" ou um objeto vazio como users ou seja "undefined".
    }
}






export {UsersRepositoryInMemory}


//Esse é o mesmo arquivo criado para que a gente não trabalhe diretamente com o banco de dados, e sim com ele em memoria "array" para realizar os testes.