// Esse Arquivo vai ser destinado somente ao envio do email ao usuário para recuperação de senha, é a rota especifica só para isso (Separação de responsabilidades);

import { Router } from "express";

import { ResetPasswordUserController } from "../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { resetPasswordCreateValidation } from "../../../../validations/ResetPasswordValidations";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

// Rota para envio de email de recuperação de senha
passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);

// Rota para reset de password
passwordRoutes.post(
    "/reset",
    resetPasswordCreateValidation,
    resetPasswordUserController.handle
);

export { passwordRoutes };

// =>  Para testar essa rota: forgot

// 1 - Você deve pegar um email de usuário que está cadastrado no banco de dados e passar no body "email":"emailCadastrado".

// =>  Para testar essa rota: reset

// 1 - Preciso copiar e colar o token enviado no email e colar na url

// 2 - http://localhost:3333/password/reset?token=shjskaskhskjhakshk, essa é a url
