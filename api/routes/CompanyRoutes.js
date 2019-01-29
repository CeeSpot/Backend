'use strict';
var companyController = require('../controllers/CompanyController');
let auth = require('../Auth')
module.exports = function (app) {

    // example Routes
    app.route('/api/companies').get(companyController.getCompanies);
    app.route('/api/companies/company/:company_id').get(companyController.getCompany);
    app.route('/api/companies/register').post(auth.verifyToken, companyController.createCompany);

    app.route('/api/companies/me').get(auth.verifyToken, companyController.me);
    app.route('/api/companies/update').put(auth.verifyToken, companyController.updateCompany);

    app.route('/api/company/recovery').post(companyController.recoveryMail);
    app.route('/api/company/recovery').put(companyController.recoveryEditPassword);
};
