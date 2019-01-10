'use strict';
var blogController = require('../controllers/BlogController');
var auth = require('../Auth');
module.exports = function (app) {
    // example Routes
    app.route('/api/blogs').get(blogController.getBlogs);
};