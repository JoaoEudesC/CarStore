import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/devolutionRentalController";
import { ListRentalsByUserController } from "../../../../modules/rentals/useCases/listRentalsByUser/listRentalsByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
    // Para testar essa rota nós vamos ter que passar o "id" do createRentals como parametro para "entregar" o carro e fechar aquele aluguel e estar autemticado para passar o token(Rota:Devolution);
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalController.handle
);
rentalRoutes.get("/", ensureAuthenticated, listRentalsByUserController.handle);

export { rentalRoutes };

// Como utilizar a rota =>
// 1 - {"expected_return_date":"2023-05-22T19:40:07.393Z","car_id":"087909d7-8b25-45df-b752-02af96034de5"} Temos que passar estas duas informações no corpo da requisição
// 2 - Temos que passar o token do usuário cadastrado que foi gerado apos criar o usuário e passa-lo na rota de login "session"
// 3 - Cada usuário só pode ter um aluguel aberto em seu nome caso o contrário da erro.
// 4 - A data tem que ser passado neste formato , que é o formato do insomnia "timestamp iso" e deve ser passado o return date 24 horas depois da data atual fornecida, porque cada aluguel deve durar pelo menos 24horas.
// 5 - tem que ser passado um id de um carro criado no banco de dados.
// 6 - Após o carro ser alugado, ou seja , passar o "expected return date" o status do carro na tabela cars, tem que mudar para "false". e quando devolvido mudar para "true"
