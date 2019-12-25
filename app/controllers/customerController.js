const response = require('../libs/responseLib');
const check = require('../libs/checkLib');
const apiConfig = require('../../config/apiConfig');
let fs = require('fs');
let customerData = './data/customers.txt';
let stringParser = require('../utils/stringArrayParser');
let distanceCal = require('../utils/distanceCalc');
let logger = require('../libs/loggerLib');
let sorting = require('../utils/sortObjectsArray');
const maxRequiredDistance = 100.00;

//callback function handleing the request

let getEligibleCustomers = (req, res) => {
    // calling readfile sync function to read the customer data from customers.txt file
    fs.readFile(customerData, (err, data) => {
        let apiResponse;
        if (err) { // if eror occureed while reading the file
            logger.error(err.message, 'customerController', 10);
            apiResponse = response.getResponse(true, 'Error generated while reading data', 500, null);
            res.send(apiResponse); // send the response to the client
        } else if (check.isEmpty(data)) { //checking if file is not empty
            log.error('File is empty', 'customerController', 7)
            apiResponse = response.getResponse(true, 'File is empty', 404, null);
            res.send(apiResponse); // send the response to the client
        } else {
            // calling tranform function to get the required data in JSON format instead of buffer
            let eligibleCustomers = transformData(data);
            logger.info('Found eligible customers', 'customerController', 10)
            apiResponse = response.getResponse(false, 'Found eligible customers', 200, eligibleCustomers);
            res.send(apiResponse); // send the response to the client
        }
    });
};

let transformData = (data) => {
    //convert buffer to string
    let stringData = data.toString();
    let eligibleCustomers = [];
    // calling parser utility to get data in JSON format
    let customers = stringParser.getParsedJsonarray(stringData);
    for (customer of customers) {
        let destinationLon = parseInt(customer.longitude, 10);
        let destinationLat = parseInt(customer.latitude,10);
        //calling distance calculator utility of each customer
        let calculatedDistance = distanceCal.calculateDistance(apiConfig.sourceLatitude, apiConfig.sourceLongitude, destinationLat, destinationLon);
        //comparing the calculated distance with required max distance 
        if (calculatedDistance <= maxRequiredDistance) { 
            customer.distance = calculatedDistance;
            eligibleCustomers.push(customer);
        }
    }
    //sorting the list of eligible customers based on user_id in ascending order
    eligibleCustomers = sorting.getSortedData(eligibleCustomers, 'user_id', true)
    return eligibleCustomers;
}

module.exports = {
    getEligibleCustomers: getEligibleCustomers
}


