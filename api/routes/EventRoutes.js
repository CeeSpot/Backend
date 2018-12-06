'use strict';
var eventController = require('../controllers/EventController');

module.exports = function (app) {

    // example Routes
    app.route('/api/events').get(eventController.getEvents);
    app.route('/api/events/userevent').post(eventController.addUserEvent);
    app.route('/api/events/userevent/remove').post(eventController.removeUserEvent);
};
