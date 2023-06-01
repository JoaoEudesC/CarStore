import { body } from "express-validator";

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O name é obrigatório")
            .isLength({ min: 3 })
            .withMessage("O name deve possuir no minimo três caracteres"),
        body("email")
            .isEmail()
            .withMessage("O formato de email deve ser correto nome@email.com")
            .isString()
            .withMessage("O campo de email é obrigatório"),
        body("password")
            .isString()
            .withMessage("O campo password é obrigatório")
            .isLength({ min: 3 })
            .withMessage("A password deve possuir no mínimo três caracteres"),
        body("driver_license")
            .isString()
            .withMessage("O campo driver_license é obrigatório")
            .isLength({ min: 7, max: 7 })
            .withMessage("A driver_license deve possuir 7 caracteres"),
    ];
};

export { userCreateValidation };
