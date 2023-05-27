import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { token } = req.query;
        const { password } = req.body;

        const resetPasswordUserUseCase = container.resolve(
            ResetPasswordUserUseCase
        );

        await resetPasswordUserUseCase.execute({
            token: String(token),
            password,
        });

        return res.send();
    }
}

export { ResetPasswordUserController };

// 1 . O query Parametrs significa que esse campo vai ser passado na url => ex:  http://localhost:3333/password/reset?token=
