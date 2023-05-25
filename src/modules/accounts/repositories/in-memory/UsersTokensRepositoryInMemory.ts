import { ICreateUserTokenDTO } from "../../DTO/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private tokens: UserTokens[] = [];

    async create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            expires_date,
            user_id,
            refresh_token,
        });

        this.tokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userToken = this.tokens.find(
            (token) =>
                token.user_id === user_id &&
                token.refresh_token === refresh_token
        );
        if (!userToken) {
            throw new Error("User token not found"); // ou lançar o erro personalizado da sua preferência
        }

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const index = this.tokens.findIndex((token) => token.id === id);
        this.tokens.splice(index, 1);
    }
}

export { UsersTokensRepositoryInMemory };
