'use strict';
var tagController = require('../controllers/TagController');
var auth = require('../Auth');

module.exports = function (app) {

    // example Routes
    app.route('/api/tags/users').get(tagController.getUserTags);
    app.route('/api/tags/companies').get(tagController.getCompanyTags);
    app.route('/api/tags/add/:id').post(auth.verifyToken, tagController.addTag);
    app.route('/api/tags/edit/:id').put(auth.verifyToken, tagController.editTag);
    app.route('/api/tags/delete/:id').delete(auth.verifyToken, tagController.deleteTag);
};
