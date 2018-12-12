'use strict';

var eventModel = require('../models/EventModel');
var auth = require('../Auth');
exports.getEvents = function (req, res) {
    eventModel.getEvents().then(function (data) {
        let events = data.message;
        auth.verifyFunctionToken(req, true).then(userData => {
            if(userData.data !== '') {
                eventModel.getUserEvents(userData.data).then(function (data_user) {
                    let user_events = data_user.message;
                    events.forEach(event => {
                        user_events.forEach(user_event => {
                            if (event.id === user_event.event_id) {
                                event.color = '#00FF00';
                                event.attend = true;
                            }
                        });
                    });
                    res.send({success: data.success, message: events});
                }).catch(function (err) {
                    res.send(err);
                });
            }else{
                res.send({success: data.success, message: events});
            }
        }).catch(err => {
            res.send(err);
        })
    }).catch(function (err) {
        res.send(err);
    });
};

exports.addUserEvent = function (req, res) {
    eventModel.addUserEvent(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.removeUserEvent = function (req, res) {
    eventModel.removeUserEvent(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.addEvent = function (req, res) {
    eventModel.addEvent(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.deleteEvent = function (req, res) {
    eventModel.deleteEvent(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.updateEvent = function (req, res) {
    eventModel.updateEvent(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getParticipants = function (req, res) {
    eventModel.getParticipants(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getEvent = function (req, res) {
    eventModel.getEvent(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};