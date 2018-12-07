'use strict';
var eventController = require('../controllers/EventController');
var auth = require('../Auth');
module.exports = function (app) {

    // example Routes
    app.route('/api/events').get(eventController.getEvents);
    app.route('/api/events/userevent').post(auth.verifyToken, eventController.addUserEvent);
    app.route('/api/events/userevent').delete(auth.verifyToken, eventController.removeUserEvent);
    // app.route('/api/events/userevent/remove').post(eventController.removeUserEvent);
};
