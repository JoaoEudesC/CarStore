// Aqui neste arquivo nós vamos realizar o conceito de "mapper" que é quando a gente não quer retornar para o usuário o  "objeto" completo, só algumas informações de forma melhorada, como é o caso da nossa rota profile em que a gente quer retornar uma "url" acessível e não quer retornar a senha hasheada do usuário quando a gent dar um "get" neste usuário.
import { plainToClass } from "class-transformer";

import { IUsersResponseDTO } from "../DTO/IUsersResponseDTO";
import { Users } from "../infra/typeorm/entities/User";

class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url,
    }: Users): IUsersResponseDTO {
        const user = plainToClass(Users, {
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url,
        });

        return user;
    }
}

export { UserMap };

// 1 - Perceba que eu estou fazendo uma função baseada nas minhas entidades, de User só com as informações que eu quero retornar no get, na rota profile, esse mapper vais ser utilizadfo somente neste para retornar as informçãoes que eu quero nessa rota.
// 2 - Ela vai utilizar a tipagem do IUserReposenDto que é justamente a interface que eu cou criar com somente as informações que eu quero retornar.
// 3 - Eu estou dizendo que vai ser do tipo "users" e users vai ser do tipo "IUsersResponseDTO" eu estou tipando duas vezes.
// 4 - Geralmente onde ta a segunda tipagem "IUsersResponseDTO" eu coloco "promise<algo>" neste caso vai ser meu dto.
// 5 - Então no nosso useCase de profile ao invés de retornar o nosso "PromiseUser" vou retornar o meu "IUsersResponseDTO" e importo esse mapper para complementar a minha função, passando o meu user , da função findById para dentro dele.
// 6 - Para que a gente consiga acessar essa url,  agente vai ter que importar uma função do nosso "classTransformer" => plainToClass, ele vai fazer uma leitura do avatar_url que a gente criou no "Exposs"
// 7 - Na função plainToClass eu tenho que passar a entidade que eu to referenciando a class, para transformar esse obejto em ums inatancia da classe users, para que eu possa pegar a informação desejada, que está na minha classe de entidade que é "avatar_url" com essa função eu consigo pegar os campos que está no "expose" e retornar ele somente na classe que eu quiser., posso criar qualquer campo lá e exibir dessa forma como eu quiser.
// 8 - Eu vou retornar um dado que eu não vou salvar no meu banco de dados.
