//Importação de uuid V4 para a geração do id
import {v4 as uuidV4, } from "uuid"
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm"

//Aqui a gente precisa dizer que essa classe é um referencia para a nossa tabela


@Entity("categories")
class Category{
    @PrimaryColumn()
    id?:string
    @Column()
    name:string;
    @Column()
    description:string;
    @CreateDateColumn()
    created_at:Date;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}


/*
    * Repare que o nome que eu dei na coluna é o  mesmo nome do campo, por isso eu não tenho que passar um "decorator" com o nome da coluna, caso contrário eu teria que passar um decorator @column, com o nome da coluna.
    * O typeOrm já tem um campo especifico para o nosso created_at
    * É um model para cada tabela, ou seja , uma entidade para cada tabela, uma migration para cada tabela

*/










//Na atualização do typescript , o constructor deve ter a tipagem dentro do parametro , sendo assim , quando eu utilizo um constructor e chamo ele eu devo passar os parametros que eu estanciei de
//Eu aqui neste arquivo é onde eu vou criar o modelo , que a minha aplicação deve seguir para a criação da categoria , somente com os campos que eu desejar
//Repare que aqui o que foi preciso foi justamente a criação de uma interface para tipar os valores que vão ser passados no nosso array, dizer que aquele array vai ser um array de ICategory
//Estou realizando essa parte do id , justamente porque eu não quero que a geração do id , seja responsabilidade da rota , por isso eu estou realizando esta condicional, para se não tiver um id , ele gerar , caso possua um id , ele não gera
//O constructor ele é um método, que é chamado quando essa classe , ela é estanciada
//Aqui nos temos que saber exatamente a hora de utilizar interface e de utilizar classe, simplesmente eu poderia tipar aquele array com uma interface , mas como eu tive que escrever um metodo que gerasse o array aqui e não na rota , tive que utilizar o constructor para que eu consiga estanciar esse metodo.
//Fiz essa validação justamente para que eu não precise colocar o id como obrigatório, e ele so seja gerado caso não exista , so com essa validação eu consigo tirar a responsabilidade do router e passar diretamente aqui.






export {Category}