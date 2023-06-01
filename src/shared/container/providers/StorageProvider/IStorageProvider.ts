interface IStorageProvider {
    save(file: string, folder: string): Promise<string>;
    delete(file: string, folder: string): Promise<void>;
}

export { IStorageProvider };

// 1- O nosso metodo provider vai possuir duas funções, uma de deletar e uma de salvar.
// 2 - A gente vai ter duas implementations , o localStorage, que é para quando a gente tiver utilizando em ambiente de desenvolvimento.
// 3 - E a gente vai ter o outro, que vai ser o "s3 storage" que vai ser utilizado para o ambiente de produção
