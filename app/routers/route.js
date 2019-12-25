const customerController = require('../controllers/customerController');
const apiConfig = require('../../config/apiConfig');

//base url of the application prefixing the api version
let baseUrl = `${apiConfig.version}/invite-customers`;

//when route matches baseurl/customer callback function of customer controller will be called
let setRoutes = (app) => {
    app.get(`${baseUrl}/customers`, customerController.getEligibleCustomers);
};

module.exports = {
    setRoutes: setRoutes
}