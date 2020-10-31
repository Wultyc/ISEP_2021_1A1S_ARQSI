# RedeMasterData project

This project is related to the backend web services available for the project

## File structure
```
─backend
    ├───config		    -> config files for all envoironments
    ├───controllers	    -> application controllers
    │   └───api		    -> api controllers
    ├───events		    -> application events
    ├───loaders		    -> components that loads with the application 
    ├───models		    -> application models
    ├───node_modules	-> node modules
    ├───routers     	-> HTTP routs
    └───services	    -> business logic implementation 
```
This structure is based on the article [Bulletproof node.js project architecture](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf)

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