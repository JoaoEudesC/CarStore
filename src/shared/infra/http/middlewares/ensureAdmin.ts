import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../../shared/errors/AppError";


export async function ensureAdmin(req:Request,res:Response,next:NextFunction){
    const {id} = req.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if(!user.isAdmin){
        throw new AppError("User is not Admin"); //Se o campo isAdmin for "true" não vai dar erro, caso o contrário vao nos forncecer um erro, para isso voce vai ter que logar com o usuário administrador que está criado no banco através do seed.
    }

    return next()
}