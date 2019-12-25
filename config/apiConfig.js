// Basic configurations for api
let apiConfig = {};
apiConfig.port = 3000; // localhost port on which api will be serve
apiConfig.apiVersion = "/api/v1"; //defining the version of api
apiConfig.sourceLongitude = -6.257664; // longitude of Dublin
apiConfig.sourceLatitude = 53.339428; // latitude of Dublin

// To make these configurations available to other parts of application
module.exports = {
    port: apiConfig.port,
    version: apiConfig.apiVersion,
    sourceLongitude: apiConfig.sourceLongitude,
    sourceLatitude: apiConfig.sourceLatitude
};