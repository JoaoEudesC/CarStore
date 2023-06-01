import { body } from "express-validator";

export const rentalsCreateValidation = () => {
    return [
        body("car_id").isString().withMessage("O campo car_id é obrigatório"),
        body("expected_return_date")
            .isString()
            .withMessage("O campo expected_return_date é obrigatório"),
    ];
};
