'use strict';
var authorisationController = require('../controllers/AuthenticationController');
var auth = require('../Auth');

module.exports = function (app) {

    // example Routes
    // app.route('/api/users/tags').post(auth.verifyToken, userController.addTags);
    app.route('/api/auth/users/isLoggedIn').get(auth.verifyToken, authorisationController.isLoggedIn);
    app.route('/api/auth/users/isAdmin').get(auth.verifyToken, authorisationController.isAdmin);
    app.route('/api/auth/users/profilemanagement').get(auth.verifyToken, authorisationController.allowProfileManagement);

    app.route('/api/auth/bookings/spaces/noconfirm').get(auth.verifyToken, authorisationController.allowSpaceBookingNoConfirm);
    app.route('/api/auth/bookings/events/noconfirm').get(auth.verifyToken, authorisationController.allowEventBookingNoConfirm);

    app.route('/api/auth/companies/cancreateaccount').get(auth.verifyToken, authorisationController.allowCreateCompanyPage);
};
