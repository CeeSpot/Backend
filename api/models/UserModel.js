'use strict';
let bcrypt = require('bcryptjs');
let config = require('../config');
let userEntities = require('./Entities/UserEntities');
let entities = require('./Entities/Entities');
let enums = require('../Enums');
let SocialMediaModel = require('./SocialMediaModel');
let SocialMediaEntities = require('./Entities/SocialMediaEntities');

let encryptRounds = config.encryptRounds;
module.exports = {
    getUsers: function () {
        return new Promise(function (resolve, reject) {
            config.con.query("SELECT * FROM users", function (err, res) {
                if (err) {
                    reject({success: false, data: "Something went wrong"});
                } else {
                    let users = [];
                    res.forEach(function (i) {
                        users.push(entities.getJsonObjectFromDatabaseObject(i, {password: true, username: true}))
                    });
                    resolve({success: true, data: users});
                }
            })
        });
    },
    getUserTags: function () {
        return new Promise(function (resolve, reject) {
            config.con.query("SELECT u.id AS user_id, t.* FROM tags t LEFT JOIN user_tags ut ON ut.tag_id=t.id LEFT JOIN users u ON u.id=ut.user_id", function (err, res) {
                if (err) {
                    resolve({
                        success: false,
                        data: []
                    });
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        })
    },
    getUserTagsById: function (id) {
        return new Promise((resolve, rejected) => {
            config.con.query("SELECT ut.id, ut.tag_id, t.description FROM tags t LEFT JOIN user_tags ut ON ut.tag_id=t.id LEFT JOIN users u ON u.id=ut.user_id WHERE u.id = ?", [id], function (err, res) {
                if (err) {
                    resolve({
                        success: false,
                        data: []
                    });
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        })
    },
    registerUser: function (req) {
        return new Promise(function (resolve, reject) {
            let username = req.body.username;
            config.con.query("SELECT username from users WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results, fields) {
                if (err) {
                    reject(err) // Something went wrong
                }
                if (results.length > 0) {
                    reject({success: false, data: "Username already exists"}); // User exists
                } else {
                    bcrypt.genSalt(encryptRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            if (err) {
                                reject({success: false, data: err.toString()});
                            } else {
                                // Store hash in your password DB.
                                let post = {
                                    email: req.body.email,
                                    username: username,
                                    password: hash,
                                    prefix: req.body.prefix,
                                    first_name: req.body.firstname,
                                    insertions: typeof req.body.insertions !== 'undefined' ? req.body.insertions : null,
                                    last_name: req.body.lastname,
                                    address: req.body.address,
                                    zipcode: req.body.zipcode,
                                    city: req.body.city,
                                    country: req.body.country,
                                    active: 0
                                };

                                // Insert the new user
                                config.con.query('INSERT INTO users SET ?', post, function (err, res) {
                                    if (err) {
                                        reject({success: false, data: "Failed to insert user"});
                                    } else {
                                        let user_id = res.insertId;
                                        let user_user_role_insert = {
                                            user_id: user_id,
                                            user_role_id: enums.resourceRoles.GUEST_USER
                                        };
                                        let company_id = req.body.company_id;

                                        config.con.query('INSERT INTO user_user_roles SET ?', user_user_role_insert, function (err, res) {
                                            if (err) {
                                                reject({
                                                    success: false,
                                                    data: "Failed to assign a user to a user role"
                                                });
                                            } else {
                                                if (typeof company_id !== 'undefined' && company_id !== null && company_id > -1) {
                                                    let user_company_insert = {
                                                        user_id: user_id,
                                                        company_id: parseInt(company_id)
                                                    };
                                                    config.con.query('INSERT INTO user_companies SET ?', user_company_insert, function (err, res) {
                                                        if (err) {
                                                            reject({
                                                                success: false,
                                                                data: "Failed to assign you to a company"
                                                            });
                                                        } else {
                                                            resolve({
                                                                success: true,
                                                                data: "Successfully created your account"
                                                            });
                                                        }
                                                    })
                                                } else {
                                                    resolve({
                                                        success: true,
                                                        data: "Successfully created your account"
                                                    });
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
    /**
     * Gets a user's profile
     * @param req request given to get the userid from the request
     * @returns {Promise}
     */
    profile: function (req) {
        let self = this;
        return new Promise(function (resolve, reject) {
            let userid = req.param("userId");
            config.con.query("SELECT * FROM users WHERE id = ?", [userid], function (err, results) {
                if (err) reject({success: false, data: "Something went wrong"}); // return the error ? (up for debate)
                if (results.length === 0) {
                    reject({success: false, data: "No users found"});
                } else {
                    let user = entities.getJsonObjectFromDatabaseObject(results[0], {password: true, username: true});
                    config.con.query(`SELECT user_companies.id, user_companies.company_id, companies.name, companies.description, user_companies.role
                                       FROM user_companies 
                                       INNER JOIN companies ON user_companies.company_id = companies.id 
                                       WHERE user_companies.user_id = ?`, userid, function (err, res) {
                        if (err) reject({success: false, data:"Failed to get companies"});
                        if (res.length > 0) {
                            // Might have more than one company associated, thus return all of them
                            user.companies = [];
                            res.forEach(function (i) {
                                user.companies.push(entities.getJsonObjectFromDatabaseObject(i));
                            });
                        }
                        SocialMediaEntities.getResourceSocialMediaSites(userid, enums.socialMediaRoles.SOCIAL_MEDIA_USER).then((data) => {
                            user.social_media_sites = data;
                            self.getUserTagsById(userid).then((userTags) => {
                                user.tags = userTags.data;
                                resolve({
                                    success: true,
                                    user: user
                                });
                            })
                        })
                    });
                }
            });
        });
    },
    me: function (req) {
        let self = this;
        return new Promise(function (resolve, reject) {
            config.con.query(`SELECT user_companies.id, user_companies.company_id, companies.name, companies.description, user_companies.role
                               FROM user_companies 
                               INNER JOIN companies ON user_companies.company_id = companies.id 
                               WHERE user_companies.user_id = ?`, req.user.id, function (err, res) {
                if (err) {
                    reject({success: false, user: "Something went wrong"});
                }
                req.user.mailVis = req.user.mailVis === 1;
                req.user.addressVis = req.user.addressVis === 1;
                req.user.birthdateVis = req.user.birthdateVis === 1;

                req.user.companies = [];
                if (res.length > 0) {
                    // Might have more than one company associated, thus return all of them
                    res.forEach(function (i) {
                        req.user.companies.push(entities.getJsonObjectFromDatabaseObject(i));
                    });
                }
                SocialMediaEntities.getResourceSocialMediaSites(req.user.id, enums.socialMediaRoles.SOCIAL_MEDIA_USER).then((data) => {
                    req.user.social_media_sites = data;

                    SocialMediaModel.getSites().then((socialMediaSites) => {
                        self.getUserTagsById(req.user.id).then((userTags) => {
                            req.user.tags = userTags.data;
                            resolve({
                                success: true,
                                user: req.user,
                                sites: socialMediaSites.data,
                                type: enums.socialMediaRoles.SOCIAL_MEDIA_USER
                            });
                        })
                    });
                });
            });
        });
    },
    updateUser: function (req) {
        return new Promise(function (resolve, reject) {
            if (req.user.id === req.body.user.id || req.user.isAdmin) {
                userEntities.getUserByUsername(req.body.user.username).then((resp) => {
                    if (!resp.success) reject(resp);
                    userEntities.updateUser(req.body.user, req.user.id, req.user.id === req.body.user.id).then((updatedUserResp) => {
                        resolve(updatedUserResp);
                    }).catch((err) => {
                        reject(err)
                    });
                }).catch((err) => {
                    reject({success: false, data: "Username doesnt exist"});
                })
            } else {
                reject({
                    success: false,
                    data: 'You are not authorised to update this user'
                })
            }
        })
    },
    deleteUser: function (req) {
        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin || req.user.id === req.body.user_id) {
                let user_id = req.body.user_id;
                config.con.query("DELETE FROM users WHERE id = ?", [user_id], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to delete user"
                        })
                    } else {
                        SocialMediaEntities.deleteResourceRecordsForUser(req.user.id).then(() => {
                            userEntities.deleteUserRole(req.user.id).then(() => {
                                userEntities.deleteUserCompanyRoles(req.user.id).then(() => {
                                    userEntities.deleteUserTags(req.user.id).then(() => {
                                        resolve({
                                            success: true,
                                            data: "Successfully deleted user"
                                        });
                                    })
                                })
                            })
                        })
                    }
                })
            }
        })
    },
    addUserCompany: function (req) {
        return new Promise((resolve, reject) => {
            userEntities.insertAndUpdateUserRoles(req.user, req.body).then((data) => {
                userEntities.deleteUserCompanies(req.body).then((data) => {
                    resolve({success: true, data: 'Successfully updated the company roles of your user account'})
                }).catch((err) => {
                    resolve({success: false, data: 'Failed to delete company roles but succesfully updated of your user account'})
                })
            }).catch((err) => {
                userEntities.deleteUserCompanies(req.body).then((data) => {
                    resolve({success: false, data: 'Failed to update/insert the company roles of your user account but successfully deleted any.'})
                }).catch((err) => {
                    resolve({success: false, data: 'Failed to insert/update/delete company roles of your user account'})
                })
            })
        })
    },
    addTags: function (req) {
        return new Promise((resolve, reject) => {
            userEntities.insertUserTags(req.user, req.body).then((data) => {
                userEntities.deletedUserTags(req.user, req.body).then((data) => {
                    resolve({success: false, data: 'Successfully updated your user account'})
                })
            });
        })
    }
};
