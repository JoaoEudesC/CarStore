import { Specification } from "../../entities/Specifications";
import { ISpecificationsRepository , ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository{
    private specifications: Specification[];

    constructor(){
        this.specifications = []  //Perceba que é assim que eu inicializo um array ou qualquer propriedade que esteja definida na minha classe através do constructor
    } 
    
    create({ name, description }: ICreateSpecificationDTO): void {
        const specifiction = new Specification("" , ""  , "" , new Date() ) //Lembrando que quando a gente da esse new Specification ele vai criar para a gente

                //Há duas formas de eu declarar isso aqui => const specifiction = new Specification("" , name  , descrption , new Date() ) => eu não passo o id , pq o id eu já defini na criação do model, ou seja, vai ser igual a v4(), ou seja , o Object Assign ele está passando o objeto para dentro do nosso specification
        Object.assign(specifiction, {
            name:name,
            description:description,
            created_at:new Date()
        });

        this.specifications.push(specifiction)
    }
    findByName(name:string):Specification|undefined{
        //Repare que a ordem de execução é a mesma muita parecida e igual
        const specification = this.specifications.find(specification => specification.name === name)
        return specification //Eu coloco do tipo undefined, porque ele pode dar indefinido tbm , pq ele pode achar ou não

    }//Repare que até o modelo de criar o "Middleware que é a função do findByName" é parecida, se fosse outra função, tbm seguiria o mesmo padrão

    
}





//Aqui eu estou fazendo a implementação de  do meu ISpecifcationsRepository que é justamente a função Create , que eu possuo lá, e estou recebendo esta interface através de =>  ICreateSpecificationDTO

export {SpecificationsRepository}