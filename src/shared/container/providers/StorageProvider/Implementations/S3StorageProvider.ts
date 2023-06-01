import { S3 } from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

dotenv.config();

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        try {
            const fileContent = await fs.promises.readFile(originalName);

            const ContentType =
                mime.getType(originalName) || "application/octet-stream";

            await this.client
                .putObject({
                    Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
                    Key: file,
                    ACL: "public-read",
                    Body: fileContent,
                    ContentType,
                })
                .promise();

            await fs.promises.unlink(originalName);
            return file;
        } catch (error) {
            console.error("Error saving file:", error);
            throw error;
        }
    }

    async delete(file: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
                Key: file, // Corrigido para "Key" em vez de "key"
            })
            .promise();
    }
}

export { S3StorageProvider };

// 1 - Aqui vai ser uma implementação parecida com o localStorage, mas nós vamos utilizar o "aws-sdk"
// 2 - Dentro da "aws-sdk" a gente tem todos os serviçoes da aws que a gente pode utilizar no node.js
// 3 - Um dos parametros para o "s3" é a região que a gente quer utilizar, que está em global, quando voce acessa "bucket" na aws, temos que criar o nosso cliente que vai ser responsável pelo gerenciamento
// 4 - Perceba que eu estou utilizando "orientado a objeto" por isso eu só preciso this.client = new S3 , é a mesma coisa que eu colocar  const client = new S3, porém nas classes eu posso criar as váriaveis como "private" bem no inicio do constructor.
// 5 - a gente vai pegar o arquivo que foi colocado dentro da pasta "tmp" para salvar no s3, porque vai funcionar assim , primeiro vai para o "tmp" se estiver em produção, sobe pro s3.
// 6 - Por isso a gente ta pegando o "originalName" que é o nome do arquivo que foi upado para dentro da pasta "tmp".
// 7 - para inserir um arquivo dentro do "s3", nós vamos utilizar o "putObject" que é o "o nome do bucket" e o "folder" porque lá na amazon a gente vai ter folders dentro do "storage", o que for de avatar vai pra avatar e o que for de "carro" vai pra carro, se não existir uma pasta ele mesmo cria
// 8 - Vamos passar o "acl" que é a permissão do nosso arquivo, se a gente der um "ctrl." a gente consegue ver as permissões que a gente pode utilizar como "public e private", vamos colocar public porque a gente quer que o usuário possa visualizar estas imagens.
// 9 - Se eu colocar o ContentType quando o usuário clicar na url da imagem "ele não vai fazer um dowload automático da imagem" ele vai simplesmente abrir no browser e é isso que eu quero.
// 10 - Para colocar esse "content-Type" nós vamos precisar colocar uma bibilioteca que se chama "mime" npm i mime, é através dessa bibilioteca que a gente consegue pegar esse content type desse nosso arquivo => const ContentType = mime.getType(originalName); com essa função ele já traz o content type deste nosso arquivo
// 11 - A expressão || "application/octet-stream" é usada como um valor padrão para o caso em que não é possível determinar o tipo MIME do arquivo usando a biblioteca mime, sendo assim é obrigatório utilizar no typeScript caso contrário ele retorna erro de tipagem
// 12 - Temos que colocar que o "putObject" é uma "promise" com o .promise(); para que o await funcione

// OBS => Funcionalidade
// 1 - Essa função serve para colocar o arquivo dentro do nosso "s3" e após nós fizermos isso temos que criar a funcionalidade para apagar o arquivo da pasta "tmp", já que ele foi salvo no "s3".
// 2 - E tambem temos que criar dentro da função "delete" a funcionalidade para excluir o arquivo ulpado que está dentro do "s3", a função mais simples.
// 3 - Para testar se está funcionando ou não, a gente pode colocar esse nosso conteiner , no lugar do conteiner do localStorage que já está implementado, só para que a gente consiga testar, porque o localStorage já está funcionando com o upload de avatar.
// 4 - Depois que fizer a requisição é só da um "reload" dentro do nosso bucket e ver se o arquivo foi colocado lá, seguindo a mesma regra do "avatar" que é diferente da dos "carros", se a gente adicionar 2 avatars ele vai remover um e colocar o outro, remove o ultimo do bucket e adiciona um novo.
// 5 - Clique no "bucket" pegue a url de projeto e coloque no navegador que vai mostrar a imagem, se não fosse pelo contentType ele faria dowload da imagem.
// 6 - Nós vamos utilizar uma condicional igual utilizamos para acessar o banco de dados nos testes de integração, se tiver em produção, quero que a o meu "disk" utilize o S3Provider se estiver em "desenvolvimento" quero que utilize o meu "localStorageProvider", para separar estas imagens.
