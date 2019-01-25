'use strict';

let eventModel = require('../models/EventModel');
let auth = require('../Auth');
var iCalModel = require('../models/iCalModel');

exports.getEvents = function (req, res) {
    eventModel.getEvents().then(function (data) {
        let events = data.data;
        auth.verifyFunctionToken(req, true).then(userData => {
            if(userData.data !== '') {
                eventModel.getUserEvents(userData.data).then(function (data_user) {
                    let user_events = data_user.data;
                    events.forEach(event => {
                        user_events.forEach(user_event => {
                            if (event.id === user_event.event_id) {
                                event.color = '#4BB543';
                                event.attend = true;
                            }
                        });
                    });
                    res.send({success: data.success, data: events});
                }).catch(function (err) {
                    res.send(err);
                });
            }else{
                res.send({success: data.success, data: events});
            }
        }).catch(err => {
            res.send(err);
        })
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getUpcomingEvents = function (req, res) {
    eventModel.getUpcomingEvents(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getEventCategories = function (req, res) {
    eventModel.getEventCategories(req).then(function (data) {
        res.send(data);
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
        if (data.success){
            iCalModel.updateICSfile();
        }
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.deleteEvent = function (req, res) {
    eventModel.deleteEvent(req).then(function (data) {
        console.log(data);
        if (data.success){
            eventModel.deleteAllEventUsers(data.event_id).then(function (data) {
                console.log(data);
                res.send(data);
            }).catch(function (err) {
                console.log(err);
                res.send(err);
            });
        }
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

exports.getEvent = function (req, res) {
    eventModel.getEvent(req).then(function (data) {
        let event = data.data[0];
        event.participants = [];

        // Get event participants
        eventModel.getParticipants(event.id).then(function (p_data) {
            var participants = p_data.data;
            participants.forEach(participant => {
                var object = {username: participant.username, id: participant.user_id, first_name: participant.first_name, insertions: participant.insertions, last_name: participant.last_name};
                event.participants.push(object);
            });
            res.send({success: data.success, data: event});
        }).catch(function (err) {
            res.send(err);
        });
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getEventiCal = function (req, res) {
    let path = iCalModel.getICSfromEvent(req);
    if (path.length > 0){
        const fs = require('fs')
        let readStream = fs.createReadStream(path)
        readStream.on('close', () => res.end())
        readStream.pipe(res)
    }
    else{
        res.status(400).send('failed to get ical')
    }
};

exports.getAllEventsiCal = function (req, res) {
    let path = iCalModel.getICSAllEvents();
    if (path.length > 0){
        const fs = require('fs')
        let readStream = fs.createReadStream(path)
        readStream.on('close', () => res.end())
        readStream.pipe(res)
    }
    else{
        res.status(400).send('failed to get ical')
    }
};