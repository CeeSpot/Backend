'use strict';
var eventController = require('../controllers/EventController');

module.exports = function (app) {

    // example Routes
    app.route('/api/events').get(eventController.getEvents);
    app.route('/api/events/userevent')
        .post(eventController.addUserEvent)
        .delete(eventController.removeUserEvent);
    app.route('/api/events/add').post(eventController.addEvent);
    app.route('/api/events/delete').delete(eventController.deleteEvent);
    // app.route('/api/events/userevent/remove').post(eventController.removeUserEvent);
};
