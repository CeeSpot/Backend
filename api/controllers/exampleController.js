'use strict';

exports.example_function = function (req, res) {
    var exampleModel = require('../models/exampleModel');
    exampleModel.getUsers.then(function (data) {
        res.send(data);
    });
}