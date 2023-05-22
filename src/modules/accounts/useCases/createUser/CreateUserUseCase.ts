import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import {
    ICreateUserDTO,
    IUsersRepository,
} from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 10); // O número significa o salt da senha, para dificultar o hash.

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
