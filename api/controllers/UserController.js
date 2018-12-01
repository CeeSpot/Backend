'use strict';

var userModel = require('../models/UserModel');

exports.getUsers = function (req, res) {
        userModel.getUsers.then(function (data) {
            res.send(data);
        }).catch(function (err) {
            res.send(err);
        });
};

exports.registerUser = function (req, res) {
    console.log("kasdiajsn");
    userModel.registerUser(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
       res.send(err);
    });
};

exports.authenticate = function (req, res) {
    userModel.authenticate(req).then(function (data) {
        res.json({success: true, token: data});
    }).catch(function (err) {
       res.send(err);
    });
};
exports.profile = function (req, res) {
    userModel.profile(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};
exports.me = function (req,res) {
    userModel.me(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};