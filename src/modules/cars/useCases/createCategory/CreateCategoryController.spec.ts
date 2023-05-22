// O arquivo .spec.ts vão ser todos os arquivos de teste a diferença do teste de integração será o nome "controller" que vai ser caracteristico dos arquivos de teste de integração.
import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { createConnection1 } from "../../../../shared/infra/database/DataSource";
import { app } from "../../../../shared/infra/http/app";

let connection: Connection;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection1();
        await connection.runMigrations();
        const id = uuidV4();
        const password = await hash("admin", 10);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });
        const { token } = responseToken.body;
        const categoryName = `Category_${uuidV4()}`;
        const response = await request(app)
            .post("/categories")
            .send({
                name: categoryName,
                description: "Description Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });
        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category with name that already exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });
        const { token } = responseToken.body;
        const categoryName = `Category_${uuidV4()}`;

        // Cria uma categoria com um nome único
        const response1 = await request(app)
            .post("/categories")
            .send({
                name: categoryName,
                description: "Description Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });
        expect(response1.status).toBe(201);

        // Tenta criar uma segunda categoria com o mesmo nome
        const response2 = await request(app)
            .post("/categories")
            .send({
                name: categoryName,
                description: "Description Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });
        expect(response2.status).toBe(400);
    });
});

// OBS => Repare que para montar tanto testes de integração como testes unitários muda a bibilioteca mas segue-se uma linha de raciocinio, tambem utilizamos o "describe por exemplo".
// 1 -  A gente vai utilizar o nosso "app" que foi separado e extraido.
// 2 -  Esses testes de integração vai testar a "rota" inteira por isso depois do meu "app" eu tenho acesso a todas as rotas que eu tenho na aplicação e assim eu posso utilizar o expect => ex => describe("Create Category Controller", () => {it("should return a 200 status code", async () => {await request(app).get("/cars/available").expect(200);});}); essa é uma rota que eu tenho na minha aplicação, então eu acessei ela e espero receber um codigo (200), se essa rota realmente entregar isso o teste passa.
// 3 - Para testar => "npm test" e o docker deve estar rodando, porque visto que ele está testando a funcionalidade total da rota se o docker não estiver rondando ele vai ocasionar um erro

// ## LOGICAS DAS REQUISIÇÕES:

// 1 - POST => A gente para testar a rota tem que enviar exatamente o que é passada naquela rota de "post" ou seja o campos como "name" "categories" para que possa ser testada essa rota e essa lógica serve para todos os testes com esse verbo http.
// 2 - Repare que a gente deve utilizar um "expect" para que a gente consiga falar o que a gente espera a seguir que seja feito um " post " com aquelas credencias necessárias e sendo assim verificar isso é como funciona para as rotas de "post por exemplo"

// ## REGRAS DO TESTE

// 1 - Para cadastrar uma categoria o usuário deve estar autenticado então nos vamos ter que fazer essa parte também no nosso teste, prestar atenção nos detalhes do teste caso o usuário deva ser autenticado, ser administrador, estar cadastrado para passar tudo no nosso teste.
// 2 - A gente vai ter que importar dentro do nosso banco um usuário administrador então vai ser exatamente a mesma lógica que foi utilizada para montar o seed, nós vamos adicionar o usuário diretamente no banco com "sql puro"
// 3 - Com o usuário criado e inserido a gente vai poder logar na aplicação para recuperar o token "gerado" e utiliza-lo para fazer a requisição, que deve ser feita somente por um usuário autenticado.
// 4 - Vamos pegar a resposta deste token com a categoria do "SuperSet" que é o nosso app para que a gente consiga acessar a rota "sessions" e pegar o token enviando o usuário criado nela para gerar o token , que antes de postar as categorias que a gente estar acessando a rota de categorias a gente precisa estar com o usuário logado.

// ## Criação das tabelas para teste no banco de dados

// 1 - "await connection.runMigrations();"" => coloco este comando na função deixando claro que antes de cada teste eu vou rodar todas as nossa migrações
// 2 - Utilizei o beforeAll para que eu não precise ficar zerando sempre depois de cada teste.
// 3 - Utilizei o beforeAll pq vai acontecer isso antes de todos os testes eu só utilizo o beforeEach quando eu quero realizar alguma configuração ou reinicialização antes de cada teste individulamente
// 4 - beforeAll: É executado apenas uma vez antes de todos os testes dentro do bloco describe. Neste caso, é utilizado para estabelecer a conexão com o banco de dados, executar as migrações necessárias e inserir um usuário de teste. Após a execução de todos os testes dentro do bloco describe, o afterAll é chamado para limpar o banco de dados e destruir a conexão com o banco de dados.
// 5 - adicionar este comando => --detectOpenHandles ao jest no packje json para que mostre informações caso algo esteja impedindo de finalizar o teste.
// 6 - Para testar se ele realmente está criando no banco de dados remova a linha => "await connection.dropDatabase();" e veja se as migrations estão ficando no banco de dados quando rodamos o teste.

// ## Token

// 1 - Vamos passar o token gerado para as categorias para poder criar uma categoria e rodar o teste com sucesso.
// 2 - O token gerado a gente passa no "set" => .set({Authorization: `Bearer ${token}`,});

// ## should not be able to create  a new category with name exists

// ## 1 - Eu copiei e colei o mesmo codigo para ele fazer um post do admin novamente só que não pode, porque eu estou esperando que der um erro "400" quando eu ele criar dois usuários com o mesmo nome, ele não vai permitir a gente salvar se o status for "400" que é o status que esta proibido cadastrar usuários iguais com mesmas informações, neste caso é o name.
// ## 2 -
