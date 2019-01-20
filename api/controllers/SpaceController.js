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


exports.addBooking = function (req, res) {
    console.log('came here')
    spaceModel.getAvailable(req).then(function (data) {
        console.log('came here2')
        if (checkAvailability(data.data, req.body.reservation)){
            console.log('came here3')
            spaceModel.addBooking(req).then(function (data) {
                res.send(data);
            }).catch(function (err) {
                res.send(err);
            });
        }
        else{
            console.log('came here2.5')
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

exports.updateReservationState = function (req, res) {
    spaceModel.updateReservationState(req).then(function (data) {
        mailRequestFollowUp(req.body.data);
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

function mailRequestFollowUp(request){
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ceespottest@gmail.com',
            pass: 'theCTest1!'
        }
    });

    var subject = "Reserveringsverzoek " + request.space_title;
    var msg = "Uw reservering is goedgekeurd. Voor verdere vragen kunt u contact opnemen met Bart-Jannnnnn";

    var mailOptions = {
        from: 'ceespottest@gmail.com',
        to: 'ceespottest@gmail.com',
        subject: subject,
        text: msg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}