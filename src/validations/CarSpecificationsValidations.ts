import { body, param } from "express-validator";

const carSpecificationsCreateValidation = () => {
    return [
        param("car_id").isString().withMessage("O campo car_id é obrigatório"),
        body("specifications_id")
            .isString()
            .withMessage("O campo specifications_id é obrigatório"),
    ];
};

export { carSpecificationsCreateValidation };
