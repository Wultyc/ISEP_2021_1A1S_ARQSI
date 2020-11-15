# ImportGLX project
Este projeto é relativo ao serviço ImportGLX 

## File structure
```
ImportGLX
    ├───config              -> Ficheiro de configuração
    ├───controllers	        -> Controllers da aplicação
    │   └───api             -> Controllers da API
    ├───dto                 -> Objetos de transformação de informação
    ├───events              -> Eventos
    ├───loaders             -> Componentes carregados no inicio da aplicação 
    ├───logs                -> Logs da aplicação
    ├───middlewares         -> Módulos executados durante a execução dos pedidos
    ├───models              -> Models da aplicação
    ├───models              -> Repositório da aplicação
    ├───node_modules        -> node modules
    ├───routes              -> Rotas HTTP
    │   └───api             -> Rotas da api
    ├───.env                -> Ficheiro de ambiente da aplicação. Não é sincronizado pelo GIT
    ├───.env.example        -> Exemplos de ficheiro de ambiente da aplicação
    ├───app.js              -> Ficheiro principal da aplicação
    ├───package.json        -> Ficheiro de configuração do projeto. É onde são definidas as listas de dependências, scripts de execução, ect...
    └───package-lock.json   -> Lista da versão atualmente instalada de cada dependeria.
```
Este estrutura é baseada na que é apresentada no artigo [Bulletproof node.js project architecture](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf) com as devidas alterações para corresponder aos requisitos do projeto

## Ficheiro .env
O ficheiro .env é utilizado para armazenar algumas informações imprescindíveis para a execução da aplicação, como por exemplo credenciais. O seu aspeto é semelhante ao seguinte
```
NODE_ENV=development
APP_PORT=3002
DB_CONNECT=mongodb+srv://exampleusername:exampleuserpassword@example.com/dbname
```
Se não existe um ficheiro .env no repositório este deve ser criado como cópia do ficheiro .env.example e alterando os valores das variáveis para o valores que devem ser considerados na aplicação

## Como executar a aplicação
Se for a primeira vez que o projeto é executado e/ou não exista a pasta ```node_modules``` deve-se executar o seguinte comando para instalar todas as dependências necessárias
```
npm install
```

Para executar a aplicação em modo de auto reload, isto é a aplicação irá reiniciar automaticamente caso haja alguma alteração nos ficheiro da aplicação, deve ser usado o seguinte comando
```
npm run dev
```

Para executar a aplicação em modo tradicional deve ser usado o seguinte comando
```
npm run start
```

## Como executar os testes automáticos
A aplicação é distribuída com testes unitários e de integração

Para executar aos testes unitários deve ser usado o seguinte comando
```
npm test
```

Para executar aos testes de integração deve ser usado o seguinte comando
```
npm run integrationTest
```

## Instalar uma dependência
Para dependências da aplicação, isto é dependências para o correto funcionamento da aplicação (e.g express ou lodash) usar o seguinte comando
```
npm install --save <Package Name>
```
Para dependências de desenvolvimento, isto é dependências para auxiliar no desenvolvimento da aplicação (e.g nodemon) usar o seguinte comando
```
npm install -D <Package Name>
```