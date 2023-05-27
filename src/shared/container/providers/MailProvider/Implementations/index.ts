import { container } from "tsyringe";

import { IMailProvider } from "../IMailProvider";
import { EtherealMailProviser } from "./EtherealMailProvider";

container.registerInstance<IMailProvider>(
    "EtherealMailProviser",
    new EtherealMailProviser()
);

// 1 - Aqui neste caso eu não pude utilizar o singleton, tive que utilizar o instaceOf, pq a gente precisa que isso seja gerado antes do client antes da nossa app ser inicializada, se colocasse singlton ele dava erro.
