'use strict';
var blogController = require('../controllers/BlogController');
var auth = require('../Auth');
module.exports = function (app) {
    // example Routes
    app.route('/api/blogs').get(blogController.getBlogs);
    app.route('/api/blogs/tags').get(blogController.getBlogsTags);
    app.route('/api/blog/:blog_id').get(blogController.getBlog);
    app.route('/api/blogs/add').post(blogController.addBlog);
    app.route('/api/blogs/update').put(blogController.updateBlog);
};