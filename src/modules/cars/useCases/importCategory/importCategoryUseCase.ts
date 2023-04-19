//Este é o modulo de stream nativo do node que nos vamos utilizar para ler o nosso arquivo que foi uploaded (que é o "file system")
import fs from "fs";


//Importação de bibilioteca para leitura do nosso arquivo csv
import {parse as csvParse} from "csv-parse"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";


//Interface do array que vai salvar todas as informções da nossa categoria do file
interface IImportCategory{
    name:string;
    description:string;
}

@injectable()
class ImportCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository:ICategoriesRepository
        ){}
    
    loadCategories(file: Express.Multer.File):Promise<IImportCategory[]>{
        return new Promise((resolve , reject) =>{
            const stream = fs.createReadStream(file.path) //Função que permite a leitura do nosso arquivo em partes
            const categories:IImportCategory[] = [] //array que vai salvar os dados do nosso file
            const parseFile = csvParse()
            stream.pipe(parseFile) //Dentro desta variável stream agora possui várias funções a serem utilizadas, (A que vamos utilizar será a função "pipe" => Pega o nosso stream, e dentro dele ele joga o que foi lido para o lugar que a gente determinar, para uma função, ou até mesmo para um outro arquivo.)
            //O pipe ele vai pegar o pedaço lido deste nosso arquivo e passar para o nosso parseFile, para que a gente possa manipular este file.
            parseFile.on("data" , async (line) => {
                // ["name" , "description"]
                const [name , description] = line //Desestruturação do array, ele retorna para a gente duas posições do array , nome e description , vou desestruturar(Então ele já vai entender que cada posição daquela vai ser posta dentro da variável)
                categories.push({
                    name:name,
                    description:description
                })
            }) //Dentro dessa função parseFile ela tem vários metodos , o que  a gente vai utilizar será on "Data " ele vai pegar o data , que são as nossas linhas , uma de cada vez, e cada linha vai simbolizar um array , com as propriedades dentro.
                //ele ta lendo linha por linha , pedaço por pedaço dentro do nosso pipe
                .on("end" , () => {
                    fs.promises.unlink(file.path)
                    resolve(categories)
                })
                .on("error" , (err:any) => {
                    reject(err)
                })
                
                
        })
        
        }
        
        async execute(file:Express.Multer.File):Promise<void>{
        const categories = await this.loadCategories(file) //Aqui neste caso eu poderia utilizar async e await , ou then and catch , utilizei async and await
        categories.map(async (category) => {
            const {name , description} = category;
            const existCategory = await this.categoriesRepository.findByName(name)

            if(!existCategory){
                await this.categoriesRepository.create({
                    name, 
                    description
                })
            }
        })   //Adcionando os dados do upload dentro do nosso banco de dados(Eu estou basicamente dizendo que se essa categoria não existir no nosso banco , ele vai criar uma nova , com o nosso metodo create, que foi criado lá no nosso repositório)
    }


}



//O nosso execute ele vai receber o arquivo que a gente está esperando dentro do nosso request , la no nosso controller "O arquivo "file""
//O nosso arquivo "ccv" está dividido (name , description) , e temos três linhas (Ou seja , três categorias e três descrições) sendo assim eu quero ler cada linha como se fosse uma categoria a ser cadastrada
//No final esta class vai pegar o arquivo que a gente está adicionando dentro do nosso tmp quando faz a requisição
//Preciso passar estes dados recebidos de file para dentro do "repositorie CreateCategory", para adicionar estes arquivos no cadastro , por isso recebi o constructor(Sempre que eu quiser receber outra classe , eu recebo um constructor private com o arquivo e a tipagem)
//Eu vou salvar esse file dentro de um array e esse array eu vou salvar no meu "banco de dados" assim ele já vai formatado.
//A load categories vai ser responsavel por fazer a leitura das nossas categorias.


export {ImportCategoryUseCase}


