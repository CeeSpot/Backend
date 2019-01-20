'use strict';
var adminController = require('../controllers/AdminController');
var auth = require('../Auth');
module.exports = function (app) {
    // example Routes
    app.route('/api/settings').get(auth.verifyToken, adminController.getSettings);
    app.route('/api/settings/toggleblog').put(auth.verifyToken, adminController.toggleBlogActive);
};