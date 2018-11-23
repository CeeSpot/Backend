'use strict';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config');

/**
 * Gets a user by username
 * @param username
 * @returns {Promise}
 */
function getUserByUsername(username) {
    return new Promise(function (resolve, reject) {
        con.query("SELECT * from users WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results) {
            if (err) reject({userFound: null, message: err.toString()});

            if (results.length === 0) {
                resolve({userFound: false, message: "No users found with this username"});
            } else {
                var user = getUserFromDatabaseUser(results[0]);
                resolve({
                    userFound: true,
                    user: user
                });
            }
        });
    });
}

/**
 * Compares a candidate password with a hash
 *
 * @param candidatePassword
 * @param hash
 * @returns {Promise}
 */
function comparePassword(candidatePassword, hash) {
    console.log("candidate password: " + candidatePassword);
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) reject({userFound: null, message: err.toString()});
            if (!isMatch) {
                console.log("error: invalid password");
                resolve({isMatch: false, message: "Invalid password"});
            } else {
                resolve({isMatch: true});
            }
        });
    });
}
/**
 * Create a json object from a database user and exlucde colums in the exluded object
 *
 * @param user database user
 * @param excluded list with excluded colums
 * @returns {{user json object}}
 */
function getUserFromDatabaseUser(user, excluded) {
    var userObj = {};
    for (var property in user) {
        if (user.hasOwnProperty(property) && (typeof excluded === 'undefined' || !excluded[property])) {
            userObj[property] = user[property];
        }
    }
    return userObj;
}

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
                    reject("Email already exists"); // User exists
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
                                    company_id: req.body.company_id
                                };

                                // Insert the new user
                                con.query('INSERT INTO users SET ?', post, function (err, res) {
                                    if (err) {
                                        reject({success: false, message: "Failed to insert user"});
                                    } else {
                                        resolve({success: true, message: "Successfully made a new user"});
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
            getUserByUsername(req.body.username).then(function (data) {
                if (!data.userFound) {
                    reject({success: false, message: data.message.toString()});
                } else {
                    comparePassword(req.body.password, data.user.password).then(function (passwordData) {
                        if (!passwordData.isMatch) {
                            reject({success: false, message: passwordData.message.toString()});
                        } else {
                            var user = getUserFromDatabaseUser(data.user, {password: true});
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
                        user: getUserFromDatabaseUser(user, {password: true})
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