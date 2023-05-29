import { Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/database/DataSource";
import { ICreateUserTokenDTO } from "../../../DTO/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = AppDataSource.getRepository(UserTokens);
    }

    async create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userToken = await this.repository.findOneBy({
            user_id,
            refresh_token,
        });

        if (!userToken) {
            throw new Error("User token not found."); // ou qualquer outra lógica adequada ao seu contexto
        }

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOneBy({ refresh_token });
        if (!userToken) {
            throw new Error("User Token is null"); // Esse new Error vai dar a partir do momento que eu utilizar o mesmo token mais de uma vez para enviar alterar a mesma senha , sem gerar outro, pq estou utilizando o "deleteById".
        }

        return userToken;
    }
}

export { UsersTokensRepository };
