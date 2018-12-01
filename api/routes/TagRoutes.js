'use strict';
var tagController = require('../controllers/TagController');

module.exports = function (app) {

    // example Routes
    app.route('/api/tags').get(tagController.getTags);

};
