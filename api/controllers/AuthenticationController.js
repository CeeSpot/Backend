let authorisationModel = require('../models/AuthorisationModel');

exports.isLoggedIn = function (req, res) {
    authorisationModel.isLoggedIn(req.user).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    })
};
exports.isAdmin = function (req, res) {
    authorisationModel.isAdmin(req.user).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    })
};

exports.allowProfileManagement = function (req, res) {
    authorisationModel.allowProfileManagement(req.user).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    })
};

exports.allowSpaceBookingNoConfirm = function (req, res) {
    authorisationModel.allowSpaceBookingNoConfirm(req.user).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    })
};

exports.allowEventBookingNoConfirm = function (req, res) {
    authorisationModel.allowEventBookingNoConfirm(req.user).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    })
};

exports.allowCreateCompanyPage = function (req, res) {
    authorisationModel.allowCreateCompanyPage(req.user).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    })
};