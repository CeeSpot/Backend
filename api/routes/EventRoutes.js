'use strict';
var eventController = require('../controllers/EventController');

module.exports = function (app) {

    // example Routes
    app.route('/api/events').get(eventController.getEvents);

};
