const express = require('express');
const path = require('path');
const http = require('http');
const apiConfig = require('./config/apiConfig');
const logger = require('./app/libs/loggerLib');
let fs = require('fs'); // file system module

const app = express();

//using express static method to serve the static pages in /client path
app.use(express.static(path.join(__dirname, 'client')));

//creating http server
const server = http.createServer(app);
//listen to port 3000 mentioned in config file
server.listen(apiConfig.port);
server.on('error', onErrorHandler);
server.on('listening', onListeningHandler);

// listening event handler
function onListeningHandler () {
    logger.info('lisetning on port 3000', 'serverOnListnerHandler', 5);
}

// event handler on error while bootsraping server
function onErrorHandler (error) {
    // throw error if system call is not listen 
    if (error.sysCall != 'listen') {
        logger.error(error.code + " not equal listen", "serverOnErrorHandler", 10);
        throw error;
    }

    //check the various possible error code and log the info on the console
    switch (error.code) {
        case 'EACCES' :
        logger.error(error.code + " evaluated access is required", "serverOnErrorHandler", 10);
        process.exit(1);
        break;
        case 'EADDRINUSE' :
        logger.error(error.code + " port is already in use", "serverOnErrorHandler", 10);
        process.exit(1);
        break;
        default : 
        logger.error(error.code + " Some unknown errro occured", "serverOnErrorHandler", 10);
        throw error;
    }
}

let routesPath = "./app/routers";

// read the directory to get all the router modules from all the files in the directory
//and call setRoutes() method of each router

fs.readdirSync(routesPath).forEach((file) => {
    if (-file.indexOf('.js')) {
        let routes = require(routesPath + '/' + file);
        routes.setRoutes(app);
    }
});
