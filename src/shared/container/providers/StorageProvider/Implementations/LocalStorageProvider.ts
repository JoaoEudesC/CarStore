import fs from "fs";
import { resolve } from "path";

import upload from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file),
            resolve(`${upload.tmpFolder}/${folder}`, file)
        );
        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(
            resolve(`${upload.tmpFolder}/${folder}`, file)
        );

        try {
            await fs.promises.stat(filename);
        } catch (error) {
            return;
        }

        await fs.promises.unlink(filename);
    }
}

export { LocalStorageProvider };

// 1 - Perceba que é sempre a mesma lógica, nós temos que passar o "implements" para conseguir da um "autocomplete" das funções da interface e utilizar dentro de uma class especifica.
// 2 - Nós estamos implementando uma interface a determinada class para utilizar as suas funções.
// 3 - Salvamento local => A gente vai ter que receber uma outra informação que é o "folder" aqui a gente vai dizer, se vai para o "avatar" ou se vai para o "carros", porque a gente tava passando o caminho direto na rota de "avatar" e agora a gente vai utilizar o mesmo "provider" para todos os imports
// 4 - Fazemos isso porque a ideia é deixar esses métodos para qualquer upload que a gente precisar.
// 5 - Repare que o upload é o nome do nosso "arquivo" e não o nome da função exportada, que nessa função eu possuo um objeto exportado, passo a destination e o nome do arquivo.
// 6 - O segundo parametro eu vou passar a minha função de "upload" e qual a pasta que eu quero enviar, que está como "folder" que vai ser a pasta de avatar ou a pasta de carros e no final eu retorno o "arquivo".
// 7 - A lógica para o "delete" vai ser praticamente igual e nós vamos utilizar a função que estava dentro de "utils" que era do delete que vai resultar aqui tambem
// 8 -
