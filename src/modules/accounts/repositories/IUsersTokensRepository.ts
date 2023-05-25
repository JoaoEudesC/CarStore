import { ICreateUserTokenDTO } from "../DTO/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens>;

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens>; // Aqui ele vai retornar um array porque o usuário vai poder ter mais de um token.

    deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
