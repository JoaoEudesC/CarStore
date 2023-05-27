import { ICreateUserTokenDTO } from "../../DTO/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private usertokens: UserTokens[] = [];

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

        this.usertokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userToken = this.usertokens.find(
            (usertokens) =>
                usertokens.user_id === user_id &&
                usertokens.refresh_token === refresh_token
        );
        if (!userToken) {
            throw new Error("User token not found"); // ou lançar o erro personalizado da sua preferência
        }

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const index = this.usertokens.findIndex(
            (usertokens) => usertokens.id === id
        );
        this.usertokens.splice(index, 1);
    }

    findByRefreshToken(refresh_token: string): Promise<UserTokens | undefined> {
        const userToken = this.usertokens.find(
            (ut) => ut.refresh_token === refresh_token
        );
        return Promise.resolve(userToken);
    }
}

export { UsersTokensRepositoryInMemory };
