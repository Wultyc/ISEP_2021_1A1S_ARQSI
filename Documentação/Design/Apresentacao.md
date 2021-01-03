# Apresentação

## Introdução
A Autoridade Intermunicipal de Transportes (AIT) [Empresa fictícia para efeitos do projeto de LAPR5.] pretende que seja desenvolvido um sistema para gerir os transportes públicos. Dentre outras opções é esperado que seja possível gerir e consultar as redes de transportes, linhas e viagens, bem como fazer o planeamento das viaturas e tripulantes para cada uma das linhas.

### Rede de um operador
A rede de um operador é o conjunto dos pontos utilizados por esse operador para a recolha e entrega dos clientes bem como os pontos onde as viaturas são deixadas quando terminam o seu serviço. Cada um destes pontos é denominado *Nó*. Esses nós podem ser encadeados entre si de forma a criar *Percursos* que serão utilizados pelas viaturas. 

### Linhas
Uma linha serve para ligar dois pontos entre si e tipicamente possuem dois percursos.

### Viagens
Um viagem define o horário no qual a viatura irá passar em cada um dos nós de um determinado percurso.

### Serviços de viatura e de tripulante
Um serviço de viatura ou de tripulante servem para, respetivamente, associar uma viatura ou tripulante a uma viagem.

## Âmbito do projeto
Pretende-se o desenvolvimento de um sistema de apoio a várias atividades de gestão da AIT que se representa genericamente na Figura 8. O sistema deve ser composto por uma aplicação web do tipo single Page Application (SPA) que permite aos utilizadores autorizados acederem aos diferentes módulos da aplicação, bem como por um conjunto de serviços que implementem as componentes de regras de negócio necessárias para o funcionamento da aplicação web.

De um modo geral, as principais funcionalidades de cada módulo são as seguintes:
- Master data – permite a gestão da informação relacionada com a rede (nós, percursos), tipos de viaturas, tipos de tripulantes, linhas e viagens.
- Planeamento – com base nos percursos existentes planear as trocas de tripulações nos pontos de rendição. Planear os serviços de tripulantes com base nos serviços de viatura. Consome a informação gerida no módulo master data e publica informação do planeamento para o módulo de visualização.
- Visualizador – permite a visualização 2D e 3D da rede, a navegação pela cena e a consulta gráfica de informação sobre as viagens. Consome a informação gerida no módulo master data e no módulo
planeamento.
- UI – interface com o utilizador
- Clientes + RGPD – gestão de informação dos utilizadores finais “clientes” e seus consentimentos no âmbito do RGPD

Embora não esteja no âmbito atual do projeto, deve ser levado em conta na arquitetura da solução, a extensão futura para aplicações móveis.

A solução deve contemplar três tipos de utilizadores:
- Data administrators – utilizam os módulos master data.
- Cliente – regista-se e utiliza o módulo de visualização.
- Gestor – utiliza o módulo de planeamento.

No âmbito do projeto atual, a administração de utilizadores pode ser efetuada diretamente na base de dados não sendo necessário um módulo de gestão de utilizadores.

### Desenvolvimento do sistema
Tratando-se de um projeto académico, as diferentes componentes serão desenvolvidas em *Unidades Curriculares* distintas
- ALGAV – Planeamento
- ARQSI – Master data
- ASIST – Desenho e operação de sistemas
- SGRAI – Visualização

Nota: Devido ao facto que os estudantes que constituem este grupo apenas frequentam a unidade curricular ARQSI, apenas foi implementada a componente Master Data e respetiva UI

## Lista de requisitos do sistema

### Requisitos funcionais

#### Master data

##### Master Data Rede
1. Como data administrator, quero importar nós, percursos, linhas, tipos de viatura e tipos de tripulantes de dum ficheiro .glx.
1. Como data administrator, quero criar nós da rede indicando o seu nome, se é ou não uma estação de recolha ou ponto de rendição e as suas coordenadas.
1. Como data administrator, quero criar linha indicando o seu código (ex., “C”), nome (ex., “Linha Verde”) e os seus nós terminais (ex., Campanhã, ISMAI), bem como eventuais restrições sobre o tipo de viatura e tipo de tripulante.
1. Como data administrator, quero definir um percurso de ida/volta de uma linha. Definir os vários segmentos que constituem um percurso indicando a ordem e a distância e tempo de viagem de cada segmento
1. Como data administrator, quero criar tipo de tripulante, ex., “motorista sénior com conhecimento de línguas estrangeiras”. Um tipo de tripulante é uma descrição livre (não catalogada) de características.
1. Como data administrator, quero criar tipo de viatura (ex., “minibus a gasóleo”), indicando o seu tipo de combustível (i.e., Diesel, Gasolina, Elétrico, GPL, Gás), autonomia, custo por quilómetro, consumo médio e velocidade média.
1. Como data administrator, quero listar nós de rede. O utilizador deve poder ordenar por código/nome e filtrar por código/nome (ex., todos os nós cujo nome começa por “Par”) os resultados.
1. Como data administrator, quero listar linhas. O utilizador deve poder ordenar por código/nome e filtrar os resultados por código/nome (ex., todos as linhas cujo nome começa por “Par”).
1. Como data administrator, quero listar percursos duma linha.

##### Master Data Viagem
1. Como data administrator, quero importar viagens, serviços de viatura, blocos de trabalho e serviços de tripulante de dum ficheiro .glx.
1. Como data administrator, quero definir viatura.
1. Como data administrator, quero definir tripulante (nome, data de nascimento, número de carta de condução, data de validade de licença de condução) associando um ou mais tipos de tripulante.
1. Como data administrator, quero criar viagem ad hoc para uma dada linha indicando a hora de saída e o percurso.
1. Como data administrator, quero criar as viagens para uma linha dando a hora de início, a frequência e o número de viagens, o percurso de ida e o de volta
1. Como data administrator, quero criar um serviço de viatura ad hoc
1. Como data administrator, quero criar um serviço de tripulante ad hoc
1. Como data administrator, quero criar os blocos de trabalho de um serviço de viatura com base na duração de cada bloco e número de blocos máximos e consecutivos.
1. Como data administrator ou cliente quero listar as viagens de uma linha
1. Como data administrator, quero listar serviço de viatura num determinado dia.
2. Como data administrator, quero listar serviço de tripulante num determinado dia.

### Requisitos não funcionais
1. Cada sistema só poderá aceder aos dados que lhe pertencem.
1. A SPA deve permitir acesso a todos os módulos do sistema: master data, planeamento e visualização, bem como RGPD.

## Arquitetura do sistema
Seguindo a linha de raciocínio da separação por módulos, cada módulo será implementado numa aplicação independente que irá expor uma API REST. Estas APIs serão consumidas pelas outras aplicações e pela SPA.
ex: A API do Master Data Rede será consumida pela SPA para apresentar/modificar a informação e pelo Viagem Master Data para garantir a integridade da informação recebida.
Cada aplicação será construida numa arquitetura de camadas com responsabilidades bem definidas entre si. 