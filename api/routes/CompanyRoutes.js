'use strict';
var companyController = require('../controllers/CompanyController');

module.exports = function (app) {

    // example Routes
    app.route('/api/companies').get(companyController.getCompanies);

};
