'use strict';

exports.example_function = function (req, res) {
    let exampleModel = require('../models/exampleModel');
    exampleModel.getUsers.then(function (data) {
        res.send(data);
    });
}