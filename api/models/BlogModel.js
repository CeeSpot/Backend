'use strict';
var config = require('../config');

module.exports = {
    getBlogs: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT id, title, description, picture, author, date_created FROM blogs`, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get blogs"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },
    getBlogsTags: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM blogs_tags`, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get blogs tags"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },
    getBlogTags: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT BT.id, BT.blog_id, BT.blogs_tags_id, T.description FROM blog_tags AS BT LEFT JOIN blogs_tags T ON T.id = BT.blog_id`, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get blogs tags"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },
    getBlog: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM blogs WHERE id = ?`, [req.params.blog_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get blog"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },
    addBlog: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("INSERT INTO blogs SET ?", {
                title: req.body.title,
                description: req.body.description,
                body: req.body.body
            }, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to make blog"
                    })
                } else {
                    resolve({
                        success: true,
                        data: "Successfully created blog."
                    });
                }
            })
        })
    },
    updateBlog: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`UPDATE blogs SET title = ?, description = ?, body = ? WHERE id = ?`, [
                req.body.title,
                req.body.description,
                req.body.body,
                req.body.id
            ], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to update blog."
                    })
                } else {
                    resolve({
                        success: true,
                        data: "Successfully updated blog."
                    });
                }
            })
        })
    },
};