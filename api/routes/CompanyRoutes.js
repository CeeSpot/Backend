'use strict';
var companyController = require('../controllers/CompanyController');

module.exports = function (app) {

    // example Routes
    app.route('/api/companies').get(companyController.getCompanies);
    app.route('/api/companies/:company_id').get(companyController.getCompany);

};
