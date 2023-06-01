// Esse arquivo "config" ele vai receber as configurações "suplementares" do nosso projeto

// Dentro deste arquivo config , upload.ts, vai ser onde vai ser isolado as funções de upload do nosso projeto, e é uma boa prática isolar esta parte, pois não é função das rotas passar isso.

import crypto from "crypto";
import multer from "multer";
import { resolve } from "path"; // A gente vai utilizar o "resolve" para que seja possivél , nos passarmos o caminho da nossa pasta

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
    tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder, // Ou seja aqui a gente utilizou o __dirname para dizer que nos estamos diretamente nessa pasta e voltamos duas pastas com os pontos, e passamos o nosso "folder"
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(16).toString("hex"); // Estou fazendo isso para que a gente consiga  criar um nome para o nosso file ("Para que não seja criado arquivos com nomes duplicados na minha pasta tmp"), então ele vai gerar um hash aleatório para cada usuário.
            const fileName = `${fileHash}-${file.originalname}`; // A gente concatenou o hash gerado , com o nome original do nosso arquivo.

            return callback(null, fileName); // A primeira informação que o callback recebe é o erro, portanto neste caso é "nulo" , e o segundo é o nome do arquivo.
        },
    }),
};

// Vou utilizar a função "diskStorage" do multer , para poder passar "o destino do nosso upload e o fileName desse arquivo".

// 1 - A gente possuia uma váriavel "upload" agora nós vamos descartar essa váriavel e vamos exportar o "storage" diretamente.

// 2 - Criei uma váriavel tmpFolder para passar o caminho, porque quando a gente tiver trabalhando local a gente quer salvar os arquivos no "tmp" mas depois a gente quer remover, na aws não , a gente quer deixar os arquivos em produção lá

// 3 -
