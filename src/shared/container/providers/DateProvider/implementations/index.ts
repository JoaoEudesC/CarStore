// Aqui vai todas as injeções de dependências que forem referentes aos providers dentro desse index, ou seja qualquer provedor de bibilioteca no geral que precisar ter injeção de dependencia vai aqui dentro.

import { container } from "tsyringe";

import { IDateProvider } from "../IDateProvider";
import { DayjsDateProvider } from "./DayjsDateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
