# RedeMasterData project
This project is related to the Rede Master Data web service available for the project

## File structure
```
─backend
    ├───config              -> config files for all environments
    ├───controllers	        -> application controllers
    │   └───api             -> api controllers
    ├───dto                 -> data transformation objects
    ├───events              -> application events
    ├───loaders             -> components that loads with the application 
    ├───logs                -> application logs
    ├───middlewares         -> modules that run during execution to make side tasks such as loggin and autentication
    ├───models              -> application models
    ├───models              -> application repository
    ├───node_modules        -> node modules
    ├───routes              -> HTTP routes
    │   └───api             -> api routes
    ├───.env                -> environment file. used to store specific environment configuration such as credentials
    ├───.env.example        -> example of environment file
    ├───app.js              -> main app file
    ├───package.json        -> project configuration file. is where its define the project details, dependencies list, custom scripts and more
    └───package-lock.json   -> list of actual version of every dependency
```
This structure is based on the article [Bulletproof node.js project architecture](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf)

## .env file
.env file is used to store some informations that are specific for each environment such as credentials. It looks like this:
```
NODE_ENV=development
APP_PORT=3000
DB_CONNECT=mongodb+srv://exampleusername:exampleuserpassword@example.com/dbname
```
If you don't have any .env file you should copy the content of .env.example to .env and then replace all applicable values with yours

## How to run this project
If is the first time you run this project you should run the following command to download all dependencies
```
npm install
```

If you want to run this with auto reload use
```
npm run dev
```

## Install a new dependency
For app dependencies (dependencies that are needed to use your application, e.g express) use
```
npm install --save <Package Name>
```
For dev dependencies (dependencies that are used to help during development process, e.g. nodemon) use
```
npm install -D <Package Name>
```