import { Request , Response } from "express";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

//A gente pode utilizar uma leitura mais simples que seria utilizando o "read File" do node.js, mas tem um problema em utiliza-lo => Para este caso não tem problema pq estamos trabalhando com um arquivo de tres linhas.
//Imagina que a gente estivesse trabalhando com um arquivo pesado de 2000 linhas, o read file ele faz a leitura toda de uma vez deste nosso arquivo, então pode ser que na leitura a nossa aplicação fique pesada e consuma muita memoria do nosso servidor
//E para isso , a gente vai utilizar o conceito de stream dentro do node para realizar esta leitura.



class ImportCategoryController {
    constructor(private importCategoryUseCase:ImportCategoryUseCase){}
    async handle(req:Request , res:Response):Promise<Response>{
        const {file} = req;
        if (!file) {
            return res.status(400).json({ error: 'File not provided' });
        }
        try {
            await this.importCategoryUseCase.execute(file);
            return res.status(201).send();
            } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
            }

    }
}


export{ImportCategoryController}


//Quando eu tipo a função como response, eu tenho que receber algum retorno, ou seja, se não tiver return , da erro , eu só não retorno nada se for do tipo "void"
//Então repare que todas as funções do Controller recebe uma tipagem "Response" , pq elas vão retornar algo
//