'use strict';
let moment = require('moment');

let spaceModel = require('../models/SpaceModel');
let mailer = require('../Mailer');

var signature = `\nMet vriendelijke groet, \nBart-Jan`;

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


exports.addBooking = function (req, res) {
    spaceModel.getAvailable(req).then(function (data) {
        if (checkAvailability(data.data, req.body.reservation)){
            spaceModel.addBooking(req).then(function (data) {
                if (data.success){
                    let body = `Nieuw reserveringsverzoek, check het adminpanel.`;

                    mailer.sendMail('ceespottest@gmail.com', 'Reserveringsverzoek', body + signature);
                }
                res.send(data);
            }).catch(function (err) {
                res.send(err);
            });
        }
        else{
            let msg = {success:false, data: {message: 'Room is already booked'}};
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

exports.updateReservationState = function (req, res) {
    spaceModel.updateReservationState(req).then(function (data) {
        let subject = "Reserveringsverzoek " + req.body.reservation.space_title;
        let mailto = req.body.reservation.email;
        let body = `Beste ` + req.body.reservation.name + `,\nUw reservering voor de ` + req.body.reservation.space_title + `, op ` + moment(req.body.reservation.date).format('DD-MM-YYYY') + ` is goedgekeurd.`;
        mailer.sendMail(mailto, subject, body + signature);
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

/** Helpers */
function checkAvailability(reservations, booking){
    let available = true;

    let b_start = moment(booking.date + ' ' + booking.start, 'YYYY-MM-DD HH:mm');
    let b_end = moment(booking.date + ' ' + booking.end, 'YYYY-MM-DD HH:mm');

    reservations.forEach(reservation => {
        let r_start = moment(booking.date + ' ' + reservation.start, 'YYYY-MM-DD HH:mm:ss');
        let r_end = moment(booking.date + ' ' + reservation.end, 'YYYY-MM-DD HH:mm:ss');

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