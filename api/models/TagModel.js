'use strict';
var config = require('../config');

function getTagTable(id) {
    let table;
    switch(id){
        case 0:
            table = "blogs_tags";
            break;
        case 1:
            table = "tags";
            break;
        case 2:
            table = "companies_tags";
            break;
    }
    return table;
}
module.exports = {
    getUserTags: function () {
        return new Promise(function (resolve, reject) {
            config.con.query("SELECT * FROM tags", function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: 'Something went wrong getting user tags'
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
    getCompanyTags: function () {
        return new Promise((resolve, reject) => {
            config.con.query(`SELECT * from companies_tags`, (err,res) => {
                if(err){
                    reject({
                        success: false,
                        data: "Something went wrong getting company tags"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    })
                }
            });
        })
    },
    addTag: function (req) {
        return new Promise(function (resolve, reject) {
            let selectedTab = +req.params.id;
            let table = getTagTable(selectedTab);
            if (req.user.isAdmin) {
                config.con.query("INSERT INTO " + table + " SET ?", [req.body.tag], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to insert tag",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: res,
                            authorised: true
                        });
                    }
                })
            } else {
                reject({
                    success: false,
                    authorised: false
                })
            }
        });
    },
    editTag: function(req){
        return new Promise(function (resolve, reject) {
            let selectedTab = +req.params.id;
            let table = getTagTable(selectedTab);
            if (req.user.isAdmin) {
                config.con.query("UPDATE " + table + " SET description = ? where id = ?", [req.body.tag.description, req.body.tag.id], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to change tag",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: "Successfully changed tag",
                            authorised: true
                        });
                    }
                })
            } else {
                reject({
                    success: false,
                    authorised: true
                })
            }
        });
    },
    deleteTag: function(req){
        return new Promise(function (resolve, reject) {
            let selectedTab = +req.params.id;
            let table = getTagTable(selectedTab);
            if (req.user.isAdmin) {
                config.con.query("DELETE FROM " + table + " WHERE id = ?", [req.body.tag.id], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to delete tag",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: "Successfully deleted tag",
                            authorised: true
                        });
                    }
                })
            } else {
                reject({
                    success: false,
                    authorised: true
                })
            }
        });
    }
};