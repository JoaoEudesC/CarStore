# Cadastro de carro

**RF Requisitos funcionais**
Deve ser possível cadastrar um novo carro.

**RNF Requisitos não funcionais**

**RN Regra de negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado com disponibilidade por padrão.

- O usuário responsável pelo cadastrado deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser Possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser Possível listar todos os carros disponíveis pelo nome da marca.
Deve ser Possível listar todos os carros disponíveis pelo nome do carro.

**RNF**

**RN**
O usuário não precisa estar logado no sistema.

## Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.

**RNF**

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastrado deve ser um usuário administrador.

## Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastrado deve ser um usuário administrador.

## Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RNF**

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo o usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo o carro.
O usuário deve estar logado na aplicação.
Ao realizar um aluguel, o status do do carro deverá ser alterado para indisponível.

# Devolução de carro

**RF**
Deve ser possível realizar a devolução de um carro

**RNF**

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuário deve estar logado na aplicação.

# Listagem de Alugueis para usuário

**RF**
Deve ser possível realizar busca de todos os alugueis.

**RNF**

**RN**
O usuário deve estar logado na aplicação.

**PARA TESTAR A APLICAÇÃO**
1 - Mudar no DataSource o host para localhost na função createConnection1 para que seja possivel rodar o seed e testar os testes de integração visto que o docker tem um bug.

2 - Mudar no DataSource o host para o que se refere no "docker-Compose" para "database" para que seja possivel conectar o banco para testar no insomnia as rotas no codigo de produção.

3 - Colocar um arquivo no dotenv chamado PORT = 3000 and SECRET = "cfe275e5908b5650488e0b0342c2d6cq".

4 - Utilizar o comando "npm install" para instalar todas as dependencias do projeto.

5 - Utilizar os comandos do docker-compose para iniciar a aplicação , startar o docker na sua máquina e subir os conteiners(Assumimos que se voce tem interesse na nossa app voce sabe como utilizar o docker)

6 - Voce pode testar se o aplicativo esta rodando na sua maquina ao menos com o comando "npm run dev"
