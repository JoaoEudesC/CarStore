## 1 - O uso do insomnia na aplicação pode ser melhor , visto que voce pode definir uma base url , dessa forma, voce passa a baseUrl e em seguida, so muda de acordo as rotas, não é preciso ficar escrevendo sempre http://localhost:3000, é em " No Enviroment".

## 2 - Entendendo os ('repositórios'), é uma "Camada" , uma classe que vai ser responsável por fazer toda a manipulação de dados da nossa aplicação, eles serão responsaveis por fazer o acesso ao banco de dados , ou seja fazer o insert e outras várias operações no banco de dados, fazer toda a manipulação que a gente tiver no banco de dados

## 3 - Criando listagem de categorias de dentro da nossa tabela

## +++++++++++++++++++++++++ ENTENDA A ORDEM E ESTRUTURAÇÃO

## 1 -O ancle bob prega que a nossa aplicação ela deve conhecer sempre a interface e nunca a utilização (Isso é devem ser independentes)

## 2 - Ordem de criação das tabelas e funcionalidades => note A ordem de criação (1 - Model , 2 - Repositories (ISpecificationsRepositories , SpecificationsRepository), 3 - useCases(Services, que mudou o nome para "UseCases" Ex:CreateCategoryUseCases.ts), 4 - UseCases(Controllers) , 5 - Router(Por ultimo é passado no router) ) => Repare que essa ordem serve para a criação e execução de todas as tabelas

## 3 - Perceba que é no service que eu passo o execute para executar a função do repositorie e a partir deste momento ele executa tudo inclusive a de achar o nome igual , por isso não preciso passar no router, Então eu coloco dentro de uma mesma função execute, as funções que eu quero que seja executada na criação de categorias ou usuários ou outra tabela que voce possuir.

## 4 - Lembrar sempre antes de passar a função para o service, passar ela na interface ( ex: passar no "ISpecificationsRepository" antes de passar para o servide , siga a ordem acima)

## 5 - Que a ordem é, o Repositorie , ele é sempre um implemento do IRepositorie ( Ex: O SpecificationsRepository é um implemento do ISpecificationsRepository) e essa ordem segue para todos.

## 6 - E em seguida , dentro do service, na função de execute, a gente precisa colocar as funções que a gente deseja passar na rota, que neste caso, é a do findName e post

## 7 - Perceba que a minha função "List" Não foi preciso eu passar diretamente para o service ,pq era ela simples e não possuia nenhuma validação, sendo assim , passei do repository para a rota routes

## +++++++++++++++++++++++++ Utilização de useCases (swager)

## 1 - UTILIZAÇÃO DO USECASES => Isso traz ainda mais a nossa distribuição de responsabilidades, até esse caso as rotas estão fazendo responsabilidades a mais que não pertenciam a ela fazer , tal responsabilidade que vai ser passada para o useCases

## 2 - É necessário antes de utilizar uma arquitetura destas, ter menção de quais tabelas e quantas terão na sua aplicação e seus atributos(Uma ideia)

## 3 - Ou seja , toda aquela função que estava sendo passada para o router ate agora de função, será passado para um controller

## 4 - Dentro do nosso módulo vai ter uma pasta UseCases e lá dentro vai ter a criação de categoria , listagem e etc..., é onde vai os casos de uso, ou seja , as regras de négocio da nossa aplicação.

## 5 - Então eu crio uma pasta chamada useCases, crio dentro da pasta uma especifica como (CreateUser) , e dentro desta pasta vai toda a regra de negocio, ou seja , o meu controller , o meu serviçe, e o service agora muda de nome e passa a se chamar agora "useCase"(ex:CreateCategoryUseCase.ts), e um arquivo "index.ts" que vai instaciar o nosseo repositorie e o nosso service , para ser utilizado no router através do controller

## 6 - Os repositórios , como eles não são somente do caso de uso, nos deixamos ele em uma camada mais ampla.

## 7 - A gente pode criar um arquivo dentro do nosso Usecases , na pasta especifica , um arquivo que vai estanciar o nosso "repositorie" , "O nosso useCase" para instaciar através do controller nas nossas rotas

## 8 - Utilização de implementação => A medida que a aplicação vai crescendo pode ser que fique desorganizado colocar o repositorie e implementação junto , pode embaralhar (Ex:CategoriesRepositories e ICategoriesRepositories) a gente pode utilizar um separação para separar estes dois caras, então dentro da pasta implementations vai o CategoresRepository e do lado de fora na raiz a de repositories vai ficar o ICategoriesRepositories(Ou seja , as interfaces), (Entao "ICategoriesRepositories e "ISpecificationsRepository" fica na raiza repositorie) e SpecificationsRepository e CategoriesRepositories vai pra dentro de implmentations

## PADRÃO SINGLETON PATERN : \***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***

## 1 - Nos temos que trabalhar encima da mesma instacia se não causa o erro que ja aconteceu , de não conseguir listar a catergoria , pq é outra instancia do array

## 2 - A gente pode utilizar bibiliotecas que colocam essas instancias para a gente , mas aqui a gente vai colocar a mão na massa

## 3 - Esse padrão diz que a gente deve criar somente uma instancia para a aplicação e ela deve ser global, para não ter preocupação de criar várias instancias

## 4 - Refatoração de rotas para uma melhor organização => para não ficar passando todas as rotas da aplicação no server.ts e ficar manchando o codigo , pois , ficaram muitas rotas lá(Criação de um arquivo index dentro das nossas rotas)

##### Conhecendo O mutter para trabalhar com upload de arquivos

## 1 - O mutter ele funciona como se fosse um middleware dentro da nossa rota, ele vai ser responsavel por receber o nosso arquivo de upload dentro do nosso insomnia

## 2 - Temos que criar uma pasta chamada tmp na raiz do projeto, que é onde o nosso arquivo de upload será salvo sempre que a gente realizar a requisição

## 3 - A gente passa na rota como "upload.single("file")" Pq a gente so quer um upload de um unico arquivo, dentro do parenteses a gente vai colocar um nome que a gente deseja que seja reconhecido pelo insomnia ou postman.

## 4 - Criando useCase para import das nossas categorias , Uma pasta separada com um useCase justamente para o upload desta nossa categoria, ou seja , é outra rota , outra regra de negocio , sendo assim necessita de outro useCase

## 5 - Perceba que para as importações vai seguir a mesma estrutura de pasta, ou seja , uma pasta de import dentro de useCases, com um controller , useCases e index.ts para fazer as importações na rota, e esse upload ser cadastrado como uma categoria , para o dono do aplicativo não precisar sempre ficar cadastrando na mão um por um , é só criar, um upload e fazer o upload do arquivo

## ++++++++++++++++++ - Conhecendo o conceito de stream => Como a gente faz para ler todos os dados escritos dentro deste nosso arquivo que foi uploaded.

## 1 - Diferente de uma leitura normal o stream permite que a gente leia um determinado arquivo por partes , pelos pedaços do nosso arquivo (ex:video youtube , netflix) ele vai carregando os pedaços do video , conforme nos vamos assistindo ele não carrega tudo de uma vez , para evitar muito consumo de memoria no servidor e lentidão , ou seja , ele vai carregando por partes.

## 2 - Ou seja , a gente não precisa enviar o arquivo todo de uma vez , talvez neste cenário , a gente não vai ver tanta diferença , pq o nosso arquivo so tem tres linhas , mas se fosse um arquivo maior com certeza veriamos muitas diferenças.

## 3 - A gente utiliza um modelo nativo do node de stream "fs" e a gente importa este modulo no useCase (Se chama fileSystem)

## 4 - Os nossos arquivos estão em csv, por isso vamos utilizar uma bibilioteca muito bacana "csv-parse" usa em conjunto com "multer", permite com que a gente faça a leitura do nosso arquivo, ela permite que a gente não faça isso de forma manual , para que não fique mais dificil e sim mais simples.

## 5 - Lendo os dados do upload - Precisamos passar os nossos dados recebidos do useCase para dentro do repositorie"Criação de categoria" , pq a gente quer adicionar estes arquivos de upload dentro do cadastro

## 6 - inserindo os dados do upload no "Repositorio" =>

## +++++++++++++++++++++++++ ESCREVER A DOCUMENTAÇÃO DA SUA API , ELA DEVE SER BEM DOCUMENTADA (swager)

## 1 - A gente vai utilizar uma lib para colocar o express na nossa aplicação , o nome é (swagger-ui-express) npm i swagger-ui-express

## 2 - Importa o swagger no nosso server.ts, é ela que ele vai ser configurado e instaciado

## 3 - Criar dentro de source um arquivo chamado "swagger.json" , onde vai ter todas as nossas informações

## 4 - colocar o "resolveJsonModule": true, para ter acesso a arquivos .json na sua aplicação

## 5 - A intenção é fazer uma rota para cada useCase. ou seja , a gente vai fazer uma rota para cada rota da nossa aplicação , dividindo por tabelas no "title"

## 6 - Nos temos a rota , o sumário sobre o que é , o tipo de aplication , os exemplos e as informações que a gente quer passar para essa rota, breve descrição

## 7 - A gente tem os tipos de resposta que a nossa rota pode receber seja para o bom ou ruim , que é as responses, onde eu posso passar os codigos por exemplo

## 8 - funcionanmento da "tag" , serve para nos dar uma informação para a nossa requisição (por exemplo , tag:"Category")

## 9 - Nos podemos fazer o teste pela documentação do swagger , igual o postman ou insomnia , de acordo com as rotas que nos colocamos

## 10 - Como a listagem de usuários eu estou listando uma lista , eu tenho que dizer que o schema é um arrya , do tipo obejto e passar as propriedades dele.

## +++++++++++++++++ OBS => APAGANDO ARQUIVOS DA PASTA TMP:

## 1 - Utiliza este comando => fs.promises.unlink(file.path) na primeira linha da função on-end

## ++++++++++++++++++++++++++++++++++++ CONHECENDO O DOCKER:

## 1 - O Docker é uma ferramenta sensacional que nos permite pular etapas chatas de configuração de serviços para nossa aplicação. Além disse, ele permite reaproveitarmos o kernel da maquina hospedeira entra vários serviços executados simultaneamente , conhecidos como containers.

## 2 - Tem um guia de instalação de docker e docker compose , como fazer no terminal do unbuntu , no windows e até mesmo no mac

## 3 - ele auxilia na criação de conteiners, o Container: é um ambiente isolado dentro da nossa máquina, nos containers , nos temos as nossas imagens que são instruções para a criação de um conteiner(ou seja , a imagem do php , do postgree , nos temos todas essas imagens com o docker).

## 4 - O que "roda" localmente "roda" em produção, por exemplo quando roda localmente, mas não roda em produção , ou quando uma pessoa vai rodar nosso aplicativo localmente e ta usando uma versão anterior do banco de dados e não funciona, o docker vem para resolver esta situação.

## 5 - O docker permite com que a gente utilize o mesmo sistema operacional entre os conteiners, para el conseguir compartilhar os recursos da nossa máquina.

## 6 - Antigamente por exemplo se eu fosse utilizar tres bancos de dados na aplicação , ex:mongo , postgree , fauna eu iria ter que criar uma maquina virtual para cada banco destes e isso deixaria a minha máquina mais pesada, ou seja para cada maquina virtual nos teriamos que instalar um sistema operacional, teria que ter um gerenciamento para cada vm, teria que realizar muitas configurações , já com o docker, ele é responsavel por fazer a criação dos conteiners, ou seja, o docker vai ser responsável por criar o conteiner do postgrees, do mongo e do faunaDB.

## 7 - Ele vai criar um conteiner através da imagem que a gente quer criar , e ele vai ser um "middleware" entre o nosso sistema operacional e o conteiner que a gente ta criando , todo o processamneto que a nossa maquina tem a gente consegue utilizar no conteiner

## 8 - Eu não preciso mais ir na documentação do postgree e ver como eu preciso instalar ele na minha máquina por exemplo , simplesmente se eu tenho o docker , eu consigo fazer as criações do meu conteiner para as respectivas imagens , seja para postgrees ou mongoDb etc... e de tudo que eu precisar que esteja dentro das imagens.

## 9 - A gente consegue utilizar as imagens oficiais do docker , porém tambem conseguimos criar as nossas próprias imagens personalizadas, com configurações próprias.

## 10 - E do mesmo jeito que a gente consegue configurar para ambiente de desenvolvimento a gente consegue utilizar para ambiente de produção, a gente vai ver como rodar o banco de dados dentro de um conteiner.

## 11 - docker -v (A gente consegue ver qual a versão do docker que a gente ta utilizando)

## 12 - Como rodar a nossa aplicação dentro do docker ? => A gente hoje pra rodar a nossa aplicação localmente, precisamos ter diversas configurações como o npm e diversas outras , com o o docker é diferente. a gente não precisa ter toda essa parte de configuração, a gente repassa isso para o docker. ()

## 13 - Criação de arquivo "Dockerfile" na raiz do nosso projeto, e dentro deste arquivo vai estar uma "receita de bolo" as configurações necessárias, para rodar a nossa aplicação dentro do docker , a gente vai mostrar qual a imagem a gente quer que instale , o que a gente quer que faça dentro do noss o conteiner.

## 14 - para saber quais imagens eu posso utilizar do docker , eu posso acessar o arquivo "hub.docker.com" e lá eu consigo ver todas as imagens disponiveis dentro do docker que eu posso utilizar no meu "Dockerfile".

## 15 - WORKDIR , é o nosso diretorio de trabalho onde a gente vai colocar as nossas informações, ou seja , qual diretório a gente quer criar

## 16 - COPY - copio o meu package.json para dentro do meu diretório

## 17 - Criação do arquivo ".dockerignore" que são todos os arquivos que a gente quer que o docker ignore, como se fosse o gitignore , neste caso eu posso colocar a pasta node.modules, .git , .vscode. , eu quero que o nosso conteiner seja responsavel por criar e baixar as nossas dependencias.

## 18 - RUN - npm install , para que ele baixe todas as dependencias do package json copiado.(Melhor que o yarn , pq a maioria das imagens ja vem instalada)

## 19 - COPY .. - quero copiar tudo para dentro dessa nossa pasta, que será a nossa pasta raiz.

## 20 - EXPOSE 3333 => Vou dizer em qual porta a gente quer rodar a nossa aplicação

## 21 - CMD => permite com que a gente rode os comandos que a gente precise rodar, e dentro deste cmd eu vou colocar o script que a gente vai escrever para rodar a nossa aplicação, passamos estes comandos dentro de um array.

## 22 - Para rodar o docker no terminal => sudo docker build -t nomeDaImagemQueAgenteQuerCriar ondeEstáONossoDockerFile.(Perceba que como estou utilizando o unbuntu, eu tenho que utilizar o "sudo" antes de cada comando, se não vai afirmar que eu não possuo autorização).

## 23 - Após a instalação, o comando para iniciar é => "sudo service docker start" e para listar o conteiners "sudo docker ps"(que estão rodando)

## 24 - Para rodar a nossa imagem , para que quando a gente rode o comando "sudo docker ps" apareça ele rodando => 'sudo docker run -p 3333:3333 rentx'(essa maquina separada da gente possui um ip diferente da nossa máquina, por isso a gente ta fazendo um mapeamento das portas utilizando o comando (-p)), ou seja , eu estou dizendo que sempre que eu no localhost, chamar a porta 3333 , eu quero que ele procure pela porta 3333 que ta do nosso comteiner , fazendo um mapeamento., a gente consegue ver se a imagem está rodando pra a gente.

## 25 - Realizando testes => é so testar as nossas rotas novamente no isomnia, que já haviam sendo criadas , isso porque a gente copiou as configurações do package json, sendo assim a gente colocou nosso app dentro do docker., e perceba que eu não precisei utilizar o comando => 'npm run dev', se eu executar ele vai dizer que a porta já está em uso pq eu estou utilizando junto com o docker.

## 26 - Para ter certeza mesmo que está utilizando o conteiner 1-('sudo docker ps' => para ver o nome do conteiner e as caracteristicas dele ) 2-(sudo docker exec -it confident_pike /bin/bash) => posso utilizar tanto pelo nome do conteiner , quanto pelo "id" do conteiner. esse comando para acessar o conteiner , então ele vai direto para a nossa pasta "WORDIR". ("ls" para mostrar o que está criado dentro da pasta)

## 27 - Configurar docker para dar "reload" sempre que a gente fizer uma mudança no aplicativo.(ex:nodemon).

## 28 - Utilizando dockerCompose => a gente consegue fazer uma orquestração dentro do nosso docker, para realizar os serviçoes que a gente possa rodar , ou se algum serviço ele depende de outro para que eu possa rodar.(ex: a criação do nosso banco de dados, que vai ser um serviço , e a gente so quer que a aplicação rode com esse serviço)

## 29 - Criar uma pasta docker-compose.yml, a gente consegue passar algumas configurações para o nosso arquivo.

## 30 - No mac e windows o docker-compose ja vem por padrão , j+a no linux é necessário fazer uma instalação a mais.

## 31 - A extensão yml , ela é bem identada , por isso eu preciso utilizar a identação correta dela, igual da documentação , para que seja possivel criar.

## 32 - A gente tava fazendo no terminal "docker build rentex ." agora eu coloquei isso no nosso service , sendo assim não será necessário mais executar este comando , uma vez que eu utilizar o docker-compose ele já vai executar este serviço"

## 33 - A gente vai definir as 'ports', que vai ser a mesma definida no Dockerfile, e o volumes: que vai ser exatamente a mesma pasta passada "workdir"

## 34 - A gente tbm pode passar no compose o "container_name: rentx" para que a gente não precise utilizar o "name" que ele gera automatico na criação do conteiner , ele já vai gerar pra a gente.

## 35 - Executar o docker "compoose" => "sudo docker-compose up"

## 36 - Como remover um conteiner no docker => "sudo docker rm id-do-container" , mas antes voce precisa parar o conteiner em execução "sudo docker stop NOME_DO_CONTAINER". , se voce quiser rodar o compose logo após ter rodado direto o do file('Voce vai ter que parar o conteiner em execução') e voce tbm remove o conteiner , pq agora voce está criando o conteiner baseando-se no docker-compose

## 37 - MANEIRAS DE EXECUTAR O DOCKER => então repare que eu posso executar o docker, pelo dockerCompose ou não (Posso fazer direto no "dockerFile" => sudo docker run -p 3333:3333 rentx) , mas com o docker-Compose é melhor pq ele cria a partir do dockerFile e já encaixa os serviços.(O compose nos fornece o sistema de reload, tipo o "nodemon")

## 38 - Teste se sua aplicação está rodando dentro do docker através de testar as suas rotas novamente no postman ou no insomnia.

## 39 - A gente pode fazer com que o docker rode em background(ou seja , mesmo se a gente matar o terminal) se a gente fizer alguma atualização no app ele vai atualizar normalmente, para isso , utilize o comando => "sudo docker-compose up -d"( assim ele fica rodando em background , o nosso conteiner)

## 40 - para ver logs enquanto a aplicação está rodando em bakcground => "sudo docker logs rentx -f" , "se quiser sair do log" (Ctrl + c) e ele sai do modo log (Tem essas duas possibilidades)

## 41 - A partir de agora todo serviço que a gente quiser adicionar a nossa aplicação, seja um serviço de banco de dados , seja um serviço de fila , a gente vai colocar dentro do nooso 'docker-compose.yml'.

## ++++++++++++++++++++++++++++++ COMANDOS DO DOCKER

## 1 - sudo docker ps => ver todos os conteiners que estão de pé

## 2 - sudo docker ps -a => ver todos os conteineres , tanto o que estão de pé , que estão parados, ele só aparece a porta quando o conteiner está startado

## 3 - sudo docker rm id => ele vai remover o conteiner(tambem pode ser utilizado o nome do conteiner). o conteiner tem que está parado para conseguir remover., se ele estiver rodando vai estar com a porta definida

## 4 - sudo docker stop id => ele da um stop na execução do conteiner.

## 5 - sudo docker start id => ele inicia o conteiner

## 6 - sudo docker-compose up -d => executar o nosso conteiner no bakcground, ele sobe o nosso conteiner.

## 7 - sudo docker logs rentx -f => ter acesso aos logs que estão no terminal no background

## 8 - sudo docker-compose up => executar o nosso conteiner no terminal sem ser no background, ele sobe o nosso conteiner.

## 9 - sudo docker run -p 3333:3333 rentx => utilizar o nosso conteiner através do dockerFile

## 10 - sudo service docker start => comando para iniciar o docker . depois de instala-lo

## 11 - sudo docker exec -it confident_pike /bin/bash => ver se o conteiner esta sendo executado ("ls" para ver as pastas)

## 12 - sudo docker-compose start => para os conteiners executados com o docker compose startar, é interessante utilizar , pq a gente não tem que passar conteiner por conteiner , ele vai parar todos os serviçoes em execução do docker compose.

## 13 - sudo docker-compose stop => para os conteiners executados co o docker compose parar, é interessante utilizar , pq a gente não tem que passar conteiner por conteiner , ele vai parar todos os serviçoes em execução do docker compose.

## 14 - sudo docker-compose down => para remover o docker compose com os serviçoes criados(ele remove tudo criado dentro do serviço)

## 15 - sudo service docker start => iniciar o servidor docker no terminal

## 16 - sudo service docker status => ver o status se está iniciado ou não

## 17 - sudo docker-compose up --force-recreate => quando voce ja criou um serviço e adiciona outro como foi o caso da conexão com o banco , utilize esse comando para recriar a aplicação.

## 18 - docker-compose restart - Quando voce realiza alguma modificação no arquivo compose , pode utilizar este comando para reiniciar

## 18 - comando para ver o ip do meu conteiner => docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rentx

## 19 - comando para ver o ip do banco de dados => docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' database_ignite

## ++++++++++++++++++++++++++++ UTILIZANDO BANCO DE DADOS(postGree)

## 1 - A gente pode trabalhar com os drivers nativos do node, baixando através do npm , mas essa não é uma boa abordagem , pq se a gente mudasse de banco de dados , ficaria ruim para dar manutenção o nativo seria (const {Client} = require('pg) const client = new client() , await client.connect()) => sql puro

## 2 - querys builders (knexjs) => ele mistura um pouco de sql puro com javascript, tem documentação e é flexivel , não depende inteiramente dos drivers do banco de dados.(idependente do banco de dados , voce consegue trabalhar com o próprio knexjs)

## 3 - ORM => obeject relational map => um bom exemplo é o "mongoose" e "sequelize" , o sequelize é um orm para banco de dados nosql (mysql , postgree) e o "mongoose" é um orm para banco de dados não relacional como o "mongoDb" (Model <-> ORM <-> BANCO DE DADOS) , por exemplo , o nosso banco de dados vai pegar o nosso objeto model e colocar no banco de dados , como é o caso do sequelize e do mongoose.

## 4 - Tpos de orm(bancos sql) => typeorm(tem muito suporte para o typescript) Mais popular , sequelize

## ++++++++++++++++++++++++++++++++++++ INSTALAÇÃO DO TYPEORM

## 1 - Consultar a documentação e lá ele tem um jeito de instalar o orm e tbm os drivers do banco relacionado caso voce queira, eu tbm posso baixar o banco diretamente na minha maquina com eu fiz com o mysql

## 2 - npm i typeorm reflect-metadata

## 3 - Escolher o banco de dados => npm i pg

## 4 - Precisamos fazer algumas configurações no nosso ts.config para que a gente consiga trabalhar com decorators e outras coisas(), a gente vai habilitar => emitDecoratorMetadat:true , experimentalDecorator:true

## 5 - Criação da nossa conexão com o banco de dados => Criar uma pasta chamada (dataBase) e um arquivo index.ts , onde vai estar a nossa ligação com o banco de dados

## 6 - As nossas configurações tem que ficar dentro de um arquivo ormConfig(), criar na raiz do projeto um ormconfig.json() que vai consistir em type, host , username , password , database, o username e o password a gente vai ter que criar

## 7 - Criação do banco de dados para que a gente consiga trabalhar com ele => a gente vai criar no dockerCompose , para que a gente não precise instalar o aplicativo do postgree na nossa máquina, se eu utilizar o docker , eu tbm não preciso baixar o mysql para utilizar na minha máquina essa e uma das vantagens do docker.

## 8 - a gente so criou o dockerFile pq a gente queria que fosse colocado dentro do nosso compose , como a gente vai utilizar o "postgress" que já tem uma imagem criada,a gente passou a imagem direto

## 9 - politica do (restart: aways é para reiniciar o nosso conteiner sempre que ele for parado)

## 10 - repare que eu dividi em dois serviços , o database_ignite é um serviço e o eviroment é outro serviço.

## 11 - A gente teve que passar as informações do volume no final do arquivo

## 12 para ver o banco de dados criado , utilize o comando "sudo docker ps -a " e voce vai ver o banco criado tbm.

## 13 - as informações de usuário e password devem ser passado para o ormconfig.json

## 14 - A porta geralmente utilizado pelo postgree é a "5432".

## 15 - config - o nosso 'database' ta em um ip e o nosso 'app' em outro ip , ocasiona erro => tenho que colocar ambos no mesmo ip => passar essa propriedade para ambos os serviçoes abaixo do volume(networks_mode: host)

## 16 - OBS => Sempre que fizer uma atualização no service (utilize o comando "down" e subo tudo de novo , só assim para atualizar)

## 17 - sempre utilizar esse comando pra subir a instacia do docker => sudo docker-compose up -d , quando ele for "docker-compose down".

## 18 - Ligar o docker desktop ao docker baixado no servidor unbuntu.(o docker tem que está startadi para que voce consiga fazer isso => sudo service docker start) os conteiners que estão em execução vão mostrar no aplicativo do docker , com o banco de dados que está sendo utilizado, apenas os conteiners em execução

#### +++++++++++ CONCLUSÃO DO DOCKER => o docker ele é um sistema de conteiners que permite a criação de imagens para a criação de cada serviço que permite a criação de um conteiner para cada imagem , cada imagem proporciona um serviço que podem interagir entre si, como o conteiner de banco de dados que está interagindo com a imagem que eu criei do app a partir do dockerfile e são dois conteiners distintos, o dokcer file serve para eu transmitir a minha aplicação através para o docker-compose.yml, a identação a frente abaixo do service diz respeito a um novo conteiner como é o caso do database e app, então o meu app roda no docker e não mais na minha maquina , possibilitando alguem ter acesso ao meu banco de dados através do docker por exemplo, por que eles não teriam pelo meu localhost, sendo assim eu não preciso do npm e nem do banco de dados instalado na minha maquina eu posso utilizar através do docker.

#### +++++++++ => utilizei este comando(volumes:pgdata:driver: local) para que os dados do banco de dados possam ser mantidos mesmo se o conteiner for excluido e se alguem acessar esse volume posteriormente ele terá acesso a esse banco de dados.

## ++++++++++++++++++++++++++ COMANDOS DO POSTGREE QUANDO VOCE INSTALA ELE NO SEU TERMINAL

## 1 - sudo service postgresql start => inicia o servidor do postgree

## 2 - sudo service postgresql status => ver se o servidor está em execução ou não

## 3 - Descobrir comandos do postgree

## 4 - Uma interface grafica muito boa é utilizar o Beekeper studio como interface gráfica para visualizar o seu banco de dados igual voce faz com o mysql workbench , a diferença é que este aplicativo faz ligação com qualquer banco de dados que seja relacional , postgree , mysql , sqlServer e tudo mais. que for relacional., seja ela utilizada através do docker com typeorm , ou seja ela com o sequelize, liga com o banco do docker tbm

## ++++++++++++++++++++++++++++++++++++ - Aprendendo conceito de migrations

## 1 - Para a criação das tabelas , a gente poderia ir até a interface gráfica e criar as tabelas na mão com o comando do sql , "create table" ,"insert" e etc.. , porem a gente vai começar a trabalhar com o conceito de "MIGRATIONS", mas eu poderia criar na mão quantas tabelas eu quisesse dentro da minha interface gráfica.

## 2 - O que são "MIGRATIONS"? => é um versionamento de tudo que eu tenho no banco de dados, por exemplo, eu fiquei reponsável por criar o banco de dados de categoria e minha amiga ficou responsável por criar a tabela de especificção , cada um no seu "host" quando a gente realizar o "merge", o teu banco de dados pode ficar diferente do resto da equipe, para que a gente consiga manter um controle melhor da criação dessas tabelas no banco de dados a gente utiliza o conceito das "migrations". , que é basicamente a gente criar as nossas tabelas dentro da nossa aplicação, igual a gente fez com o sequelize, mas vai ser com o "typeOrm" e essa tabela é criada dentro do nosso aplicativo e não dentro no "workbench" diretamente.(O nosso gerenciamento vai ser dentro da nossa aplicação, ou seja , sempre que a gente for remover uma coluna , adcionar , a gente vai gerenciar isso dentro da nossa aplicação).

## 3 - FUNCIONAMENTO DAS MIGRATIONS => ela cria um timeStamp e o nome da migration que a gente criou (ex:1983883993CreateCategories)(1982891892891829CreateSpecifications), quando a gente rodar o nosso codigo , com as nossas migrations pedentes , como a gente já tem a de categoria ele vai entender que ele so precisa rodar a de especificação, dessa forma a gente consegue manter um controle maior, e toda vez que a gente ver que tem uma migration nova , que a gente ainda nao executou no nosso banco de dados , a gente pode executar, dessa forma , todo mundo da equipe fica trabalhando na mesma versão do banco de dados (Por isso que no mongoDb não é necessário) porque ele é baseado através de collections e não de tabelas.

## ++++++++++++++++++++++++++++++++++++++ - Criação de migrations com o TypeOrm

## 1 - ir no package json e criar um script (typeorm) => "typeorm": "ts-node-dev ./node_modules/typeorm/cli" ou npm i -g typeorm(Instala de forma global e já fica disponivel para toda a aplicação.) , => npm run typeorm

## 2 - A gente precisa dizer ao nosso ormConfig , onde a gente quer colocar as nossas migrations(se a gente não definir ele vai criar na raiz do projeto , mas a gente quer que fique dentro da pasta dataBase para definir para organização. ) que é justamente o objeto cli com o migratiosn dir apontando para a pasta.

## 3 - Comando para criar a migration =>npm run typeorm migration:create ./src/database/migrations/NomeDaMigration (é um migration para cada tabela, a tabela de categorias recebe uma migration, a tabela de specifications tbm recbe outra migration e assim por diante, para manter o controle das tabelas em trabalho em equipe).

## 4 - ou seja, nos vamos criar as nossas tabelas no banco de dados através das migrations, é nos arquivos das migrations que nos vamos criar a nossa tabela, ou seja, , cada migration é uma tabela, tanto para ts , quanto para js, o sistema é o mesmo para montar uma migration.

## - Sempre que eu executar uma migração ele vai criar uma tabela no meu banco de dados.

## 5 - Eu só nao preciso baixar o banco de dados na minha máquina se eu estiver utilizando o docker , caso o contrário eu tenho que ter o banco baixado no meu terminal

## 6 - para que a gente consiga rodar a migration, a gente tem que passar "migrations" na nossa pasta orm , para dizer ao arquivo aonde as nossas migrations estão. tudo que tiver dentro de migrations que for.ts ele vai rodar. => (npm run typeorm migration:run)

## 7 - Quando criada ele vai criar a nossa tabela , e uma tabela de migrations , mostrando qual a migration ele rodou , se ela foi um sucesso, e por essa tabela que ele vai fazer um gerenciamento das migrations que ja rodou e das migrations que ainda precisam rodar.

## 8 - se errou alguma coisa e quisesse da um down nessa migration => "npm run typeorm migration:revert" ele desfaz a nossa migration.

## +++++++++++++++++++++ Alteração no projeto para o banco

## 1 - substituir o "model" por "entities"

## 2 - nas "entities" a gente precisa dizer que aquelas classes são referências as nossas tabelas criadas, para que aqueles campos sejam adicionados as nossas tabelas da migrations

## 3 - Alteração do repositório de categorias para fazer as inserções no banco de dados =>

## 4 - é interessante voce ter o código pronto na sua máquina e tambem no docker, ou seja , que eles estejam funcionando , tanto no docker quanto na sua maquina, assim voce pode olhar no console se existe algum erro de codigo e em relação ao banco de dados voce olha no console do docker, é importante ambos trabalhar em conjunto

## 5 - Como eu utilizei o restart no dataBase , sempre que eu iniciar a aplicação, ele vai sempre iniciar o banco de dados , mas a minha aplicação não, por isso eu tenho que dar start em todos os serviços da aplicação (1 - sudo docker-compose up -d , 2 - sudo docker-compose start), então basicamente no docker , para o serviço está sendo realizado , ele tem que está mostrando a porta que está rodadno quando utilizar o comando(sudo docker ps) (1 - sudo service docker start , 2 - sudo docker-compose up, 3 - sudo docker-compose start ), tem que dar um start no docker-compose para ele inicializar os serviços que não estão em pé.

## 6 - Sempre para verificar erros de ligação, erros de servidor e coisas assim ao rodar a aplicação , lembrar sempre de utilizar => (sudo docker logs rentx -f)

## 7 - Nos precisamos fazer uma modificação para que ele chame o nosso banco de dados antes de criar a categoria, caso contrário da erro se ele não chamar o banco de dados antes para salvar os dados => ()

## 8 - Comando para adicionar os dados as tabelas depois que elas forem criadas e rodar a migration para subir a tabela =>

## ++++++++++++++++++ CONHECENDO O TSyringe:

## 1 - é uma bibilioteca que nos ajuda a fazer as injeções de dependencia no nosso projeto(a gente ja viu como faz de forma manual e essa bibilioteca vai nos ajudar)

## 2 - A gente vai usar essa bibilioteca para substituir as inserções que a gente faz na mão com o arquivo index.ts em cada pasta

## 3 - Precisamos definir um local onde a gente vai querer registrar e fazer a injeção de dependencia, como a gente vai utilizar para varios modos, entao a gente cria uma pasta shared.

## 4 - Comando para a criação da migration => 'npm run typeorm migration:create ./src/database/migrations/CreateSpecification' , Criar a migration => 'npm run typeorm migration:run'
