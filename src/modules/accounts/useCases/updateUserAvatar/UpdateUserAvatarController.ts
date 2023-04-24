//Aqui vai ser o nosso controller do update do avatar
//Basicamente esse upload de avatar ele só vai funcionar para usuários autenticados, ou seja , usuários que fizeram o cadastro(ele não vai ser obrigatório na criação da conta), porém ao criar a a conta, você terá acesso a esse upload de avatar.

import { Request , Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";



export class UpdateUserAvatarController{

    async handle(req:Request , res:Response):Promise<Response>{
        //A gente vai fazer a busca dos dados deste usuário, através do "middleware" ensureAuthenticate.
        const {id} =  req.user;
        //Receber arquivo
        const avatar_File = req.file?.filename;
        if(!avatar_File){
            throw new Error ("Avatar undefined")    //Então basicamente tive que fazer essa verificação, porque o valor do file pode vir undefined e eu tipei como string , asi o ts da erro, fazendo isso eu consigo tratar caso esse file venha indefinido
        }

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

        await updateUserAvatarUseCase.execute({user_id:id , avatar_File})
        
       return res.status(204).send() //O codigo 204 , "no content" que é geralmente quando a gente faz uma alteração, mas não estamos passando de fato nenhum objeto , nenhum json como retorno


    }
}