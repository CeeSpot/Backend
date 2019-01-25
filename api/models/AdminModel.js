'use strict';
var config = require('../config');

var authorisationModel = require('../models/AuthorisationModel');

module.exports = {
    getSettings: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT *
                       FROM settings`, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get settings",
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
        });
    },
    toggleBlogActive: function (req) {
        return new Promise(function (resolve, reject) {
            if(req.user.isAdmin) {
                con.query(`UPDATE settings
                           SET is_on = ?
                           WHERE name = 'Blogs'`, [
                    req.body.is_on
                ], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to toggle blog.",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: "Successfully toggled blog active.",
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
        })
    }
};