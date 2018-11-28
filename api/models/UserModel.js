'use strict';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config');
var userEntities = require('./Entities/User');


module.exports = {
    getUsers: new Promise(function (resolve, reject) {
        con.query("SELECT * FROM users", function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res);
            }
        })
    }),
    registerUser: function (req) {
        return new Promise(function (resolve, reject) {
            var username = req.body.username;
            con.query("SELECT username from users WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results, fields) {
                if (err) {
                    reject(err) // Something went wrong
                }
                if (results.length > 0) {
                    reject("Username already exists"); // User exists
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            if (err) {
                                reject({success: false, message: err.toString()});
                            } else {
                                // Store hash in your password DB.
                                var post = {
                                    email: req.body.email,
                                    username: username,
                                    password: hash,
                                    prefix: req.body.prefix,
                                    first_name: req.body.firstName,
                                    insertions: typeof req.body.insertions !== 'undefined' ? req.body.insertions : null,
                                    last_name: req.body.lastName,
                                    address: req.body.address,
                                    zipcode: req.body.zipcode,
                                    city: req.body.city,
                                    country: req.body.country,
                                    active: 0
                                };

                                // Insert the new user
                                con.query('INSERT INTO users SET ?', post, function (err, res) {
                                    if (err) {
                                        console.log(err);
                                        reject({success: false, message: "Failed to insert user"});
                                    } else {
                                        var user_id = res.insertId;
                                        var user_user_role_insert = {
                                            user_id : user_id,
                                            user_role_id: 1000
                                        };
                                        var company_id = req.body.company_id;
                                        console.log("company id: " + company_id);

                                        con.query('INSERT INTO user_user_roles SET ?', user_user_role_insert, function (err,res) {
                                           if(err){
                                               reject({success:false, message: "Failed to assign a user to a user role"});
                                           }else{
                                               if(typeof company_id !== 'undefined' && company_id !== null && company_id > -1){
                                                   var user_company_insert = {
                                                        user_id: user_id,
                                                        company_id: parseInt(company_id)
                                                   };
                                                   con.query('INSERT INTO user_companies SET ?', user_company_insert, function (err,res) {
                                                        if(err){
                                                            reject({success: false, message: "Failed to assign you to a company"});
                                                        }else{
                                                            resolve({success: true, message: "Successfully created your account"});
                                                        }
                                                   })
                                               }else{
                                                   resolve({success:true, message: "Successfully created your account"});
                                               }
                                           }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
        });
    },
    authenticate: function (req) {
        return new Promise(function (resolve, reject) {
            userEntities.getUserByUsername(req.body.username).then(function (data) {
                if (!data.userFound) {
                    reject({success: false, message: data.message.toString()});
                } else {
                    userEntities.comparePassword(req.body.password, data.user.password).then(function (passwordData) {
                        if (!passwordData.isMatch) {
                            reject({success: false, message: passwordData.message.toString()});
                        } else {
                            var user = userEntities.getUserFromDatabaseUser(data.user, {password: true});
                            var token = jwt.sign(user, config.secret, {expiresIn: 86400});
                            resolve(token);
                        }
                    }).catch(function (err) {
                        reject({success: false, message: err.message.toString()});
                    });
                }
            }).catch(function (err) {
                reject({success: false, message: err.message.toString()});
            });
        });
    },
    profile: function (req) {
        return new Promise(function (resolve, reject) {
            var userid = req.param("userId");
            con.query("SELECT * FROM users WHERE id = ?", [userid], function (err, results) {
                if (err) reject({success: false, message: err.toString()});
                if (results.length === 0) {
                    reject({success: false, message: "No users found"});
                } else {
                    var user = results[0];
                    resolve({
                        success: true,
                        user: userEntities.getUserFromDatabaseUser(user, {password: true})
                    });
                }
            });
        });
    },
    me: function (req) {
        return new Promise(function (resolve, reject) {
            resolve(req.user);
        });
    }
};