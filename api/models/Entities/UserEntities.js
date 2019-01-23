/**
 * Created by thama on 23-11-2018.
 */
let entities = require('./Entities');
let config = require('../../config');
var moment = require('moment');
let bcrypt = require('bcryptjs');

/**
 * Gets a user by username
 * @param username
 * @param toRemove
 * @returns {Promise}
 */
function getUserByUsername(username, toRemove = null) {
    return new Promise(function (resolve, reject) {
        config.con.query("SELECT * from users WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results) {
            if (err) reject({userFound: null, data: "Failed to authenticate user"});

            if (typeof results === 'undefined' || results.length === 0) {
                resolve({userFound: false, data: "Username and password do not match"});
            } else {
                let user = !toRemove ? entities.getJsonObjectFromDatabaseObject(results[0]) : entities.getJsonObjectFromDatabaseObject(results[0], toRemove);
                resolve({
                    success: true,
                    userFound: true,
                    user: user
                });
            }
        });
    });
}



function authenticate(req){
    return new Promise(function (resolve, reject) {
        getUserByUsername(req.body.username).then(function (data) {
            if (!data.userFound) {
                reject({success: false, data: data.data.toString()});
            } else {
                entities.comparePassword(req.body.password, data.user.password).then(function (passwordData) {
                    if (!passwordData.isMatch) {
                        reject({success: false, data: passwordData.data.toString()});
                    } else {
                        let user = entities.getJsonObjectFromDatabaseObject(data.user, {password: true});
                        resolve({
                            success: true,
                            token: entities.signToken(user)
                        });
                    }
                }).catch(function (err) {
                    reject({success: false, data: err.data.toString()});
                });
            }
        }).catch(function (err) {
            reject({success: false, data: err.data.toString()});
        });
    });
}

/**
 * Updates user data given data and ID
 *
 * @param data
 * @param id
 * @returns {Promise<any>}
 */
function updateUser(data, id, me = false) {
    let self = this;
    data.mailVis = data.mailVis ? 1 : 0;
    data.addressVis = data.addressVis ? 1 : 0;
    data.birthdateVis = data.birthdateVis ? 1 : 0;
    data.birthdate = moment(data.birthdate).format('YYYY-MM-DD HH:mm:ss');
    if(data.birthdate === 'Invalid date') {
        delete data.birthdate
    }

    let username = data.username;
    delete data.username;
    delete data.social_media_sites;
    delete data.tags;
    delete data.isGuestUser;
    delete data.isFellow;
    delete data.isPartner;
    delete data.isStandardUser;
    delete data.isAdmin;

    return new Promise(function (resolve, reject) {
        config.con.query("UPDATE users SET ? where id = ?", [data, id], function (err, res) {
            if (err) {
                reject({success: false, data: err.toString()});
            }
            if (me) {
                getUserByUsername(username, {password: true}).then(userData => {
                    let token = entities.signToken(userData.user)
                    resolve({success: true, token: token})
                }).catch((err) => {
                    console.error(err);
                });
            } else {
                resolve({
                    success: true,
                    data: 'Successfully this user\'s information'
                })
            }
        });
    });
}

function deleteUserRole(userId) {
    return new Promise((resolve, reject) => {
        config.con.query(`DELETE FROM user_user_roles WHERE user_id = ?`, [userId], (err, res) => {
            resolve()
        })
    })
}

function updateWebsite(userId, username, website) {
    return new Promise((resolve, reject) => {
        config.con.query("UPDATE users SET website = ? WHERE id = ?", [website, userId], function (err, res) {
            getUserByUsername(username, {password: true}).then(userData => {
                resolve({success: true, token: entities.signToken(userData.user)})
            });
        })
    })
}

function insertAndUpdateUserRoles(user, data) {
    return new Promise(function (resolve, reject) {
        if (data.companies.length === 0) {
            resolve()
        }
        for (let i = 0; i < data.companies.length; i++) {
            if (data.companies[i].id === -1) {
                let company = {
                    user_id: user.id,
                    company_id: parseInt(data.companies[i].company_id),
                    role: data.companies[i].role
                };
                config.con.query(`INSERT INTO user_companies SET ?`, company, (err, res) => {
                    if (i === data.companies.length - 1) {
                        resolve({
                            success: true,
                            data: 'Successfully updated the company roles of your user account'
                        })
                    }
                })
            } else {
                config.con.query(`UPDATE user_companies SET role = ? WHERE id = ?`,
                    [data.companies[i].role, data.companies[i].id], function (err, res) {
                        if (i === data.companies.length - 1) {
                            resolve({
                                success: true,
                                data: 'Successfully updated the company roles of your user account'
                            })
                        }
                    })
            }
        }
    });
}

function deleteUserCompanies(data) {
    return new Promise((resolve, reject) => {
        if (data.deleted.length === 0) {
            resolve();
        }
        for (let i = 0; i < data.deleted.length; i++) {
            config.con.query(`DELETE FROM user_companies WHERE id = ?`, [data.deleted[i].id], (err, res) => {
                if (err) {
                    if (i === data.deleted.length - 1) {
                        resolve({
                            success: true,
                            data: 'Successfully updated the company roles of your user account'
                        })
                    }
                } else {
                    if (i === data.deleted.length - 1) {
                        resolve({
                            success: true,
                            data: 'Successfully updated the company roles of your user account'
                        })
                    }
                }
            })
        }
    });
}
function changePassword(req) {
    return new Promise(function (resolve, reject) {
        getUserByUsername(req.user.username).then(function (data) {
            if (!data.userFound) {
                reject({success: false, data: data.data.toString()}); // no user found, should probably logout?
            } else {
                entities.comparePassword(req.body.password, data.user.password).then(function (pwdata) {
                    if (!pwdata.isMatch) {
                        reject({success: false, data: pwdata.data.toString()});
                    } else {
                        bcrypt.genSalt(config.encryptRounds, function (err, salt) { //generate a salt with rounds
                            bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
                                if (err) {
                                    reject({success: false, data: err.toString()});
                                } else {
                                    updateUser({
                                        password: hash,
                                        username: req.user.username
                                    }, req.user.id, true).then(function (data) {
                                        resolve(data);
                                    }).catch(function (err) {
                                        reject(err);
                                    });
                                }
                            });
                        });
                    }
                }).catch(function (err) {
                    reject({
                        success: false,
                        data: 'Original password is incorrect'
                    });
                });
            }
        }).catch(function () {
            reject({
                success: false,
                data: 'Something went wrong'
            });
        });
    });
}

function deleteUserCompaniesByUserId(userId) {
}

function insertUserTags(user, data) {
    return new Promise((resolve, reject) => {
        if (data.user_tags.length === 0) {
            resolve()
        }
        for (let i = 0; i < data.user_tags.length; i++) {
            if (data.user_tags[i].id === -1) {
                let tag = {
                    user_id: user.id,
                    tag_id: data.user_tags[i].tag_id
                };
                config.con.query(`INSERT INTO user_tags SET ?`, tag, (err, res) => {
                    if (i === data.user_tags.length - 1) {
                        resolve()
                    }
                })
            } else {
                if (i === data.user_tags.length - 1) {
                    resolve()
                }
            }
        }
    })
}

function deleteUserCompanyRoles(userId) {
    return new Promise((resolve, reject) => {
        config.con.query(`DELETE FROM user_companies WHERE user_id = ?`, [userId], (err,res) => {
            resolve()
        })
    })
}

function deleteUserTags(userId) {
    return new Promise((resolve, reject) => {
        config.con.query(`DELETE FROM user_tags WHERE user_id = ?`, [userId], (err, res) => {
            resolve()
        })
    })
}

function deletedUserTags(user, data) {
    return new Promise((resolve, reject) => {
        if (data.deleted.length === 0) {
            resolve()
        }
        for (let i = 0; i < data.deleted.length; i++) {
            if (data.deleted[i].id > -1) {
                config.con.query(`DELETE FROM user_tags WHERE id = ?`, [data.deleted[i].id], (err, res) => {
                    if (i === data.deleted.length - 1) {
                        resolve()
                    }
                })
            } else {
                if (i === data.deleted.length - 1) {
                    resolve()
                }
            }
        }
    })
}

module.exports = {
    'getUserByUsername': getUserByUsername,
    'updateUser': updateUser,
    'insertAndUpdateUserRoles': insertAndUpdateUserRoles,
    'deleteUserCompanies': deleteUserCompanies,
    'insertUserTags': insertUserTags,
    'deletedUserTags': deletedUserTags,
    'updateWebsite': updateWebsite,
    'deleteUserRole': deleteUserRole,
    'deleteUserTags': deleteUserTags,
    'deleteUserCompanyRoles': deleteUserCompanyRoles,
    'authenticate': authenticate,
    'changePassword': changePassword
};