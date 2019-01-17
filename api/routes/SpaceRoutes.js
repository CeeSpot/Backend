'use strict';
var spaceController = require('../controllers/SpaceController');
module.exports = function (app) {

    app.route('/api/spaces').get(spaceController.getSpaces);
    app.route('/api/spaces/:space_id').get(spaceController.getSpace);
    app.route('/api/spaces/update').put(spaceController.updateSpace);
    app.route('/api/spaces/delete').delete(spaceController.deleteSpace);
    app.route('/api/spaces/request').post(spaceController.addRequest);
    app.route('/api/spaces/add').post(spaceController.addSpace);
    app.route('/api/spaces/availability').post(spaceController.getAvailable);
    app.route('/api/spaces/getrequests').get(spaceController.getSpaceRequests);
};