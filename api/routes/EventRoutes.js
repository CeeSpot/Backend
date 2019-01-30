'use strict';
var eventController = require('../controllers/EventController');
var auth = require('../Auth');
module.exports = function (app) {

    // example Routes
    app.route('/api/events').get(eventController.getEvents); //done
    app.route('/api/events/upcoming').get(eventController.getUpcomingEvents); // done
    app.route('/api/event/:event_id').get(eventController.getEvent); //done
    app.route('/api/events/categories').get(eventController.getEventCategories); //done
    app.route('/api/ical/events/:event_id').get(eventController.getEventiCal); //done
    app.route('/api/ical/events').get(eventController.getAllEventsiCal); //done

    app.route('/api/events/add').post(auth.verifyToken, eventController.addEvent); //done
    app.route('/api/events/delete/:event_id').delete(auth.verifyToken, eventController.deleteEvent); //done
    app.route('/api/events/update').put(auth.verifyToken, eventController.updateEvent); //done

    app.route('/api/events/userevent').post(auth.verifyToken, eventController.addUserEvent); //done
    app.route('/api/events/userevent').delete(auth.verifyToken, eventController.removeUserEvent); //done


    app.route('/api/events/requests').get(auth.verifyToken, eventController.getRequestsEvents); //done
    app.route('/api/events/requests/state/:event_id').put(auth.verifyToken, eventController.updateRequestState); //done

};
