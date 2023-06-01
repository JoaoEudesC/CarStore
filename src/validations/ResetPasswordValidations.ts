import { body } from "express-validator";

const resetPasswordCreateValidation = () => {
    return [
        body("password")
            .isString()
            .withMessage("O campo password é obrigatório")
            .isLength({ min: 3 })
            .withMessage("A password deve possuir no mínimo três caracteres"),
    ];
};

export { resetPasswordCreateValidation };
