// Esse arquivo "config" ele vai receber as configurações "suplementares" do nosso projeto

// Dentro deste arquivo config , upload.ts, vai ser onde vai ser isolado as funções de upload do nosso projeto, e é uma boa prática isolar esta parte, pois não é função das rotas passar isso.

import multer from "multer"
import {resolve} from "path"    //A gente vai utilizar o "resolve" para que seja possivél , nos passarmos o caminho da nossa pasta
import crypto from "crypto"

export default {
    upload(folder:string){
        return {
            storage:multer.diskStorage({
                destination: resolve(__dirname , ".." , ".." , folder), //Ou seja aqui a gente utilizou o __dirname para dizer que nos estamos diretamente nessa pasta e voltamos duas pastas com os pontos, e passamos o nosso "folder"
                filename: (request, file, callback) =>{
                    const fileHash = crypto.randomBytes(16).toString("hex") //Estou fazendo isso para que a gente consiga  criar um nome para o nosso file ("Para que não seja criado arquivos com nomes duplicados na minha pasta tmp"), então ele vai gerar um hash aleatório para cada usuário.
                    const fileName = `${fileHash}-${file.originalname}` // A gente concatenou o hash gerado , com o nome original do nosso arquivo.

                    return callback(null , fileName) //A primeira informação que o callback recebe é o erro, portanto neste caso é "nulo" , e o segundo é o nome do arquivo.
                }
            })
        }
    }
}



// Vou utilizar a função "diskStorage" do multer , para poder passar "o destino do nosso upload e o fileName desse arquivo"