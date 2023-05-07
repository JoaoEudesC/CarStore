import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";




class CreateCarController {
    async handle(req: Request , res:Response):Promise<Response>{
        const {name, description , daily_rate, license_plate , fine_amount , brand , category_id} = req.body;

        const createCarUseCase = container.resolve(CreateCarUseCase)

        const car = await createCarUseCase.exexute({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand, 
            category_id
        });

        return res.status(201).json(car)
    }
}



export {CreateCarController}


// 1 - Perceba que a única diferença deste controller para os demais é que eu estou enviando um "status Code" como retorno , assim como o objeto criado.

// 2 -  Assim como foi feito de costume nas suas outras apis, de retornar um objeto criado.

// 3 -  Quando for testar a aplicação no "insomnia", voce vai pegar o "id" da categoria criada no "CreateCategory" e passar no campo "category_id" do teste "create-cars".

// 4 - 