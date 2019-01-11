'use strict';

var blogModel = require('../models/BlogModel');
var auth = require('../Auth');

exports.getBlogs = function (req, res) {
    blogModel.getBlogs(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};