import { Specification } from "../../infra/typeorm/entities/Specifications";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
        });

        this.specifications.push(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification | null> {
        return (
            this.specifications.find(
                (specification) => specification.name === name
            ) || null
        );
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter(
            (specification) =>
                typeof specification.id === "string" &&
                ids.includes(specification.id)
        );
        return allSpecifications;
    } // Dessa forma eu estou verificando se o id de sepecification é do tipo "string" ou não , se ele for é que eu vou passar o ids.includes, isso porque o typescript espera que eu vou falar seja string, mas ele pode retornar undefinded.
}

export { SpecificationRepositoryInMemory };
