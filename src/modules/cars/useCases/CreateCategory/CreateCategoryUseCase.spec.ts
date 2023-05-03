//A gente precisa testar o resultado, ou seja , qual o resultado que a gente espera que determinada requisição demonstre e ai ele vai mostrar para a gente o resultado que realemnte deu (ai faz a comparação com o resultado que a gente espera, que foi colocado no codigo, com o resultado que deu), se os dois forem iguais mostra sucesso , caso contrário não.

import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "../CreateCategory/CreateCategoryUseCase"

//O describe serve para agrupar os nossos testes, eu coloco dentro dele tudo que está fazendo o nosso teste.
//Para a gente criar os testes, eu tenho que colocar dentro de um "it". , dentro do it a gente descreve o que a gente espera que aquele teste faça.(Como por exemplo, espero que 2 +2 => 4)
//Dentro do expect a gente vai colocar o que a gente espera que aconteça , passando o que a gente espera que aquela variável que está dentro faça.(A gente pode colocar quantos expecs a gente quiser)

//Eu posso criar quantos testes eu quiser , ou seja quantos "it" eu quiser dentro do mesmo describe, ou criar varios describes , no mesmo arquivo de teste("porque o useCase pode ter mais que uma função especifica.")

//Eu posso utilizar o "not.tobe" para negar o resultado para dizer que eu não quero que seja aquele resultado, então por exemplo eu espero que minha soma não seja 5.

let createCategoryUseCase:CreateCategoryUseCase;
let categoriesRepositoryInMemory:CategoriesRepositoryInMemory;
describe("Create Category" , () =>{
    beforeEach(() =>{
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory) //Ou seja, dentro do meu useCase, eu vou passar o meu repository in memory e não o meu repository original, para fazer o teste do useCase, utilizando esse repository "fake".
    })

    it("should be able to create a new category" , async () =>{
        const category = {
            name: "Category Test",
            description: "Category description Test"
        }
        await createCategoryUseCase.execute({
            name:category.name,
            description:category.description
        });

        const categoryCreated =  await categoriesRepositoryInMemory.findByName(category.name)
        
        expect(categoryCreated).toHaveProperty("id") //Passei assim pq a gente sabe que na criação do nosso usuário a gente não possui id, então se ele for salvo com sucesso, vai gerar pra gente a propriedade "id", e assim vai ser comprovado, que o usuário foi salvo e criado ("ele vai toHaveProperty("id")
    });


    it("should be able not be able to create a new category with same name" , async () =>{
        expect(async () =>{
            const category = {
                name: "Category Test",
                description: "Category description Test"
            }
            await createCategoryUseCase.execute({
                name:category.name,
                description:category.description
            });
            await createCategoryUseCase.execute({
                name:category.name,
                description:category.description
            });
        }).rejects.toBeInstanceOf(AppError) //Coloquei toda a função dentro do expec  pq eu espero esse erro de fato , e utilizei a função rejects , para dizer que se ocorrer o erro , ou seja , se for rejeitado porque criou o mesmo erro, ele vai me retornar a instancia do meu "appError".
    });
});




//OBS
// 1 - O Nosso teste unitário não tem a responsabilidade de testar diretamente o nosso banco de dados.
// 2 - Dentro de repositories a gente vai criar um repository "fake", repository in memory para que a gente consiga acessar o useCase e não pegar o arquivo repository diretamente(pq o teste não vai testar o banco de dados diretamente). Sempre que a gente for fazer um teste de um useCase , a gente vai ver tenho o repository memory criado, utilizo ele , (se não a gente cria esse repository memory baseado na implementation).
// 3 - A gente pode chamar a pasta implementations de "postgree" ou "typeorm", já que as implementações de lá se tratam disso.
// 4 - Então aqui a gente vai utilizar o nosso repositório "fake", criado para realizar os testes encima dele , para não fazer testes diretamente no banco de dados.
// 5 - Eu possso utilizar o "beforeEach", que por exemplo , antes de cada de cada teste ele vai realizar essa função que está dentro do beforeEach(Função do javascript)., pq possa ser que eu utilize em vários testes o nosso "Reppsitory in memory".
// 6 - Perceba que no console.log criado ele vai retornar o meu name , a minha description e o meu id:gerado.
// 7 - Perceba que eu fiz dois testes "it" com o mesmo describe, so que o segundo teste já diz respeito a outra função que eu tenho ao criar uma catgeoria, "findByName", para que não possa cadastrar duas categorias com o mesmo name.
// 8 - Repare que para o teste acusar o erro , eu so tive que executar a criação duas vezes, para que no meu teste me der erro e eu teste o "findByName" e em seguida fazer a tratativa, e basicamente essa tratativa é dizer que a gente espera esse erro.
// 9 - 