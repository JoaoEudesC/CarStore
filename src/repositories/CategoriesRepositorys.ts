import { ICategory } from "../model/Category";
import {v4} from "uuid"



//A gente pode utilizar aqui o conceito DTO => Data transfer object , vai ser responsavel por fazer a transferencia de dados entre uma camada e outra, entre uma classe e outra.
interface ICreateCategoryDTO{
    name:string;
    description:string;
}
//Então entenda que ao invés de eu passar diretamente a minha class que ta no model , o Icategory , eu criei um DTO , que nada mais é que um objeto "Inteface" que vai fazer a comunicação entre as duas classes , entre o meu model e o meu repositories, para que a minha rota seja totalmente isolada e não tenha acesso a essas propriedades do meu model.
//Com esse conceito a gente não passa diretamente o name e a description tipadas no parenteses, e a gente pode utilizar este conceito justamente para atender esta necessidade de, o router não precisar saber do nosso modelo.




class CategoriesRepository{
     private categories:ICategory[];
     
     constructor(){
        this.categories = [];
     }
     
     create({description , name} : ICreateCategoryDTO):void{   //Eu que escolhi tipar do tipo void , porque não tem retorno , mas foi escolha minha, não iria ocasionar erro no codigo
        const category = new ICategory("" ,"" , "" , new Date() );
        Object.assign(category , {
            id:v4(),
            name,
            description,
            created_at:new Date() 
        })
    this.categories.push(category)

}
    
    list():ICategory[]{
        return this.categories;
    }

    findByName(name:string): ICategory | undefined{
        //Perceba que com a mesma regra do javascript que nos utilizamos para fazer o carrinho de compras com everton, não é preciso colocar o nome function para criar uma função dentro do constructor., e partir do momento que eu crio um "new" eu posso acessar todos os métodos dentro deste constructor e depois passar os parametros desejados para substituir o que foi passdo na função
        const category = this.categories.find(category => category.name === name);
        return category
    }
}

//Repare que agora tive que fazer a desestruturação novamente pra eu receber as propriedades do ICategory,então eu removi tudo da rota e recebi aqui dentro de outra classe, ou seja , uma classe dentro de outra





export {CategoriesRepository}


//Ainda estamos utilizando um banco de dados ficticio, por isso o insert nos estamos fazendo em um array, imagine que esse array é uma tabela do nosso banco de dados , quem é responsável por essa interação com o banco de dados são os repositories, então esse array quu esta lá na nossa rota , nos temos que trazer pra cá
//Não se pode declarar const dentro de uma class , por isso quando eu trouxe o array categories do nosso router "Nosso banco ficticio" tive que remover o const.
//A gente deve definir esse atributo como publico ou privado, neste caso a gente vai definir como privado, porque so quem vai ter acesso a esse array e essa class é o nosso repository , ele não poderá ser alterado externamente(Utilizamos isso quando formos exportar arrays , variaveis e atributos)
//Ter atenção que sempre que for utilizar uma classs, na maioria das vezes voce vai ter que utilizar um constructor , para conseguiri estanciar como metodo, igual neste caso em que eu tirei um array completo do meu router e trouxe pra cá dessa maneira, mesmo este array esta sendo tipado por outra classe, que está e model




//Repare que eu criei um Create, que será uma função responsável por cadastrar , a nossa categoria , dentro da nossa "Tabela fake"., então ja fica a ideia que o repository vai ser responsavel pela a interação com o banco.




//OBSERVAÇÕES*********************************************************
//OBS => Perceba que todos os métodos que vão ser criados em realação a interação com o banco de dados que digam respeito a categoria , vão estar no CategoriesRepositorys, ou seja , é um arquivo destes para cada tabela
//OBS => para tabela de vendas e categoria por exemplo, são dois arquivos separados, em que vão ser criados uma única classe, com as funç~eos de Listagem , de post , de delete , de update  e etc.
//OBS => até a função findByName, que é para verificar se já existe uma categoria no meu banco e não deixar cadastrar a mesma categoria duas vezes, eu faço aqui no CategoriesRepositorys, que é justamente um tipo de interação com o banco de dados por isso vai ser feito aqui na pasta repositories, na ala da tabalea de Categories.