'use strict';
var spaceController = require('../controllers/SpaceController');
module.exports = function (app) {

    // example Routes
    app.route('/api/spaces').get(spaceController.getSpaces);
    app.route('/api/spaces/request').post(spaceController.addRequest);
};