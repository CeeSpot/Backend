'use strict';
var moment = require('moment');

var spaceModel = require('../models/SpaceModel');

exports.getSpaces = function (req, res) {
    spaceModel.getSpaces(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getSpace = function (req, res) {
    spaceModel.getSpace(req).then(function (data) {
        // Create space object
        let space = data.data[0];
        space.reservations = [];

        // Get reservations
        spaceModel.getSpaceReservations(req, space.id).then(function (reservations) {
            // Add reservation to space
            reservations.data.forEach(reservation => {
                space.reservations.push(reservation);
            });
            res.send({success: true, data: space});
        }).catch(function (err) {
            res.send(err);
        });
    }).catch(function (err) {
        res.send(err);
    });
};

exports.updateSpace = function (req, res) {
    spaceModel.updateSpace(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.deleteSpace = function (req, res) {
    spaceModel.deleteSpace(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.addSpace = function (req, res) {
    spaceModel.addSpace(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.addRequest = function (req, res) {
    spaceModel.addRequest(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getAvailable = function (req, res) {
    spaceModel.getAvailable(req).then(function (data) {
        if (checkAvailability(data.data, req.body.data)){
            spaceModel.addBooking(req).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                res.send(err);
            });
        }
        else{
            var msg = {data: {message: 'Room is already booked'}};
            res.send(msg);
        }
        //res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getSpaceRequests = function (req, res) {
    spaceModel.getSpaceRequests(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.appDecReservation = function (req, res) {
    spaceModel.appDecReservation(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

/** Helpers */
function checkAvailability(reservations, booking){
    var available = true;

    var b_start = moment(booking.date + ' ' + booking.start, 'YYYY-MM-DD HH:mm');
    var b_end = moment(booking.date + ' ' + booking.end, 'YYYY-MM-DD HH:mm');

    reservations.forEach(reservation => {
        var r_start = moment(booking.date + ' ' + reservation.start, 'YYYY-MM-DD HH:mm:ss');
        var r_end = moment(booking.date + ' ' + reservation.end, 'YYYY-MM-DD HH:mm:ss');

        if (r_start <= b_start && r_end > b_start){
            available = false;
        }
        if (r_start < b_end && r_end >= b_end){
            available = false;
        }
        if (r_start > b_start && r_end < b_end){
            available = false;
        }
    });

    return available;
}