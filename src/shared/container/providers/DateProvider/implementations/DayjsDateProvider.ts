import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow() {
        return dayjs().toDate();
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }
}

export { DayjsDateProvider };

// OBS  => O IMPORTANTE DE UTILIZAR IMPLEMENTAÇÕES POR MEIO DE UMA PASTA "IMPLEMENTATIONS" PARA IMPLEMENTAR A INTERFACE ATRAVÉS DE UM METÓDO PARA QUE O CÓDIGO FIQUE MAIS MODULAR E LEGIVEL FAZENDO COM QUE A GENTE CONSIGA SE QUISERMOS ALTERAR A BIBILIOTECA, SOMENTE IR NA "IMPLEMENTATIONS" E TROCAR A IMPORTAÇÃO DA BIBILIOTECA, PORÉM UTILIZANDO A MESMA INTERFACE E CÓDIGO.
// 1 - Então toda essa implementação e função poderia ter sido passada diretamente no arquivo useCase da regra de negócio porém não ficaria tão organizado e legivel mas resultaria da mesma forma.
// 2 - O end-date vem sempre primeiro, depois é que vem "start Date";
// 3 - Repare que a gente está tirando toda a responsabilidade do useCase porque o useCase não tem a responsabilidade de "formatar hora" essa responsabilidade deve ser passada para que ocorra uma divisão maior de responsabilidades.
// 4 - Perceba que a gente teria que utilizar essa bibilioteca "dayjs" lá no outro arquivo e ele iria dar erro pq nós não devemos importar a bibilioteca lá, já que estamos dividindo responsabilidades, então eu criei um "dateNow" com a importação da bibilioteca diretamente aqui para que eu possa receber lá através da classe.
// 5 - A gente montou uma implementação para comparar os dias ao invés de a gente passar "hours" a gente vai passar days.
// 6 - A lógica é a mesma e é montado primeiro na interface e de pois aqui neste arquivo, este arquivo é como se fosse um useCase.
