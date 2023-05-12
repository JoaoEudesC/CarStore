// Repare que a estrutura para quase todos os arquivos de criação segue a mesma lógica e o mesmo schema , somente  muda pouquissimas coisas , o implemnetation , entities , migrations , useCases , controllers , Interfaces, geralmente segue a mesma logica em cada arquivo.
import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/database/DataSource";
import {
    IUsersRepository,
    ICreateUserDTO,
} from "../../../repositories/IUserRepository";
import { Users } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<Users>;
    constructor() {
        this.repository = AppDataSource.getRepository(Users);
    }

    // Função de criação de usuários.
    async create({
        name,
        email,
        driver_license,
        password,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const User = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id,
        });

        await this.repository.save(User);
    }
    // Função de verificar se o usuário já está cadastrado no banco de dados.
    async findByEmail(email: string): Promise<Users | undefined> {
        const user = await this.repository.findOne({ where: { email } });
        return user || undefined;
    }

    // Função findById(Vamos achar o usuário pelo id, para utilizar junto com a autenticação)
    async findById(id: string): Promise<Users> {
        const user = await this.repository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with this id ${id} not found`); // Perceba que nos dois casos eu tenho que fazer essa validação, pq possa ser que o resultado retorna null e eu tipei como string, por isso dá erro no typescript.
        }
        return user;
    }
}

export { UsersRepository };

// Sempre p mesmo schema , a implementation recebe a interface do seu arquivo criado.
