'use strict';
var tagController = require('../controllers/TagController');

module.exports = function (app) {

    // example Routes
    app.route('/api/tags/users').get(tagController.getUserTags);
    app.route('/api/tags/companies').get(tagController.getCompanyTags);
};
