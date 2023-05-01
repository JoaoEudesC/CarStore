//Essa pasta utils, serve para que a gente coloque funções que possa ser utilizadas mais na frente pela nossa aplicação, como a função delete file, que pode ser que nos utilizemos ela, em outras pasrtes do codigo para deletar arquivos
import fs from "fs"




export const deleteFile = async(filename:string) =>{
    try {
        await fs.promises.stat(filename)
    } catch (error) {
        return;
    }

    await fs.promises.unlink(filename)
}





//E para deletar o file nos vamos utilizar a bibilioteca "fs" nativa do node.js
//A função "stat" verifica se o arquivo existe ou não, na url que a gente passar, no diretorio que a gente passar.
//Ou seja , o stat vai verificar se o arquivo existe, se não existir , ele vai cair no catch e vai retornar e seguir a função normal , porém se existir ele vai cair na função unlink e apagar o file, que foi substituido.