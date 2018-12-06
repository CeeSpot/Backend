'use strict';

var eventModel = require('../models/EventModel');

exports.getEvents = function (req, res) {
    eventModel.getEvents.then(function (data) {
        let events = data;
        eventModel.getUserEvents.then(function (data_user) {
            let user_events = data_user;
            events.forEach(event => {
                user_events.forEach(user_event => {
                    if(event.id === user_event.event_id){
                        event.color = '#00FF00';
                        event.attend = true;
                    }
                });
            });
            res.send(events);
        }).catch(function (err) {
            res.send(err);
        });
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