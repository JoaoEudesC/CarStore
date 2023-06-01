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

## 10 - sudo service start docker => comando para iniciar o docker . depois de instala-lo

## 11 - sudo docker exec -it confident_pike /bin/bash => ver se o conteiner esta sendo executado ("ls" para ver as pastas)

## 12 - sudo docker-compose start => para os conteiners executados com o docker compose startar, é interessante utilizar , pq a gente não tem que passar conteiner por conteiner , ele vai parar todos os serviçoes em execução do docker compose.

## 13 - sudo docker-compose stop => para os conteiners executados co o docker compose parar, é interessante utilizar , pq a gente não tem que passar conteiner por conteiner , ele vai parar todos os serviçoes em execução do docker compose.

## 14 - sudo docker-compose down => para remover o docker compose com os serviçoes criados(ele remove tudo criado dentro do serviço)

## 15 - => iniciar o servidor docker no terminal

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

## +++++++++++++++++++ COMANDOS ESPECIAIS DE MIGRAÇÃO:

## 1 - Comando para a criação da migration => 'npm run typeorm migration:create ./src/shared/infra/database/migrations/CreateCars' , Criar a migration no banco => 'npm run typeorm migration:run -- -d ./src/shared/infra/database/DataSource.ts' sempre passar o comando para criar a migration no banco

## 2 - npm run typeorm migration:revert -- -d ./src/database/DataSource.ts => vai retirar a ultima migration colocada no banco de dados

## 3 - comando para ver o nome das tabelas e ver quais delas foi realizada a migração => "npm run typeorm migration:show -- -d ./src/database/DataSource.ts" , nesses comandos de migration tem sempre que lembrar de passar o DataSource.

## 4 - Sempre lembrar de não subir a pasta node_modules.

## OBS => Erro ao utilizar o inject => é porque estou utilizando a versão 5 do typescript , e deveria estar usando a versão "4.95.5", temos que abrir a palleta "ctrl + shift + p" e selecionar lá a versão que nos desejamos utilizar , para colocar como padrão no vscode, isso serve para toda linguagem.

## 5 - A rota é uma para cada tabela , ou seja, se eu tiver várias funções como listar as categorias da tabela e etc, se for da mesma tabela vai tudo na mesma rota , e tudo no mesmo implementations e repositories , a unica coisa que vai mudar é um useCase para cada função , independente da tabela , seja ela de listar ou cadastrar

## 6 - se o docker e sua aplicação estiver rodando na mesma porta ao mesmo tempo e voce rodar a aplicação no localhost , vai dar que as portas já estao sendo usadas , voce tem que executar um ou outro , ou coloca-los em portas diferentes, se voce executar no localhost a conexão com o banco de dados vai sempre falhar

## ++++++++++++++++++++++++++++++++++++ Continuação da documentação

## 1 - Repare que no path de "specifications" o schema nos colocamos , de forma diferente de categories, nos colocamos o "$ref":"#/definitions/Specification" , ou seja , a gente criou uma referência e no final do "path" a gente criou as 'definitions' com exatamente as properties exatamente como no categories , so que agora a gente está referenciando o "Specification" para aquele definitions , ao inves de passar tudo direto no schema como fizemos no path de "categories"

## 2 - Se voce realizar o teste da rota no swagger , ele vai salvar na tabela do banco de dados com a descrição de swagger "ai voce sabe que foi um teste" é so apagar a linha.

## 3 - Tive que criar outro path para o import (Pq a rota se chama "categories/import" nao so categories) se voce o mesmo path , eu so precisaria criar outro ver http dentro do path , mas como não é, tenho que criar outro "path", ou seja , outra rota.

## 4 - Criação da rota de upload no swagger => no requestBody a gente vai passar "multipart/form-data": , na versão tres do swagger é assim que ele reconhece o upload de arquivos do swagger usa essa especificidade, fazendo com que só seja permitido arquivos dos tipos diversos, ou seja, ele vai bloquear arquivos de outros tipos., e nas properties tive que passar que vai ser um arquivo do tipo "file" que foi a variavel que eu defini para receber o nome do arquivo, do tipo string , com fomrato binario.

## ++++++++++++++++++++++++++++++++++++++++ USUÁRIO (CADASTRO DE USUÁRIOS)

## 1 - Repare que para criar qualquer tabela eu primeiro crio a migração da tabela com o nome que eu quero , a regra é essa, e através dessa migração eu crio a tabela e adiciono as informações nela

## 2 - Se estiver utilizando uma arquitetura msc e a aplicação fo pequena, pode ser ideal usar um controller , um service , um router para toda a aplicação , porém se for uma aplicação melhor , o ideal é utilizar um para cada tabela.

## 3 - Repare que sao criadas as migrations , e das migrations são criadas as entidades

## 4 - Criei um módulo chamado accounts , que vai tudo a respeito da criação de contas de usuário, assim como criei um modulo chamado cars que vai tudo a respeito da criação de tabelas e funções relacionado a carros, como vou ter validação de usuário e tudo mais , faz super sentido que eu crie um modulo só para essa parte.

## 5 - Ou seja , as entidades de cada modulo , ficam em seus respectivos modulos , seja o de account ou seja o cars

## 6 - eu posso utilizar com js puro a migração tbm , e utilizar o getRepository como se fosse minha tabela

## 7 - Temos que seguir a ordem (1- CriarMigração, 2- CriarEntities, 3- CriarRepository, 4- Criar useCases )

## 8 - Removendo coluna de uma migração já existente => "npm run typeorm migration:create ./src/database/migrations/AlterUserDeleteUsername", cria outra migração que vai ser responsável por remover a coluna dessa determinada tabela(await queryRunner.dropColumn("users" ,"username" )) e passamos este comando dentro do "async up" para deletarmos este campo. e no aync down a gente passa isso ("await queryRunner.addColumn("users" , new TableColumn({name:"username",type:"varchar"}))}) e depois remover , tudo que a gente tem de username nas entidades e criaçaõ de tabela

## 9 - Criptografia de senha => vamos utilizar o bcrypt , e repare que é no nosso useCase onde vai a regra de negocio , que utilizamos o bcrypt , assim como utilizamos no service em outras arquiteturas.

## 10 - Validação no useCase para não permitir cadastro de "emails" iguais.(Poderia ser um 'middleware', igual eu criei nos outros projetos)=> então repare que a função "findByEmail" ela é passada no useCase, porém ela é criada no repositories(IUserRepository.ts). e passada pelo UsersRepository.ts e por ultimo passado para o useCase

## ++++++++++++++++++++++++++++++ Entendendo o jwt(Verificação de permissão e autenticação de usuário através de token) json-web-token

## 1 - Como é outra regra de negócio, eu crio dentro de accounts, dentro de useCases , o authenticateUser folder , dentro dele os meus arquivos "authnticateUserUseCase e o meu controller", repare que isso é outra regra de negocio, a autenticação, ou seja, tem que ser criado uma pasta no useCases para ele, no modulo correspondente que é o de usuário "accounts"., igual quando nos outros projetos eu criava um controller somente para autenticação

## 2 - Criamos uma rota nova só para essa parte de "autenticação"

## 3 - só precisamos fazer um useCase e um controller, justamente porque não temos que criar tabela , migração e mais nada , pq nos vamos trabalhar essa autenticação encima da tabela de usuário.já criada , que ja possui até entidade e tudo mais.

## ++++++++++++++++++++++ ROTAS AUTENTICADAS(SÃO ROTAS QUE SOMENTE O USUÁRIO COM PERMISSÃO PODE ACESSAR.), assim como se fosse a pagina de login, que o usuário so vai acessar aquela rota se o login for feito , que é onde agente verifica se o token criado , é realmente "viavel"

## 1 - A gente vai fazer essa validação através de um middleware, vendo se é um token válido ou não, se o usuário desse token realmente existe.

## 2 - Esses middlewares são passados diretamente nas rotas , para fazer as interveções , estão dentro da pasta middlewares.

## ++++++++++++++++++++++++ Tratamento de execessões

## 1 - Sempre que acontece um erro , nossa aplicação para , e não vai adante, ou seja , agente tem que parar a aplicação e começar de novo e isso não é o correto.

## 2 - Ou seja , a gente vai passar esses erros no nosso "response" (A gente vai aprender a criar o nosso próprio erro), porque toda hora que a gente tem um erro, a gente da um throw new error, ai ele fica como um erro do tipo 500, mas algumas informações são erros do tipo(400), nas outras arquiteturas como , msc a gente envia o erro direto na requisição através do response, já em arquiteturas mais complexas como ("msc" e "clean architeture") , a gente tem que criar o próprio erro para passar na camada de serviço.para não ter que utilizar o throw.

## 3 - Criamos uma pasta chamada "errors" => onde vamos criar a classe que vai nos possibilitar passar statusCode, além das mensagens, sendo assim, substituo todos os "Throw NewError" por ele na aplicação.

## 4 - Precisamos fazer uma tratativa no nosso código, para quando ele der esse erro, ele conseguir dar um "return" neste erro => A gente tem que criar um middleware no app.ts, que vai ser repassado para todas as rotas(O middleware de erro)

## 5 - Essa é a melhor forma de implementação de erro se voce estiver utilizando uma arquitetura "msc ou clean Architeture" tanto com javascript , como em typescript,a estrutura de montagem desse middleeare é igual , a não ser que voce esteja utilizando a arquitetura "mvc" dai voce consegue fornecer esse erro diretamente no controller.

## 6 - Temos que instalar uma bibilioteca para que nossos erros sejam "repassados" de fato para frente => 'npm i express-async-errors' , pq o express não sabe lidar com os throws diretamente , por isso a necessidade da bibilioteca.(Só passar assim depois da importação do express => import "express-async-errors")

## ++++++++++++++++++++++++++ AVATAR DO USUÁRIO, Criação de upload de avatar.

## 1 - O ideal é que na colunar de "users" a gente possua um campo que seja para o avatar, por tanto vamos adcionar mais uma coluna no nosso banco de dados, que vai servir para que a gente consiga, colocar esse avatar

## 2 - Antigamente a gente salva-va a imagem diretamente no banco de dados em formato "base 64" porém o banco ficava pesado , e com o surgimento dos "storages" do google ou da amazon a gente consegue salvar a nossa imagem lá e adicionar no nosso banco de dados a referência dessa imagem para utilizar na aplicação, sem necessidade de salvar a imagem diretamente no banco de dados.(fica muita mais facil), quando a gente quiser utilizar a imagem , a gente recupera através da nossa "url"., a gente vai utilizar a nossa pasta tmp, igual estavamos fazendo com a nossa categoria.

## 3 - A gente vai criar nas nossas pastas, no useCases de account o "updateUserAvatar", sendo assim , se o usuário ja tiver um avatar, a gente vai ter que da a possibilidade deste usuário realizar um update desse avatar e não só adicionar um avatar.

## 4 - Repare que para a criação de uma nova coluna na nossa tabela já criada, nos vamos utilizar o mesmo metodo , que utilizamos para remover uma coluna da nossa tabela já criada , no caso nos removemos a coluna "username", da tabela "user",(Ou seja, nos criamos uma migração "AlterUserAddAvatar" , onde nos vamos realizar essa inserção), é sempre a mesma convenção , alter e o nome da funcionalidade da que voce quer adicionar ou remover dessa determinada tabela.

## 5 - Agora na criação da "tabela" users , na migração, eu vou criar a o campo de avatar, porém ele não será o brigatório e o usuário pode passar se quiser ou não., ou seja , tenho que adicionar estes campos no meu "entities"

## 6 - A gente tem tbm que isolar a função de upload do multer, e tirar das rotas, pq não é responsabilidade das rotas , igual nos fizemos na rota de "categorias", nos vamos ter que isolar isso.

## 7 - Criamos uma pasta chamada "config" , em que nos vamos criar as configurações do nosso projeto, e dentro dela vai ter o arquivo de "upload" , em que nos vamos isolar essa parte dos uploads.

## 8 - No new eviroment do insomnia , eu posso passar qualquer tipo de váriavel como "baseUrl" e tbm o token para que eu não precis ficar pegando , pq nessa rota de upload de avatar eu terei que passar um "token" tbm para autenticar a rota e consegui colocar o avatar.

## 9 - A gente precisa criar uma funcionalidade que vai fazer com que se já existir um avatar, ele vai deletar o anterior, pq quando a gente salva o avatar ele ta salvando na pasta tmp o todos os avatares , assim nossa aplicação vai ficar uma bagunça,

## 10 - Nos vamos criar uma pasta "utils" em que nos vamos colocar a função "deleteFile" dentro dessa pasta utils , fica possiveis funções que vão ser reutilizadas em outras partes do codigo como a função de deletar um file

## 11 - Perceba que eu ja sabia que na tabela de users iria ter um canto para avatar, porém , eu não quero que seja passado na rota post de criar um usuário e sim quando um usuário ja estiver cadastrado e autenticado, por isso, eu coloquei ele como opcional , para não ser obrigatório passar na criação , porem ele só vai ser usado na rota de upload de avatar , ou seja para colocar uma foto numa conta já cadastrada e existente.

## OBS => houve uma atualização na documentação do typeorm, por isso nos não utilizamos "getRepository" do type orm , foi atualizado, agora nos temos que utilizar, o nosso dataSource no lugar , para poder da um get Repository , a gente so import o "Repository".

## ++++++++++++++++++++++++++++++++++ Observações de erros =>

## 1 - "message": "Internal server errror - relation \"categories\" does not exist" (Este erro de relation indica que a tabela não está no banco de dados por isso não pode realcionar a relação) a interação que iria fazer com auquela tabela como listar um usuário ou criar e repare, que se o docker for reiniciando e colocado abaixo as migrations tem que ser feitas todas novamente.

## +++++++++++++++++++++++++++++++++++ TESTES UNITÁRIOS E DE INTEGRAÇÃO.

## 1 - Nós possuimos dois tipos de testes, os 'testes unitários' e os 'testes de integração'.(1 - Testes Unitários =>fazemos testes de partes da nossa aplicação, ou seja, teste de serviços e regras de negócio, a gente testa exatamente as funcionalidades da aplicação, Ex:"Testar o useCase de createCategory", ele testa tantos os casos de suceso como os casos de erro, tipo quando entra no nosso if. )(2 - Testes de Integração => Quando testamos a aplicação inteira, a gente testa desde o momento quando a requisição da nossa rota é feita , até a chamada do controller e o retorno da resposta dessa rota, testa o fluxo completo da aplicação, até a criação de um banco de teste para fazer o teste de ligação com o banco de dados, porque a gente tem que ter cuidado para não manipular o banco real de desenvolvimento. ).

## 2 - Testes de integração: routes => controllers => useCases => repository | <= repository <= useCases <= controllers <= routes

## 3 - TDD => é uma metodologia utilizada para fazer os testes (Test Driven Development). => em primeiro lugar a gente começa a criar os testes e depois a gente aplica todo o desenvolvimento da nossa aplicação.(ex: a gente não possuia um createUserUseCase ainda , ou seja , esse serviço , a gente já cria uma classe de teste e já começa o teste para esse serviço que ainda vai ser desenvolvido , já pensando o que é preciso para a gente criar um usuário.).

## 4 - A vantagem de utilizar o teste por exemplo seria , quando uma regra de negócio mudar e eu não alterar no teste, quando eu rodar o teste ele vai falhar e vai me avisar que a regra de negócio mudou e eu vou ter ciencia disso por exemplo, e será que era pra mudar mesmo ?, a gente começa a prever erros e otimizar o tempo.

## +++++++++++++++++++++++++++++++++++ CRIAÇÃO DO PRIMEIRO TESTE JEST CONFIGURAÇÕES DO JEST.CONFIG.TS.

## 1 - Nos vamos instalar a bibilioteca "jest" de testes como dpendencia de desenvolvimento e suas tipagens

## 2 - npx jest --init(ele vai fazer algumas perguntas de configuração pra a gente, parecido quando a gente inicia o eslint)., se a gente quer adicionar o arquivo de teste , ambiente onde o teste vai rodar, (Do you want Jest to add coverage reports? => a gente ta falando para o nosso jest mostrar quais são as nossas regras de negócio, quais são os nossos useCases que estão com testes implementados e qual é a parte do nosso código que ainda não tem a parte de teste implementada, a visualização fica melhor.), essas configurações é para que seja criado um "jest.config.ts".

## 3 - Vamos ter que utilizar um preset para trabalhar com o typescript , que no nosso arquivo do jest está como undefined.(npm i ts-jest -D )

## 4 - tbm precisamos passar o mapeamento das classes que nos vamos fazer os testes => "TestMatch": no jest.config.js., é uma boa prática deixar os testes dentro do useCases, ou seja , deixar dentro de cada useCases o respectivo teste(ex: dentro de do createCategory deixar o teste de criação de categoria)., então no "testeMatch" eu vou passar isso => "\*_/_.spec.ts"(mapeaei todas as pastas e que voce procure dentro dessas pastas um arquivo que se encontre spec.ts => é um padrão.)

## 5 - Colocar o "bail" como true, esse arquivo a gente ta dizendo ao jest, se a gente quer ou não que ele pare ou não após o primeiro o erro do teste, caso algum teste tem algum erro, "por default" ele vai como "false" ele vai rodar todos os testes, se a gente coloca como true, quando acontecer o primeiro e tiver erro ele não executa os outros testes.(mas eu não quero que ele vá pra frente caso o segundo teste traga um erro por exemplo , os projetos da rockte deixa como default)

## ++++++++++++++++++++++++++++++++++++ CRIANDO TESTE NO USECASE DE CRIAR CATEGORIA

## 1 - A convenção do nome do teste unitário é sempre criar o nome da regra de negocio igual ta descrito no "service" ou no 'useCase' e em seguida colocar o .spec.ts.

## 2 - Exemplo de teste => describe("Criar categoria" , () =>{

    it("espero que 2 + 2 seja 4" , () =>{
        const soma = 2 + 2;
        const resultado = 4

        expect(soma).toBe(resultado);
    })

}) //Se nessa conta eu colocar o resultado "5" , ele vai errar o test e vai mandar o erro no console dizendo que a gente expected "5" , mas recebeu "4".

## 3 - Ao finalizar o teste é só rodar o comando "npm test". , e ele da até o nome da minha descrição.

## 4 Outro exemplo de teste => describe("Criar categoria" , () =>{

    it("espero que 2 + 2 seja 4" , () =>{
        const soma = 2 + 2;
        const resultado = 4

        expect(soma).toBe(resultado);
    });
    it("Espero que 2 + 2 não seja 5" , () =>{
        const soma = 2 +2
        const resultado = 5;

        expect(soma).not.toBe(resultado)
    })

}) // NESTE CASO EU ESPERO QUE MINHA SOMA NÃO SEJA 5 ".NOT.tobe"

## ++++++++++++++++++ TESTE DE CRIAÇÃO DE CATEGORIA

## 1 - Quando eu dou um "npm test" ele só acha a pasta pq eu defini no meu arquivo jest.config.ts.

## 2 - A regra é criar um teste para cada useCase da aplicação, ou seja , para cada regra de negocio da aplicação vai ter um teste.

## ++++++++++++++++++++++++++++++++ IMPORTS DA APLICAÇÃO

## 1 - O typescript tem uma forma no tsConfig de deixar "automatizado e mais facil o nosso imports" para que a gente não precise ficar navegando "../../"

## 2 - dentro de 'paths' no tsConfig a gente vai fazer o mapeamento das pastas que a gente mais utiliza , não é preciso fazer de todas("para não poluir muito")

## 3 - "@modules/_":["modules/_"] , como o meu ja tava antes, dessa forma fica muito mais facil de visualizar o import sem o ../../ então a estrutura ficaria assim => "@modules/_":["modules/_"],

            "@config/*":["config/*"],
            "@shared/*":["shared/*"],
            "@errors/*":["errors/*"]

## 4 - E no nosso baseUrl , eu vou colocar "./src/.

## 5 - fazer um reload no vsCode => ctrl + shift + p (e digitar reload , e pegar a opção reload window).

## 6 - Para conseguir que eu consiga fazer esse meu arquivo entender os @ , eu tenho que instalar uma biblioteca (npm i tsconfig-paths -D) e vamos utilizar ela para inicializar a nossa aplicação. e alterar o nosso tsconfig para isso => "dev": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --poll --ignore-watch node_modules --respawn src/app.ts",

## 7 - Temos que alterar o jestConfig para el eentender essas nossas importações => import {pathToModuleNameMapper} from "ts-jest/utils". import {compilerOptions} from "./tsconfig.json"

## 8 - dentro de "moduleNameMapper" eu vou passar "moduleNameMapper:pathsToModuleNameMapper(compillerOptions.path, {prefix:"<rootDir>/src/})

## 9 - Ele mesmo assim vai dar erro , pq os arquivos json não foram feitos para ter comentários, então a gente tem que apagar todos os comentários do ts.config.ts, para que volte a funcionar o import que fizemos naquele arquivo do jest.

## +++++++++++++++++++++++++++++++++++++ OBS

OBS => Mesmo utilizando javascript puro , você precisa baixar as tipagens do jest, caso o contrário no seu arquivo de testes, funcionará mas não possuirá o autocomplete das propriedades do jest como "describe e etc.."

OBS => Os testes do jeste eles são feitos independentes da sua aplicação , ou seja , ele vai testar o que a sua regra de negocio está fazendo, se estiver utilizando banco de dados, mas vale utilizar um "banco de dados" fake para fazer os testes , para não interagir diretamente com o banco de dados.

OBS => Não é recomendado que os testes do Jest interajam diretamente com o banco de dados. Os testes devem ser executados de forma independente e isolada, sem depender do estado do banco de dados.
Para testar o código que interage com o banco de dados, é comum utilizar bibliotecas que permitem criar um ambiente de testes separado, como o Jest, que oferece suporte para testes com banco de dados utilizando um banco de dados em memória, como o SQLite.
Assim, durante a execução dos testes, é possível criar um banco de dados em memória, preencher com dados de teste e testar o comportamento do código em relação a esses dados, sem afetar o banco de dados de produção ou de desenvolvimento. Isso garante que os testes sejam mais confiáveis e que o código seja testado de forma mais segura e consistente.

## ++++++++++++++++++++++++++++++++++ REFATORANDO CÓDIGO

## 1 - Aqui nós vamos separar ainda mais as responsabilidades da nossa aplicação.

## 2 - A nossa entidade ela está totalmente acoplada com o nosso typeOrm, a mesma coisa das implementações dos nossos repositórios, se amanhã ou depois nos precisacimos tirar o typeOrm , comprometeria o projeto , teriamos que criar uma nova implementação.

## 3 - Vamos criar uma pasta chamada "infra" de dentro do module "cars" e dentro do module "accounts", essa pasta infra, ela vai estar totalmente acoplada ao typeOrm , então dentro dessa pasta "infra" nos vamos criar uma pasta chamada "typeOrm" onde nos vamos colocar a nossa entidade lá dentro , a nossa pasta entities vai la pra dentro, pq se um dia a gentre mudar o "orm" a gente cria outra referencia dentro da pasta infra e utilize outra referencia. como "sequelize"

## 4 - Nós tambem temos a implementação do nosso repositório que tambem está totalmente acoplado ao typeorm, se está com a importação do typeOrm está acoplado ao typeOrm dessa forma nos vamos ter que criar outra pasta dentro de "infra", dentro de type "orm" chamada de "repositories"., ou seja , a a pasta de implementations vai para dentro de repositories dentro de "infra", dentro de "typeorm", ou seja , o nosso repositório vai para dentro dessa camada de infra , pq está diretamente com a implementação direta do typeorm.

## 5 - Ou seja, A pasta que antes era chamada de "implementations" agora é chamada de "repositories" e vai estar dentro de "infra" "typeorm" a gente so tinha colocado implementations para não ficar junto com o repositories , agora estão em arquivos separados.

## 6 - O nosso middleware ele está muito solto , o de authentication middlewares, a gente utiliza todo o conceito do esxpress nele , então se a gente mudar de frame work tambem vai dar problema, então dentro de "shared" vamos criar uma pasta chamada "infra" e dentro desse infra , vamos criar uma pasta chamada "http" então tudo que for referente ao "express" rotas e etc a gente vai colocar dentro de http., a pasta "middlewares" vai para dentro do "http".

## 7 - Agora a gente vai passar as nossas rotas para dentro de "shared" tambem , dentro de http, essa camada "infra" é justamente a camada em que nós vamos estar colocando aquielo que tiver interação diretamente com a aplicação.

## 8 - O nosso app.ts, ele está, intimamente ligado com o "express", então ele pode ir para dentro de http tambem, tudo que estiver relacionado diretamente com o express a gente coloca dentro de http, e alterar no package json o caminho tambem.

## 9 - o errors a gente esta usando pra toda a aplicação, pode colocar dentro de shared sem problema.

## 10 - O nosso database está totalmente acoplada ao "typeorm" tbm, se a gente mudar do type orm a gente vai precisar fazer a nossa refatoração aqui, então a pasta "database" ela vai para dentro de "shared" "infra".

## 11 - todos os nossos modules, tem uma camada de infra e tudo que for da camada externa , ou seja , tudo que não fizer parte da nossa regra de negocio da aplicação , for framworks e etc vai para dentro dessa camada de infra., banco , bibilioteca de envio de email.

## 12 -

## ++++++++++++++++++++++++++++++++++++++++++++++++++++ ESCREVENDO OS REQUISITOS DA APLICAÇÃO.

## 1 - Nos vamos aprender a escrever os requisitos da aplicação e escrever cada parte através de um README

## 2 - Que é a "lingugem" de markdown da nossa aplicação, assim será uma maneira muit interessante e organizada de mapear a nossa aplicação em um read-me para o usuário saber o que extamente se trata e faz a nossa aplicação.

## +++++++++++++++++++++++++++++++++++++++ CRIAÇÃO DE MIGRATIONS DO CARRO.

## 1 - Neste caso desta tabela nos vamos ter a nossa primeira "foreign key" que antes a gente não tinha, que seria a nossa "Chave estrangeira" => category_id(FK)

## 2 - Basicamente vamos seguir o mesmo raciocinio de todas as migrations, vamos cria-las todas da mesma forma com o mesmo raciocinio.

## 3 - Criação de chave estrangeira => Esta chave está sendo criada com as instruções na tabela "CreateCars".(Na migration).

## +++++++++++++++++++++++++++++++ TDD NA PRÁTICA.

## 1 - Então basicamente a gente vai seguir um "fluxo" de criação diferente , nos vamos criar o teste primeiro e só depois é que nos vamos criar "O controller" "UseCase" e regras de negocio e etc, esse é o conceito de "TDD".

## 2 - Então basicamente a ordem do "TDD" seria => _Write a failing test_, _Make the test Pass_,_Refactor_ => Então basicamente voce vai escrever um teste que vai falhar, em seguida voce vai fazer esse teste passar e depois refatorar o teste com as regras de negocio todas feitas de forma correta.

## 3 - Mas repare que a gente tem que partir de um principio, a gente vai criar um test para o nosso caso de "uso" ou seja , a nossa regra de negocio "useCase" então a gente tem que ter pelo menos esse arquivo criado.

## +++++++++++++++++++++++ CRIANDO SEED DE USUÁRIOS(SEED)

## 1 - Nós vamos verificar se o usuário é um "admnistrador ou não dentro do nosso sistema"

## 2 - Como a gente não pode deixar disponivel o campo "isAdmin" para o proprio usuário não conseguir manipular essa informação e colocar que ele é "admin" por exemplo, mesmo que não seja.

## 3 - O conceito de seed é interessante para esse tipo de funcionalidade, onde a gente cria o "dado" e roda diretamente na aplicação

## 4 - Dentro de "shared" e dentro de "infra" vamos criar uma pasta chamada "seed" , com um arquivo dentro chamado "admin.ts", é e neste arquivo em que nos vamos criar o "seed" do nosso usuário administrador

## 5 - Apos criar a função do "seed" a gente precisar chamar aquela função "seed"

## 6 - Temos que criar um script no "package json" => "seed:admin":"ts-node-dev src/shared/infra/database/seed/admin.ts", passando o caminho do meu "seed".

## 7 - npm run seed:admin => para testar o usuário admin.

## 8 - Repare que se a opção der "deprecated" de alguma bibilioteca passe o mouse encima e veja, qual opção nos poderiamos utilizar na nova versão dela (Como foi o caso do "close" que foi substituido por "destroy") para fechar a conexão com o banco de dados no nosso seed.

## 9 - Após o usuário ser criado e rodar o comando para subir o admin, vai mostrar na tabela o usuário que é considerado admin, com seu email e "id" próprio.

## +++++++++++++++++++++++++++++++++++++++ CRIANDO MIDDLEWARE DE ADMINISTRADOR (iSSO PORQUE A GENTE JÁ TEM O NOSSO USUÁRIO ADM CRIADO)

## 1 - A gente vai fazer a verificação com um middleware para saber se o usuário é um administrador ou não.

## 2 - A gente precisa verificar na rota se o usuário ta logado e se ele é um admin.(A gente ja tem a prte de logado , com o middleware "ensureAuthticated").

## 3 - Para testar o admin no insomnia => será preciso passar o token de login e se o usuário não for admin, vai dar erro ao cadastrar o carro, pq a nossa regra de negocio diz que só se pode cadastrar um carro se o usuário for um admin.

## 4 - Você vai ter que utilizar as credenciais para logar como admin criadas no banco através do meu "seed", para que o erro do middleware de não administrador não seja ativado , somente aquele usuário poderá cadastrar um carro, pq ele é o administrador.

## 5 - Nos tambem vamos passar os dois middlewares de "autenticar" e de "admin" para a rota de criar categoria, ou seja , so vai poder cadastrar uma categoria quem estiver logado e quem for um usuário administrador, vamos fazer isso na rota de import tambem.

## 6 - As ordens do middlewares importam, qual middleware voce quer que execute primeiro, voce passa primeiro e segue essa ordem para todos os middlewares.

## OBS => Resumindo como testar a nossa aplicação

## 1 - Temos que fazer um cadastro como usuário

## 2 - Realizar o login na rota de login após o usuário já está cadastrado, para que possa ser gerado o token

## 3 - Esse token vai ser necessário para que voce possa cadastrar categorias, especificações e faça qualquer utilização da aplicação

## 4 - A rota para cadatrar um carro vai ser preciso , passar o nosso seed para ela ser executada, pois só "admins" podem cadastrar um carro, tem que usar as credenciais de adm e passar o token de cadastro

## 5 - A rota para cadastrar um carro recebe uma chave estrangeira da tabela de categorias, portanto "o id" gerado na criação de categoria deve ser passado no campo "category_id" da rota de "create Car", pq voce ta basicamente cadastrando um carro naquela categoria.

## 6 - Na rota de admin eu tenho que enviar com o "token" do admin e utilizar as credenciais do admin, ou seja , sua senha e seu email por exmplo, para que essa rota funcione.

## 7 - Então repare que a gente pode criar um usuário administrador na mão e deixar lá no banco para que essa crendencial seja de admin, nos podemos fazer isso através do insomnia ou diretamente no banco de dados na interface gráfica (ou através de um seed como fizemos nesse aplicativo).

## 8 - Para eu conseguir criar o usuário admin diretamente no banco de dados através do "seed" eu preciso altera o "host" de "database" para localhost por conta dos erros entre o docker e o postgree , mas eu faço o seed dessa maneira para que o usuário não tenha acesso ao campo "isAdmin" de forma que ele consiga alterar, por isso é importante adicionar através do seed com sql puro , para que a gente consiga ter controle e não deixar disponibilizado para o usuário e eu consigo definir se um campo é obrigatório ou não se eu colocar ele na migration com "default:false" e posso definir que ele seja nullo com o campo "isNullable".

## +++++++++++++++++++++++++++++++++++++++++ Listando Carros Disponivéis

## 1 - O pensamento e lógica vai ser muito similar a lógica de listagem de categorias , so que dessa vez vamos listar os carros.

## 2 - A ordem que nós estamos seguindo agora é criar o nosso useCase de determinada regra de negócio e em seguida criar o teste unitário daquele useCase, para seguir a regra e conceito do "TDD". , nós só criamos a class do useCase e mais nada, com o metodo execute vazio, so para fazer falhar ou passar o teste e depois realizar a implementação.

## 3 - Ou seja, as informações do banco não importam na hora do nosso teste, pois não vamos utiliza-las diretamente com o banco e portanto podemos passar dados ficticios para os campos exigidos.

## 4 - Repare que para fazer as pesquisas , a gente vai utilizar o "req.query" que é como se fosse um parametro igual a gente passava o "id" nas nossas primeiras aplicações, porém como a gente não quer que essa busca seja obrigatória, nos não vamos passar o "req.params", vamos utilizar o "req.query" que não é obrigatório passar pq a gente não passa diretamente na rota, igual nós fazemos com os parametros.

## +++++++++++++++++++++++++++++++++++++++ CRIANDO MIGRATION ESPECIFICAÇÃO DE CARROS (MANY TO MANY)

## 1 - Essa tabela vai ser uma tabela de relacionamento, Nós só vamos armazenar dentro dela as chaves estrangeiras , a chave de carro e a chave de especificação, ela faz o relacionamento entre o "id" do carro e o "id" de specification.

## 2 - Então agora nos vamos criar uma tabela que possua duas chaves estrangeiras

## 3 - Eu posso adicionar e remover colunas de uma tabela através de sua migração => como foi feito na migração "AlterUserAddAvatar.ts", que foi usado para adicionar o campo avatar a tabela de usuário, mas eu posso seguuir a mesma logica para remover uma coluna tambem. ("Utilizando o dropColumn")

## ++++++++++++++++++++++++ CASO DE USO DO CADASTRO DE ESPECIFICAÇÃO PARA CARRO

## 1 - Vamos ter que alterar a entidade de "Car.ts" pq ela vai receber a propriedade das especificações que a gente quer cadastrar dentro dela.

## 2 - //Criei esse atributo de specificação, por isso é um array, pq cada carro vai poder receber mais que uma "specificação". , esse atributo foi criado entre as colunas.

## 3 - Quando eu tenho um relacionamento de tabelas, eu coloco que é uma realação "many to many" e o nome da tabela que eu quero establecer essa relação nas entidades.

## 4 - Utilizando a lógica do "tdd" a gente começa criando um arquivo de "useCase" e um arquivo "spec de teste para esse useCase" e crio uma função "execute" vazia sem passar nada para ser utilizado no teste e passar e depois implementar a logica => ex => import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase:CreateCarSpecificationUseCase

describe("Create Car Specification" , () =>{

    beforeEach(() =>{
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase();
    })


    it("should be able to add a new specification to the car", async () =>{
        await createCarSpecificationUseCase.execute();
    })

})

class CreateCarSpecificationUseCase{
async execute():Promise<void>{

    }

}

export {CreateCarSpecificationUseCase} //Dessa forma o teste já vai passar e voce vai poder já escrever a lógica depois.

## +++++++++++++++++++++++++++++++++++++++++++++ UTILIZANDO ESLINT NO PROJETO

## 1 - Repare que nos utilizamos o eslint no projeto, mas só criamos o eslint depois que o app já estava praticamente construido, sendo assim, podemos utilizar um comando chamado => "ESLint: Fix all auto-fixable Problems"

## 2 - Após executar esse comando o código seguirá e concertará quase tudo , algumas coisas que ele não concertar voce pode simplesmente, concertar na mão.

## 3 - você consegue desabilitar qualquer regra do eslint que voce queira acessando "o quick fixible" e desabilitando determinada regra daquela linha ou documento em especifico.

## 4 - Temos uma regra que é para que quando a gente fizer o "import" de arquivos no meu documento nos temos que da uma linha de espaço entre os "imports de bibilioteca" e os "imports de arquivos do nosso projeto". que é tudo que está dentro dessa regra => ""import-helpers/order-imports":"

## +++++++++++++++++++++++++++++++++++++ CRIANDO MIGRATIONS DO ALUGUEL E DICA DE QUERY DO BEKEEPER

## 1 - Se voce quiser adicionar ou alterar qualquer dado de qualquer tabela manualmente como corrigir um campo ou qualquer coisa , voce pode ir no "query" do beekeeper e escrever a query lá diretamente , ex => "alter table users add primary key(Id)" este comando vai fazer com que esse meu id que antes não tinha chave como "primary key" agora terá, e ele será uma chave primaria (unica).

## ++++++++++++++++++++++++++++++++++++ TRABALHANDO COM BIBILIOTECAS DE DATAS (DAY.JS)

## 1 - Essa bibilioteca ela é usada para o tratamento e uso de datas na nossa aplicação

## 2 - npm i dayjs

## 3 - Depois importamos essa bibilioteca no arquivo que vamos utilizar, neste caso é no useCase de "rental",

## ++++++++++++++++++++++++++++++++++++ CRIANDO PROVIDER PARA DATA

## 1 - Nós vamos criar o nosso provider, na pasta "shared" ou seja, um container, porque a gente ta utilizando a bibilioteca "day.js" em quase todo lugar, mas se amanhã a gente quiser trocar de bibilioteca de datas é muito mais fácil se tiver sido criado um provider.

## 2 - Então dentro de "container" a gente vai criar uma pasta chamada "provider" e sempre que a gente tiver uma bibilioteca nova a ser utilizada para alguma funcionalidade a gente cria uma pasta descrita com a funcionalidade com "DateProvider" que está dentro da pasta "Provider" porém se tiver outra bibilioteca é só criar dentro dela outra pasta referente a função da bibilioteca que neste caso é prover a "data".

## 3 - E dentro dessa "pasta qua descreve a funcionalidade" ex:"DateProvider", nós vamos possuir também uma pasta chamada "implementations" onde vai ter a implementação da class utilizada para fazer esse serviço.

## 4 - Porque utilizar pasta "implementations" => A ideia aqui é que você possa ter várias implementações diferentes para essa mesma interface, cada uma com uma implementação diferente para os métodos definidos na interface. Por exemplo, você poderia ter uma implementação usando a biblioteca moment.js, outra usando a biblioteca nativa Date do JavaScript, e uma terceira usando o Luxon.Ao ter essas implementações separadas em arquivos diferentes e organizadas em uma pasta específica, você pode alternar facilmente entre elas apenas trocando a importação da classe que implementa a interface. Além disso, essa abordagem torna o código mais fácil de ler, testar e manter, pois separa as responsabilidades de cada classe e torna a arquitetura mais modular.Dessa forma, a pasta implementations é utilizada para armazenar as implementações concretas das interfaces definidas na sua aplicação, seguindo as práticas da arquitetura limpa.

## 5 - Perceba que quase sempre que a gente for utilizar implementações e "funções" de outra classe para utilizar suas funcionalidades nós vamos utilizar um private tipando aquela classe com aquela classe que a gente quer utilizar fazendo uma "implementação".

## +++++++++++++++++++++++++++++++++++++++++++++ TESTES DE INTEGRAÇÃO ("SuperTest")

## 1 - Nós vamos utilizar a bibilioteca "SuperTest" para realizar os testes de integração

## 2 - ele permite que a gente crie um "servidro http" dentro dos nossos métodos para que a gente consiga ter acesso aos métodos "post" "get" e etc, a gente consegue definie o que a gente espera de cada requisição também.

## 3 - "npm i supertest @types/supertest"

## 4 - A gente começa a fazer estes testes "por modulos" ou seja, eu tenho tres "modulos" na minha aplicação, eu vou ter que começar por algum módulo,e vou começar pelo modulo de carros.

## 5 - eu entro na pasta "useCases" e em seguida eu eu escolho um "arquivo do useCase" vou começar pelo createCategory e criar um arquivo "CreateCategoryController.spec.ts" sendo assim , todos os testes de integração vão seguir uma ordem de "nome" vai ser criado um "controller" assim para cada useCase de cada modulo.

## 6 - A documentação manda a gente criar um "app" com o superTest , porém a gente já tem um criado no nosso "arquivo server.ts" mas a gente não pode reutilizar ele porque ele está intimamente ligado com o nosso "server".

## 7 - Então basicamente o que eu vou fazer é, criar um arquivo "server.ts" e exportar o app para lá para que o "app.listen" permaneça isolado em um arquivo para que eu consiga utilizar somente "o app" sem a necessidade de pega-lo intimamente ligado ao meu servidor correndo risco de ocasionar um "erro".

## 8 - Temos que fazer isso, porque eu vou dizer ao meu "teste" que eu não quero que o nosso servidor seja executado quando executar os nossos testes, ou seja, que a porta seja ouvida quando eu executar os nossos testes.(por isso é uma boa pratica dividir em um arquivo separado a porta em que o servidor vai ser executado);

## 9 - Separando assim termemos acesso a todas as informações do "app" sem ter que subir o servidor da nossa aplicação.

## 10 - Exemplo de uso => import request from "supertest";

describe("Create Category Controller", () => {
it("should return a 200 status code", async () => {
await request(app).get("/cars/available").expect(200);
});
});

## 11 - Rodar o teste => "npm test" é o mesmo comando de sempre, a não ser que voce esteja utilizando o "yarn".

## 12 -

## OBS - IMPORTANTE => colocar todos os @types como dependencias de desenvolvimento ou seja , eles tem que está em "devdependencies" no package json, checar sempre neste projeto quais estão em desenvolvimento e quais não estão para fazer certo em outros (-D => FAZ IR PARA "DEVDEPENDENCIES").

## ++++++++++++++++++++++++++++++++++++++++++++++ ALTERAÇÃO NA APLICAÇÃO PARA UTILIZAR ESTRUTURA DE BANCO DE DADOS COM O SUPERTES

## 1 - Se a gente não fizer essas alterações nos vamos obter erro sempre que rodar o "superTest" porque ele não vai encontrar uma ligação com o banco de dados.

## 2 - Criando primeiro teste de integração => // 1 - POST => A gente para testar a rota tem que enviar exatamente o que é passada naquela rota de "post" ou seja o campos como "name" "categories" para que possa ser testada essa rota e essa lógica serve para todos os testes com esse verbo http.

// 2 - Repare que a gente deve utilizar um "expect" para que a gente consiga falar o que a gente espera a seguir que seja feito um " post " com aquelas credencias necessárias e sendo assim verificar isso é como funciona para as rotas de "post por exemplo"

## 3 - CRIAÇÃO DE BANCO DE TESTES PARA TESTAR OS TESTES DE INTEGRAÇÃO

## // Na mesma ligação do "beekeper" eu posso criar clicando no "+" um "rentx_test" que eu posso alternar entre vários bancos na mesma criação

## // Posso escrever na "query" também assim => "create database rentx_test" e da no mesmo.

## // O intuito de fazer isso é evitar testes que sejam feitos no banco de dados que vai ser utilizado em "produção" para não ocorrer erros, o conceito de "tdd" não se aplica aos testes de "integração" eles devem ser feitos somenete após as rotas estiverem prontas visto que ele testa a rota inteira.

## // Esse erro ocorre pelo mesmo motivo de a gente não ter conseguido rodar "seed" pq o test tbm não entende o "database" que o docker usa , ele só entende o "localhost" então sendo assim, sempre que a gente for fazer teste a gente vai ter que criar a connection com ("host = "localhost")

## // Então quando nos formos rodar os testes de integração nos vamos fazer igual fazemos para rodar o "seed" nos vamos alterar o "DataSource" para localHost onde está "database".

## // Nós também vamos fazer uma verificação para saber se o "ambiente é de teste" se o ambiente for de teste a gente vai utilizar outro database()

## // de onde vem o "NODE_ENV" => // OBS => de onde vem o "NODE_ENV" => no nosso package json, nos scripts na parte do "jest" a gente consegue definir que o nosso NODE_ENV = "test" => "test": "NODE_ENV=test jest" e cada vez que a gente rodar essa aplicação ele vai definir essa variavel de ambinete como test.

## // OBS => Então basicamente para eu rodar os testes eu vou precisar mudar o "host para "localhost"" e para testar a aplicação no insomnia vamos precisar mudar para "database" que é o nome definido no docker isso serve justamente para que nós possamos driblar o erro do docker com o localhost.

## ++++++++++++++++++++++++++++++++++ CONTINUAÇÃO DE TESTE DE INTEGRAÇÃO

## 1 - Criação das tabelas no banco de dados para teste => 1 - "await connection.runMigrations();"" => coloco este comando na função deixando claro que antes de cada teste eu vou rodar todas as nossa migrações

## 2 - adicionar este comando => --detectOpenHandles ao jest no packje json para que mostre informações caso algo esteja impedindo de finalizar o teste.

## 3 - Para testar se ele realmente está criando no banco de dados remova a linha => "await connection.dropDatabase();" e veja se as migrations estão ficando no banco de dados quando rodamos o teste.

## +++++++++++++++++++++++++++++++++++++++ CONTINUAÇÃO DA DOCUMENTAÇÃO, PASSAR PARA O SWAGGER QUE A GENTE ESTÁ UTILIZANDO JWT COMO AUTENTICAÇÃO

## 1 - Depois de "definitions" nós passamos este objeto => "components": {

        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    } // isso vai gerar um obejto de autenticação que a gente vai poder utilizar nas nossas rotas da documentação

## 2 - Passamos isso => "security": [

            { "bearerAuth": []}
          ], passamos isso na documentação , na rota , poder ser embaixo da description da rota para afirmar que estamos querendo um segurança e referenciado o "securitySchemes".

## 3 - ele cria um cadeado na rota e quando voce clicar para acessar essa rota vai pedir que voce passe um token.

## 4 - Criar sessão na documentação => criamos mais uma rota de "sessions" que é justamente a rota que temos que realiza o login do usuário, ou seja , a sessão do usuário, seguindo a mesma lógica da documentação das outras rotas de post e etc na documentação.

## 5 - Testar => Faça o teste com o admin , então voce deve estar com a aplicação rodando pq os testes consultam o banco de dados, apos criar é so conferir no banco de dados que voce vai ter a certeza que está funcionando.

## +++++++++++++++++++++++++++++++++++++++ REPLICANDO AUTENTICAÇÃO PARA A DOCUMENTAÇÃO

## 1 - Repare que como foi feito em specifications nos tambem vamos fazer em cars o schema nós vamos utilizar uma referencia da nossa "definitions" pq o schema de carros é grande para não poluir o código, fica mais oeganizado assim ("definitions" está no final da documentação para referenciar).

## +++++++++++++++++++++++++++++++++++++++ DOCUMENTAÇÃO PARA UPLOAD DE IMAGENS DE CARRO

## 1 - Na nossa rota de imagens a gente recebe um parametro id que é passado na url, sendo assim para referenciar no swagger a gente utiliza chaves /{id} como foi feito na rota /cars/images/{id}.

## 2 - Também vamos utilizar o security nessa rota porque só quem pode realizar esse upload de imagens é um usuário autenticado.

## 3 - Recebendo parametro na documentção através da url => "parameters": [

                    {
                        "name": "id", //qual o nome do parametro
                        "in": "path", //de onde vem o parametro
                        "description": "Car id", //Uma descrição desse parametro
                        "required": "true",// se é obrigatório
                        "schema": {
                            "type": "string" //Tipo do parametro
                        }
                    }
                ]

## +++++++++++++++++++++++++++++++++ REFRESH TOKEN

## 1 - Toda vez que o token expira, para o usuário não ter que fazer sempre o login ali, como em aplicativos de banco que voce volta 15 minutos depois e a sua sessão ja está expirada.

## 2 - Ou seja, o usuário sempre vai conseguir ficar logado, mas o token que é gerado ele vai "mudando" de tempos em tempos, sempre gerando um novo token um por cima do outro de tempos em tempos.

## 3 - Nós vamos criar uma tabela em que nós vamos armazenar os dados do usuário, a gente vai poder ter mais de um token para o mesmo usuário, porque ele pode querer logar em uma aplicação web e depois logar em uma aplicação "mobile".

## 4 - Nós vamos criar uma tabela só para isso, ou seja, nós temos que criar uma migration para essa tabela de tokens também.

## +++++++++++++++++++++++++++++++++ REFATORANDO AUTENTICAÇÃO DE USUÁRIO E TESTANDO ROTA DE SESSIONS COM REFRESH TOKEN.

## 1 - // Neste arquivo a gente vai isolar as informações de cada usuário como o "secret" que a gente utiliza tanto no "ensureAuthenticate" que é um middleware como tambem vamos utilizar no "AuthenticateUserUseCase", o tempo de expiração do token tambem, vamos fazer isso por questões de organização.

## 2 - // Vamos também ter informações do nosso refreshToken dentro deste arquivo.

## 3 - Agora quando eu fizer uma sessão, eu vou receber duas respostas na requisição, vou receber dois tokens diferentes e o segundo token ele vai adicionar no beekeper o refresh token para guardar a informação.

## +++++++++++++++++++++++++++++++++ CRIANDO CASO DE USO COM REFRESH TOKEN.

## 1 - Vamos criar uma requisição para que quem tiver acessando nossa api vai poder fazer a criação de um refreshToken.

## 2 - por exemplo so o token for expirado, o front-end vai mandar uma requisição pra a gente para que seja possível gerar um refresh token baseado no token que foi expirado.

## +++++++++++++++++++++++++++++++++ CASCADE E SET NULL

## 1 => 'Ondelete AND Onupdate - CASCADE' - Com esses dois campos relacionados a cascade => qualquer ação de exclusão ou atualização na tabela principal afetará automaticament as linhas correspondentes na tabela relacionada. isso significa se uma linha for atualizada ou excluida na tabela principal todas as linhas relacionadas na tabela secundária tambem serão excluidas ou atualizadas em conformidade(Isso é util quando voce deseja manter a integridade referencial entre as tabelas e garantir que não haja registros orfãos).

## 2 => 'Ondelete AND Onupdate - SET NULL' - Quando voce define os campos como SET NULL => Qualquer ação de exclusão ou atualização na tabela principal resultará em definição do valor das colunas correspondentes nas tabelas secundárias como 'NULL' , isso significa que quando as linhas forem excluidas ou atualizadas da tabela principal as colunas relacionadas nas tabelas secundárias vão ter o campo definido como "null", permitindo valores nulos nestas colunas, (esse metodo é bom quando voce quer permitir registros orfãos na tabela secundária ou quando as colunas relacionadas não são obrigatórias)

## +++++++++++++++++++++ ANALISE DE TABELAS E MIGRATIONS E FOREIGN KEYS

## 1 - PORQUE EU CRIEI UM CONTEINER PARA O DATE PROVIDER ? => // Eu utilizo a data como uma injeção porque eu criei um provider "que é um conteiner" com as implementações das datas que está dentro de "shared" container , providers, porque se eu tiver que usar as datas em diferentes arquivos eu utilizo aquele container de implementação,e não fica como responsabilidade de um useCase fazer toda aquela implementação porque por exemplo eu utilizo ela na criação do refresh token e na criação da devolução e do rentals então eu posso isolar essa responsabilidade, se eu fosse somente utilizar em um arquivo em um unico "useCase" eu poderia fazer a implementação diretamente no arquivo.

## ++++++++++++++++++++++++++++++++++++++++ MODIDICAÇÃO DO MIDDLEWARE PARA REFRESH TOKEN

## 1 - O Nosso middleware ele está só verificando o "Normal Token" por isso vamos ter que modificar o nosso midleware para verificar também o "Refresh_Token"

## 2 - Eu preciso fazer essa modificação para que seja possível, eu utilizar o refresh_token tambem para fazer coisas que só usuários autenticados podem, como criar uma "specificação" e acessar essas rotas privadas , os dois tokens devem funcionar.

## 3 - Ao invés da gente receber o "Secret" do token , que vinha do dotenv, nós vamos receber o 'auth.secret_refresh_token' , do secret do "RefreshToken" na função verify do middlware

## 4 - E temos que receber o new UsersTokensRepository();

## 5 - Ao invés da gente utilizar o 'UsersRepository' nós vamos utilizar o const user = await usersTokenRepository.findByUserIdAndRefreshToken(

            user_id,
            token
        ); e assim a a gente consegue fazer a nossa validação a gente vai substituir um repositório no lugar do outro.

## 6 - Eu tenho que gerar o refresh_token baseado nele mesmo ou seja, eu pego o refresh_token gerado que eu utilizei para acessar alguma rota e passo novamente , na rota refresh_token, gerando um novo token com base naquele.

## 7 - E se eu gerar um novo a partir desse , se eu passar o antigo novamente ele não deve existir na minha base de dados porque eu já gerei um novo no lugar dele.

## 8 - então após gerar outro token se eu tentar fazer uma criação em uma rota privada com o token antigo que foi utilizado para gerar outro ele deve me fornecer um erro, de que o token não existe

## ++++++++++++++++++++++++++++++++++++++++++++++ RECUPERAÇÃO DE SENHA, CRIANDO CASO DE USO.

## 1 - Ferramenta para o ambiente de teste que vamos utilizar para realizar o envio dos nossos "emails" diferente do que fizemos no crm que colocamos diretamente um email pessoaç para enviar os emails.

## 2 - O nome da ferramenta é "Ethereal"., ele tambem usa o nodemailler para enviar o email, assim como utilizamos já, porém vai fazer o mesmo trabalho do "mailTrap".

## 3 - Nós não precisamos criar uma conta real, com email e tal , ele cria uma conta fake com o "smt" já fake personalizado para testes, isso é só para testes.

## +++++++++++++++++++++++++++ CRIANDO PROVIDER DE EMAIL

## 1 - Assim como criamos um provider para as "datas" nós tambem vamos criar um provider para o email , utilizando o nodemailler, igual foi feito no crm.

## ++++++++++++++++++++++ INSERINDO TEMPLATE ENGINE PARA ENVIO DE EMAIL (HANDLE-BARS)

## 1 - A gente vai utilizar essa view engine para que a gente consiga "Formatar e organizar o nosso email de uma forma correta" para que nos seja enviado mais informações e um email mais detalhado para que o usuário possa entender.

## 2 - Nós vamos utilizar o "handle-bars" , para criar um template de html e css dentro dela , é basicamente a criação de um template.

## 3 - Temos que criar uma pasta "views" dentro dessa pasta nós criamos uma pasta descrevendo o nosso serviço , nesse caso "emails".

## 4 - No Nosso arquivo handleBars tudo que a gente quiser passar como variavel tem que ser {{}} dentro de duas chaves, porque depois a gente vai passar essas variaveis dentro do nosso código e o nosso código vai converter, todas as váriaveis para o handleBars entender.

## 5 - A gente pode estilizar o "handleBars" através de uma taga "style" utilizando classes do css ou nomes das tags.

## +++++++++++++++++++ TESTE DE ENVIO DE EMAIL (SEND FORGOT PASSWORD EMAIL)

## 1 - A gente vai ver como fazer os testes quando a gente ta utilizando uma bibilioteca externa e a gente depende dessa bibilioteca para conseguir enviar o email

## 2 - Vamos ter que criar um repositório in memory para o nosso "mailProvider" igual nós fazemos com os nossos repositórios de cada useCase.

## 3 - a nossa função "sendMail" que vai ser utilizado no repositoryInMemory do mail provider, não vai ter funcionalidade nenhuma, porque eu não vou realmente enviar o email por parte dele é como se fosse informações "mocadas".

## 4 - Posso testar testes em especifico sem ter que rodar todos os testes de uma só vez => "npm test src/modules/accounts/sendForgotPasswordMail/sendForgotPsswordMailUseCase.spec.ts" , posso navegar até um determinado teste e executalo.

## +++++++++++++++++++ COVERAGE REPORTS

## 1 - Nós conseguimos ver a cobertura dos nossos testes, ver se a gente cobriu todas as funcionalidades do useCase da nossa aplicação, o que precisa cobrir ainda

## 2 - O certo seria a gente entrar em cada caso de uso da nossa aplicação e verificar isso , mas a gente pode utilizar uma funcionalidade do jest "collectCoverage" para verificar essa cobertura dos nossos testes.

## 3 - A gente vai habilitar para true o "collectCoverage" e dentro de "collectCoverageFrom" a gente vai colocar quais as classes que a gente quer mapear com o coverage para ps testes, a gente tem várias pastas , a gente vai pedir para ele verificar só o que está dentro do nosso useCase.

## 4 - Passamos o nosso arquivo assim => collectCoverageFrom: ["<rootDir>/src/modules/**/useCases/**/*.ts"], tudo que tiver asterisco é "generico" ou seja ele vai verificar todos os arquivos dentro dessa determinada pasta.

## 5 - A gente vai criar uma pasta chamada "coverageDirectory", onde a gente vai colocar todas as informações do nosso coverage ele vai gerar um arquivo para a gente mostrando quais são todas as coberturas dos nossos testes. => coverageDirectory: "coverage",

## 6 - coverageReporters: ["text-summary", "lcov"], com esse summary ele vai dizer pra a gente o que está acontecendo no nosso código.

## 7 - Quando eu rodar o "npm test" ele vai me mostrar em porcentagem na minha aplicação como "statments" , "branches", "functions", "lines" tudo que está lá se ta tudo coberto pra a gente ter uma noção da cobertura dos nossos testes.

## 8 - ele cria para a gente uma pasta "coverage" com uma pasta "icov-report" com algumas informaçãoes dentro e com as pastas dos nossos modules "accounts", "cars", "rentals"

## 9 - ele cria uma arquivo html e eu posso abrir esse arquivo no browser, ele vai me mostrar um gráfico, com todos os useCases que agente mapeou e ele mostra tud que aborda dentro dos nossos testes e mostra tudo aquilo que a gente não testou também., ele mostra em resumo e grifa partes do codigo que não foi testado.

## 10 - Mostra quantidade de linhas em cada arquivo e quantas linhas dessas nós estamos abordando nos nossos testes.

## ++++++++++++++++++++++++++++++ ENVIO DE SMS (TWILLO)

## 1 - Uma bibilioteca muito boa para o envio de sms é o "Twillo", muita famosa, faz envios de sms , whatsapp , e email tambem.

## +++++++++++++++++++++++++++++++ CORRIGINDO O REFRESH_TOKEN

## 1 - O refresh_token é necessário para que o usuário não precise caso o token dele expire fazer o login novamente, ele só precisa passar na rota de refreshToken aquele token dele que já foi gerado e conseguirá gerar outro token.

## 2 - O "Token" normal ficou sem sentido para o propósito que ele foi criado, isso porque a gente só ta utilizando o refresh_token para fazer as validações até então.

## 3 - A nossa lógica se tornou errada , pq o usuário tem um "token" normal e a partir do momento que esse token normal expira o usuário deve utilizar o refresh_token para gerar um token novo e não ficar utilizando o refresh_token e deixar o token normal "obsoleto"

## 4 - A gente vai alterar o refresh_Token e o ensureAuthenticate para melhorar a lógica

## 5 - Quem vai mandar em tudo é o token e o refresh_token vai ser utilizado só pra gerar um novo token quando aquele "token" expirar

## 6 - Nós vamos fazer somente uma pequena alteração para que seja retornado no useCaseRefresh_token o nosso "newToken" e o nosso "refresh_token" a gente criou esse newToken no final do useCase.

## 7 - Nós vamos ter que recuperar no nosso "ensureAuthenticate" pelo token, se não ele vai ficar retornando token inválido.

## 8 - Nas aulas a seguir a gente tinha colocado no nosso "ensureAuthenticated" para recuperar a partir do "Refresh_token" e agora nós voltamos para o token.

## 9 - Para testar => Coloque o tempo de expiração do token em auth "para 30s por exemplo, pra dar tempo de voce testar" e pega o refresh_token gerado na sessão , passa no campo token , na rota "refreshToken" e a resposta da requisição ele vai retornar um token , que será o token que vai poder utilizar novamente.

## ++++++++++++++++++++++++++ CONFIGURAÇÃO AWS (CRIAÇÃO DE CONTA).

## 1 - Primeiro vamos ver a respeito da pasta "tmp" que nós salvamos os nossos uploads isso é bom para quando não estiver em produção pq a app vai crescer muito vai ter muitas imagens e vai encher o disco da sua máquina, para isso vamos arrumar essa parte.

## 2 - Storages (S3 => Amazon) => Armazenamentos especificos dentro da clound que a gente consegue fazer upload de arquivos pra dentro dele, a própria empresa tem o serviço de storage e toda essa parte fica com responsabilidade dele , de espaço e hardware fica tudo por conta deles.

## 3 - Temos que criar um "iam" na aws "services" que é um usuário com chaves

## 4 - Colocamos o acesso "programático" que é basicamente a gente vai gerar através de chaves

## 5 - Para cada serviço da amazon ele tem um politica de permissão que a gente pode dar acesso, a gente pesquisa pelo serviço que quer, pode liberar algumas coisas , a gente coloca como full acesse

## 6 - A gente pode acessar essas permissões, que está em json e personalizar tambem as permissões que a gente quer para aquele determinado serviço

## 7 - A gente vai copiar o "chave de acesso secreta" e a "chave secreta" desse usuário para que possamos utilizar o serviço desse usuário, o nome dessa pasta "storage" criada se chama bucket.

## 8 - Você pode salvar essas credenciais em um arquivo ou baixar o documento "csv" e salvar no pc , porque pode não ser possível recuperar essas credenciais novamente

## 9 - Depois da chave criada, a gente vai em services novamente e pesquisa por "s3"

## 10 - Vamos criar um "bucket" e retirar a opção "Bloquear todo o acesso ao publico", porque futuramente a gente quer que esses uploads sejam vistos pelos usuários que estão acessando a página, e possam ver as imagens dos carros por exemplo.

## 11 - Reconhece as configurações do blloqueio, afirmando que tem certeza em deixar público.

## 12 - após criar o bucket , ele vai tá dísponivel nos serviços "s3" e em seguida o seu usuário tambem vai ta disponivel em "iam".

## 13 - A gente tem duas possibilidades de fazer o upload de arquivos nesse "bucket" manualmente clicando no botão "carregar" e colocando a imagem da nossa máquina e através do código quando a gente acessar determinada rota, que é exatamente o que a gente vai fazer ao invés de acessar a pasta "tmp" que é o que faz sentido, e não fazer de forma manual.

## +++++++++++++++++++++++++++++++++++++++++++++++++ PROVIDER DE UPLOAD COM O S3(AWS-SDK)

## 1 -Vamos baixar a bibilioteca "npm i aws-sdk"

## 2 -A gente vai colocar as credenciais do nosso usuário com o bucket em váriaveis de ambiente, porém a aws ela possui um nome especifico, para essas váriaveis de ambiente que ela já pode pegar em "aws sdk enviroment".

## 3 - Quando subir o projeto, essas váriaveis já vão estar dísponiveis para a nossa aplicação.

## 4 - Podemos colocar o nome do nosso "bucket" nas váriaveis de ambiente também.

## 5 - O upload de "avatar" a gente ta fazendo tudo aqui dentro do nosso código, mas nós precisamos ter um upload para a produção no "s3" e um upload para desenvolvimento que é na pasta "tmp" e gente vai chamar esse "s3" de provider, do mesmo jeito que a gente criou o provider de "email" e o provider de "data", ele tem que ser um provider tambem porque futuramente se a gente quiser esse serviço de "storage" para outra empresa, tem que ser possível.

## 6 - // 2 - A gente vai ter duas implementations , o localStorage, que é para quando a gente tiver utilizando em ambiente de desenvolvimento. E a gente vai ter o outro, que vai ser o "s3 storage" que vai ser utilizado para o ambiente de produção

## 7 - Vamos ter que fazer algumas alterações no "multer" , no config, porque o multer vai ser necessário para fazer os uploads tanto no local, quanto no "s3" da amazon

## 8 - Nós vamos precisar "injetar" o nosso provider de storage no "useCase" de updateAvatar para resultar tambem

## 9 - A lógica do "useCase" continuou a mesma, a única coisa que mudou foi "substituir os metodos de salvar e deletar que estavam no utils e interface e coloquei a implementação do repositorio do meu provider" para que eu consiga mudar o serviço mais pra freente se eu quiser.

## ++++++++++++++++++++++++++++++++ APLICAÇÃO DO S3 NA APLICAÇÃO, IMPLEMENTAÇÃO DO PROVIDER S3 STORAGE

## 1 - Nós vamos utilizar uma condicional igual utilizamos para acessar o banco de dados nos testes de integração, se tiver em produção, quero que a o meu "disk" utilize o S3Provider se estiver em "desenvolvimento" quero que utilize o meu "localStorageProvider", para separar estas imagens.

## ++++++++++++++++++++++++++++++++ CRIANDO URL DE ACESSO AO AVATAR , CONGIGURANDO O UPLOAD DE IMAGENS DE CARROS ATRAVÉS DO NOSSO PROVIDER CRIADO

## 1 - Nós vamos criar uma rota para que o usuário consiga ver o "profile dele" a url que o usuário tem de sua foto, para que ele consiga ver suas informações , porque a gente não tem isso ainda, é como se fosse um rota de perfil.

## 2 - Vamos criar um useCase e uma rota que o usuário consiga acessar suas informações o seu "porfile".

## 3 - Repare que eu consigo sempre pegar o id do usuário utilizando o "req.user" que a gente definiu na pasta "types" que seria uma tipagem do express , para a gente pegar o id pelo token do usuário passado.

## 4 - // 1- Essa rota vai ser passado o token do usuário autenticado e ele vao retornar as informações deste usuário autenticado como o "id", "driver_license". "avatar " e etc, 2 - Só que ele tambem ta retornando a senha hasheada do usuário e a gente não quer isso, é sensível e is admin tambem não deve retornar. 3 - E a gente não ta retornando a url do avatar para o usuário acessar para ver o avatra dele , a a gente avi ter que criar isso.

## 5 - Conceito de Maper => "mapper" que é quando a gente não quer retornar para o usuário o "objeto" completo, só algumas informações de forma melhorada, como é o caso da nossa rota profile em que a gente quer retornar uma "url" acessível e não quer retornar a senha hasheada do usuário quando a gent dar um "get" neste usuário.

## 6 - Gerar url => ("class-transformer"), bibilioteca para gerar url => npm i class-transformer, com essa bibilioteca a gente consegue manipulara a nossa entidade

## 7 - // 2 - Vou criar uma função com essa bibilioteca para quando a gente fizer um requisição eu tenha tambem a url, "Expose" ele vai expor essa informação, essa função vai dentro da entidade que a gente ta fazendo o useCase, ou seja , users.

## 8 - // 4 - A gente vai utilizar um "switch" se a gente tiver utilizano "local" a url vai ser local , se a gente tiver utilizando o "s3" a url vai ser do s3.

## 9 - Como eu to utilizando arquivo staticos na minha aplicação para eu fornecer a url para o usuário "local" eu tenho que passar aquele middleware que a gente utilizou quando tava utilizando view engineer "ejs" para poder pegar imagens staticas => app.use("/avatar", express.static());

## 10 - no login da nasa utilizei isso => app.use(express.static(path.join(\_\_dirname , "public"))). passando o caminho de arquivos staticos da minha pasta de arquivos.

## OBS -> Perceba que é um teste de integração para cada useCase assim como é um teste unitário para cada UseCase também, a diferenaça que o teste unitário testa função por função individualmente de cada rota e o teste de integração testa a funcionalidade da rota inteira diretamente com a ligação com o banco de dados , se realamente aquilo tudo está funcionando junto, ele testa as rotas da aplicação e não os metodos.

## OBS => npm test -- --runInBand ("Utilizar este comando para nao rodar os testes unitários ao mesmo tempo que o de integração pode dar erro de chave duplicada por exemplo").
