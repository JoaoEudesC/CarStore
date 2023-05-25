import { ICreateUserDTO } from "../DTO/ICreateUserDTO";
import { Users } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<Users | undefined>;
    findById(id: string): Promise<Users>;
}

export { IUsersRepository };

// Os 'isAdmin' não é o usuário que passa para a gente, por isso a gente não vai utilizar aqui
