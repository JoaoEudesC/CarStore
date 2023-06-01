import { body } from "express-validator";

const specificationsCreateValidation = () => {
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
    ];
};

export { specificationsCreateValidation };
