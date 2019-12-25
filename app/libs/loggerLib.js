/*---
Library to write logs in the console in predefined format throught
with the help of pino tool
----*/

const pino = require('pino'); //module used for logging logs faster
const moment = require('moment'); // module for calculating time
const logger = pino();

//function to log errors
let captureError = (errorMessage, errorOrigin, errorLevel) => {
    let currentTime = moment.now();
    let errorResponse = {
        timeStamp : currentTime,
        errorMessage : errorMessage,
        errorOrigin : errorOrigin,
        level: errorLevel
    }
    logger.error(errorResponse);
    return errorResponse;
};

//function to log info
let captureInfo = (message, origin, importance) => {
    let currentTime = moment.now();
    let infoResponse = {
        timeStamp : currentTime,
        message : message,
        origin : origin,
        level: importance
    }
    logger.info(infoResponse);
    return infoResponse;
};

module.exports = {
    error: captureError,
    info: captureInfo
}