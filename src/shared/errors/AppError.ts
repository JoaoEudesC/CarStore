// Esse arquivo vai  possuir uma classe que vai possibilitar a gente customizar os erros da nossa aplicação

export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

// Então em todos os throw new Error , a gente quer que seja possivel eu passar o status do erro, que até então so nos permite passar uma mensagem "", ele vai permitir que o nosso erro tbm receba um statusCode.

// No projeto que eu fiz a arquitetura msc , eu preciso passar as validações de if , no service que foi esquecida , e preciso passar um arquivo de "errors" como esse.

// No parenteses, eu consegui definir que se não for passado 'nenhum statusCode' , ele vai ter como valor o "400"
