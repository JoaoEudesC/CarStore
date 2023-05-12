import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { createConnection1 } from "../DataSource";

async function create() {
    const connection = createConnection1();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await (
        await connection
    ).query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
        `
    );
    await (await connection).destroy();
}

create()
    .then(() => console.log("User admin created"))
    .catch((error) => console.log(`Error ao criar admin ${error}`));

// Aqui neste arquivo nos estamos injetando na mão os campos dentro do nosso banco de dados utilizando "sql" puro

// 1 - para que a gente possa colocar a propriedade "admin" e gerar um "id" próprio e não dar a oprtunidade do usuário manipular essa propriedade "admin".

// 2 - Nós vamos precisar também criar uma senha criptografada com o bcrypt, perceba que eu defini a senha como "admin"

// 3 - Estou seguindo a mesma ordem para a criação do usuário , passando email , o campo "true" é o campo "admin", o campo newDate é o "createdAt".

// 4 - Depois eu tenho que criar um then como validação , para saber se deu certo ou não

// 5 - Repare que o nome "isAdmin" é o nome da coluna no banco de dados "Estou utilizando o INSERT INTO USERS" para inserir este campo na tabela users, ou seja , coloque nos campos (os "values", passados abaixo) é "sql" puro.

// 6 - o "isAdmin" precisa estar em forma de string, caso contrario da erro.
