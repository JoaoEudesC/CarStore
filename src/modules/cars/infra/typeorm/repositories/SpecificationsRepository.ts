import {  Repository , In } from "typeorm";
import {AppDataSource} from "../../../../../shared/infra/database/DataSource";
import { Specification } from "../entities/Specifications";
import { ISpecificationsRepository , ICreateSpecificationDTO  } from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository{
    private repository: Repository<Specification>
    constructor(){
        this.repository = AppDataSource.getRepository(Specification)
        
    } 
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification>{
        const specification =  this.repository.create({
            description,
            name
        });
        await this.repository.save(specification)

        return specification;

        
        
    }
    async findByName(name:string):Promise<Specification | null>{
        const specification = await this.repository.findOneBy({name})
        return specification
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findBy({ id: In(ids) }); //O metodo findByIds is "deprecated" por isso agora nós temos que utilizar o metodo dessa forma.
        return specifications;
    }
    

}

export {SpecificationsRepository}