'use strict';

let userModel = require('../models/UserModel');

exports.getUsers = function (req, res) {
    // Get All users
    userModel.getUsers().then(function (data) {
        // Save userdata
        let success = data.success;
        let users = data.data;

        // Get all usertags
        userModel.getUserTags().then(function (tags) {
            users.forEach(user => {
                user.tags = [];
                tags.data.forEach(tag => {
                    if (tag.user_id === user.id) {
                        user.tags.push(tag);
                    }
                })
            });
            res.send({success: success, data: users});
        });
    }).catch(function (err) {
        res.send(err);
    });
};

exports.registerUser = function (req, res) {
    userModel.registerUser(req).then(function (data) {
        res.send(data);
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

exports.me = function (req, res) {
    userModel.me(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.deleteUser = function (req,res) {
    userModel.deleteUser(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.updateUser = function (req,res) {
    userModel.updateUser(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.addUserCompany = function (req, res) {
    userModel.addUserCompany(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.addTags = function (req, res) {
    userModel.addTags(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};