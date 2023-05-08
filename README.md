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
Deve ser possível listar todos os carros.

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
O aluguel deve ter duração mínima de 24 hora.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo o usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo o carro.
