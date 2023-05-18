import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/CreateRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRoutes };

// Como utilizar a rota =>
// 1 - {"expected_return_date":"2023-05-22T19:40:07.393Z","car_id":"087909d7-8b25-45df-b752-02af96034de5"} Temos que passar estas duas informações no corpo da requisição
// 2 - Temos que passar o token do usuário cadastrado que foi gerado apos criar o usuário e passa-lo na rota de login "session"
// 3 - Cada usuário só pode ter um aluguel aberto em seu nome caso o contrário da erro.
// 4 - A data tem que ser passado neste formato , que é o formato do insomnia "timestamp iso" e deve ser passado o return date 24 horas depois da data atual fornecida, porque cada aluguel deve durar pelo menos 24horas.
// 5 - tem que ser passado um id de um carro criado no banco de dados.
