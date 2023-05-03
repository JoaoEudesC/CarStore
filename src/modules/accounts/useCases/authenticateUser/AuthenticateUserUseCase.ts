import {compare}  from "bcrypt"
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv"
import { AppError } from "../../../../shared/errors/AppError";
dotenv.config()



interface IRequest{
    email:string;
    password:string
}

interface  IResponse {
    user:{
        name:string
        email:string //Estou criando essa interface para retornar somente o nome e o email , pq eu nao quero o retorno da senha(eu poderia colocar:user.email , user.name) mas assim fica mais sintatico, e passo essa interface como o retorno do "execute" Promise<IResponse>
    },
    token:string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository:IUsersRepository
    ){}
    //se o email está correto
    async execute({email , password}:IRequest):Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email)
        if(!user){
            throw new AppError ("Email or password incorrect" , );
        }
        
        //Se a senha esta correta
        const passwordMatch = await compare(password , user.password)//Comparação da senha passada, com a senha registrada no banco de dados
        if(!passwordMatch){
            throw new AppError ("Email or password incorrect");
        }

        
        //Geração de token
        const SECRET = process.env.SECRET //Variavel de ambiente
        if(!SECRET){
            throw new AppError("SECRET NÃO VALIDADO")
        }
        
        const token = sign({user:user.name} , SECRET , {
            subject:user.id,
            expiresIn:"1d"
        });


        const tokenReturn:IResponse = {  //Tive que tipar um IResponse, para poder passar as informações que eu quero retornar, então criei uma variavel e tipei com minha interface.
            token,
            user:{
                name: user.name,
                email: user.email
            }
        }
        return tokenReturn;
    }
}

export {AuthenticateUserUseCase}



//O nosso metodo "execute" ele vai receber somente duas informações que é o email e a senha , é como se fosse um sitema de login


//****** O que precisamos fazer dentro deste authenticateUseCase function(Tem que seguir estes tres passos na ordem)
// 1 - Usuário existe

// 2 - Senha está correta(De acordo com o cadastro feito)

// 3 - Gerar o jwt 

//****** Observações

//O jeito vai ser sempre o mesmo , de criar os outros useCases, ou seja , utilização do conteiner, criado no "shared",e criação , porem neste caso a gente ja tem a função que verifica se o usuário existe.
//Repare na utilização do "throw new error", ja que nos não possuimos o 'res' aqui , assim como nos fazemos na arquitetura "msc"
//Dentro do "bcrypt" nos vamos utilizar a função compare , para verificar a hash da senha que está no banco de dados , para comparar se o usuário passou a senha correta.
//