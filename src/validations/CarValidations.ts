import { body } from "express-validator";

export const carCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O campo name é obrigatório")
            .isLength({ min: 2 })
            .withMessage("O nome deve possuir no minimo dois caracteres"),
        body("description")
            .isString()
            .withMessage("O campo description é obrigatório")
            .isLength({ min: 4 })
            .withMessage(
                "A description deve possuir no minimo quatro caracteres"
            ),
        body("daily_rate")
            .isNumeric()
            .withMessage("O campo daily_rate é obrigatório"),
        body("license_plate")
            .isString()
            .withMessage("O campo license_plate é obrigatório")
            .isLength({ min: 7, max: 7 })
            .withMessage("O license_plate deve possuir sete caracteres"),
        body("fine_amount")
            .isNumeric()
            .withMessage("O campo fine_amount é obrigatório"),
        body("brand")
            .isString()
            .withMessage("O campo brand é obrigatório")
            .isLength({ min: 2 })
            .withMessage("A brand deve possuir no minimo dois caracteres"),
        body("category_id")
            .isString()
            .withMessage("O campo category_id é obrigatório")
            .withMessage("O category_id deve ser do tipo uuid"),
    ];
};

// Perceba que eu utilizo o body, então ele valida tudo que for passado no body da requisição, posso acessar a propriedade "query" como tambem posso acessar a propriedade "header".
