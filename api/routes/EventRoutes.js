'use strict';
var eventController = require('../controllers/EventController');
var auth = require('../Auth');
module.exports = function (app) {

    // example Routes
    app.route('/api/event/:event_id').get(eventController.getEvent);
    app.route('/api/events').get(eventController.getEvents);
    app.route('/api/event/:event_id').get(eventController.getEvent);
    app.route('/api/events/add').post(eventController.addEvent);
    app.route('/api/events/delete').delete(eventController.deleteEvent);
    app.route('/api/events/update').put(eventController.updateEvent);
    app.route('/api/events/participants/:event_id').get(eventController.getParticipants);
    app.route('/api/events/userevent').post(auth.verifyToken, eventController.addUserEvent);
    app.route('/api/events/userevent').delete(auth.verifyToken, eventController.removeUserEvent);
};
