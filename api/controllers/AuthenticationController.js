let authorisationModel = require('../models/AuthorisationModel');

exports.isLoggedIn = function (req, res) {
    authorisationModel.isLoggedIn(req.user).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    })
};
exports.isAdminLoggedIn = function (req, res) {
    authorisationModel.isAdminLoggedIn(req.user).then(function (data) {
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
exports.authenticate = function (req, res) {
    authorisationModel.authenticate(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err)
    })
};
exports.changePassword = function (req, res) {
    authorisationModel.changePassword(req).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err)
    })
};