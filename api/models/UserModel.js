'use strict';
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config');

function getUserByUsername(username) {
    return new Promise(function (resolve, reject) {
        con.query("SELECT * from users WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results) {
            if (err) reject({userFound: null, message: err});

            if (results.length === 0) resolve({userFound: false, message: "No users found with this username"});

            var user = results[0];
            resolve({
                userFound: true,
                user: {
                    username: user.username,
                    password: user.password
                }
            });
        });
    });
}
function comparePassword(candidatePassword, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) reject({userFound: null, message: err});
            if (!isMatch) resolve({isMatch: false, message: "Invalid password"});
            resolve({isMatch: true})
        });
    });
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
                                    reject(err);
                                } else {
                                    resolve(res);
                                }
                            });
                        });
                    });
                }
            });
        });
    },
    authenticate: function (req) {
        console.log(req);
        return new Promise(function (resolve, reject) {
            getUserByUsername(req.body.username).then(function (data) {
                if (!data.userFound) {
                    reject({success: false, message: data.message});
                } else {
                    comparePassword(req.body.password, data.user.password).then(function (passwordData) {
                        if (!passwordData.isMatch) {
                            reject({success: false, message: passwordData.message});
                        } else {
                            //allcorrect
                            var token = jwt.sign({username: data.user.username}, config.secret, {expiresIn: 86400});
                            resolve(token);
                        }
                    }).catch(function (err) {
                        reject({success: false, message: err.message});
                    });
                }
            }).catch(function (err) {
                reject({success: false, message: err.message});
            });
        });
    },
    me: function (req) {
        return new Promise(function (resolve, reject) {
            var token = req.headers['x-access-token'];
            if (!token) reject({success: false, message: "No token provided"});
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) reject({success: false, message: 'Failed to authenticate token.'});
                resolve(decoded);
            });
        });
    }
};