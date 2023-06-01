import { inject, injectable } from "tsyringe";

import { IUsersResponseDTO } from "../../DTO/IUsersResponseDTO";
import { UserMap } from "../../mapper/UserMap";
import { IUsersRepository } from "../../repositories/IUserRepository";

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<IUsersResponseDTO> {
        const user = await this.userRepository.findById(id);
        return UserMap.toDTO(user);
    }
}

export { ProfileUserUseCase };
