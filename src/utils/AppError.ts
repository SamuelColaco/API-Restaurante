
//Exportando a classe AppError
export class AppError{
    //Definindo os tipos de message e statusCode
    message: string
    statusCode: number

    //Criando um construtor e definindo um statusCode padrão
    constructor(message: string, statusCode: number = 400){
        //Pegando a mensagem e o status digitada
        this.message = message
        this.statusCode = statusCode
    }
}