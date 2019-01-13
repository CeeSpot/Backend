'use strict';

var blogModel = require('../models/BlogModel');
var auth = require('../Auth');


exports.getBlogs = function (req, res) {
    blogModel.getBlogs(req).then(function (data) {
        let blogs = data.data;
        blogModel.getBlogTags(req).then(function (data_tags) {
            let tags = data_tags.data;
            blogs.forEach(blog => {
                blog.tags = [];
                tags.forEach(tag => {
                    if (tag.blog_id === blog.id) {
                        blog.tags.push(tag);
                    }
                });
            });
            res.send({success: data.success, data: blogs});
        }).catch(function (err) {
            res.send(err);
        });
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getBlogsTags = function (req, res) {
    blogModel.getBlogsTags(req).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.send(err);
    });
};

exports.getBlog = function (req, res) {
    blogModel.getBlog(req).then(function (data) {
        let blog = data.data;
        blogModel.getBlogTags(req).then(function (data_tags) {
            let tags = data_tags.data;
            blog[0].tags = [];
            tags.forEach(tag => {
                if (tag.blog_id === blog[0].id) {
                    blog[0].tags.push(tag);
                }
            });
            res.send({success: data.success, data: blog});
        }).catch(function (err) {
            res.send(err);
        });
    }).catch(function (err) {
        res.send(err);
    });
};



