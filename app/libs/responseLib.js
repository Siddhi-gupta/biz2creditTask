/*---
Library to give the standard for mat to the 
response throught the appication
---*/

let getResponse = (error, message, status, data) => {
    let response = {
        error: error,
        message: message,
        status: status,
        data: data
    }

    return response;
};

module.exports = {
    getResponse: getResponse
};