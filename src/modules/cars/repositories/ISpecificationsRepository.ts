import { ICreateSpecificationDTO } from "../DTO/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specifications";

interface ISpecificationsRepository {
    create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification | null>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
