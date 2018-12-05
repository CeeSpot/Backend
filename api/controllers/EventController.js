'use strict';

var eventModel = require('../models/EventModel');

exports.getEvents = function (req, res) {
    eventModel.getEvents.then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};