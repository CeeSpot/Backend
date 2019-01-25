'use strict';
var spaceController = require('../controllers/SpaceController');
var auth = require('../Auth');

module.exports = function (app) {

    app.route('/api/spaces').get(spaceController.getSpaces);
    app.route('/api/spaces/:space_id').get(spaceController.getSpace);
    app.route('/api/spaces/book').post(auth.verifyToken, spaceController.addBooking);

    app.route('/api/spaces/update').put(auth.verifyToken, spaceController.updateSpace);
    app.route('/api/spaces/delete').delete(auth.verifyToken, spaceController.deleteSpace);
    app.route('/api/spaces/add').post(auth.verifyToken, spaceController.addSpace);

    // Bookings for spaces
    app.route('/api/requests/spaces/requests').get(auth.verifyToken, spaceController.getSpaceRequests);
    app.route('/api/requests/spaces/state').put(auth.verifyToken, spaceController.updateReservationState);
};