'use strict';
var config = require('../config');

module.exports = {
  getBlogs: function (req) {
    return new Promise(function (resolve, reject) {
      config.con.query(`SELECT id, title, description, body, picture, author, date_created FROM blogs ORDER BY date_created DESC`, function (err, res) {
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
      config.con.query(`SELECT * FROM blogs_tags`, function (err, res) {
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
      config.con.query(`SELECT BT.blogs_tags_id AS id, BT.blog_id, T.description FROM blog_tags AS BT LEFT JOIN blogs_tags T ON T.id = BT.blogs_tags_id`, function (err, res) {
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
      config.con.query(`SELECT * FROM blogs WHERE id = ?`, [req.params.blog_id], function (err, res) {
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
        if(req.user.isAdmin) {
            config.con.query("INSERT INTO blogs SET ?", {
                title: req.body.title,
                description: req.body.description,
                body: req.body.body
            }, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to make blog",
                        authorised: true
                    })
                } else {
                    let tags = req.body.tags;
                    let insertId = res.insertId;
                    let success = true;

                    if (tags !== undefined) {
                        tags.forEach(tag => {
                            config.con.query("INSERT INTO blog_tags SET ?", {
                                blog_id: insertId,
                                blogs_tags_id: tag.id
                            }, function (err, res) {
                                if (err) {
                                    success = false;
                                }
                            })
                        })
                    }
                    if (success) {
                        resolve({
                            success: true,
                            data: {
                                insertId: res.insertId
                            },
                            authorised: true
                        });
                    }else {
                        reject({
                            success: false,
                            data: "Failed to add blog tags",
                            authorised: true
                        })
                    }
                }
            })
        }else {
            reject({
                success: false,
                authorised: false
            })
        }
    })
  },
  updateBlog: function (req) {
    return new Promise(function (resolve, reject) {
        if(req.user.isAdmin) {
            let tags = req.body.tags;
            con.query(`UPDATE blogs
                       SET title       = ?,
                           description = ?,
                           body        = ?
                       WHERE id = ?`, [
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
                    con.query(`DELETE
                               FROM blog_tags
                               WHERE blog_id = ?`, [
                        req.body.id
                    ], function (err, res) {
                        if (err) {
                            reject({
                                success: false,
                                data: "Failed to update blog.",
                                authorised: true
                            })
                        } else {
                            var success = true;
                            tags.forEach(tag => {
                                con.query("INSERT INTO blog_tags SET ?", {
                                    blog_id: req.body.id,
                                    blogs_tags_id: tag.id
                                }, function (err, res) {
                                    if (err) {
                                        success = false;
                                    }
                                })
                            })
                            if (success) {
                                resolve({
                                    success: true,
                                    authorised: true,
                                    data: "Successfully updated blog."
                                });
                            } else {
                                reject({
                                    success: false,
                                    authorised: true,
                                    data: "Failed to update blog tags"
                                })
                            }
                        }
                    })
                }
            })
        }else{
            reject({
                success:false,
                authorised: false
            })
        }
    })
  },
  deleteBlog: function (req) {
    return new Promise(function (resolve, reject) {
        if (req.user.isAdmin) {
            config.con.query("DELETE FROM blogs WHERE id = ?", [
                req.body.blog_id
            ], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to delete blog.",
                        authorised: true
                    })
                } else {
                    resolve({
                        success: true,
                        data: "Successfully deleted blog.",
                        authorised: true
                    });
                }
            })
        }else {
            reject({
                success:false,
                authorised: false
            })
        }
    })
  }
};