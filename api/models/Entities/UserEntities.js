/**
 * Created by thama on 23-11-2018.
 */
let bcrypt = require('bcryptjs');
let entities = require('./Entities');
let config = require('../../config');

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
                    userFound: true,
                    user: user
                });
            }
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
function updateUser(data, id) {
    let self = this;
    return new Promise(function (resolve, reject) {
        config.con.query("UPDATE users SET ? where id = ?", [data, id], function (err, res) {
            if (err) reject({success: false, data: err.toString()});
            self.getUserByUsername(data.username, {password: true}).then(userData => {
                resolve({success: true, token: entities.signToken(userData.user)})
            });
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
    return new Promise(function (resolve, reject) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) reject({userFound: null, data: err.toString()});
            if (!isMatch) {
                resolve({isMatch: false, data: "Password is not correct"});
            } else {
                resolve({isMatch: true});
            }
        });
    });
}

function insertAndUpdateUserRoles(user, data) {
    return new Promise(function (resolve, reject) {
        if(data.companies.length === 0) {
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

function deleteUserRoles(data) {
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

function deletedUserTags(user, data) {
    return new Promise((resolve, rejected) => {
        if (data.deleted.length === 0) {
            resolve()
        }
        for (let i = 0; i < data.deleted.length; i++) {
            if(data.deleted[i].id > -1) {
                config.con.query(`DELETE FROM user_tags WHERE id = ?`, [data.deleted[i].id], (err, res) => {
                    if (i === data.deleted.length - 1) {
                        resolve()
                    }
                })
            }else{
                if (i === data.deleted.length - 1) {
                    resolve()
                }
            }
        }
    })
}

module.exports = {
    'getUserByUsername': getUserByUsername,
    'comparePassword': comparePassword,
    'updateUser': updateUser,
    'insertAndUpdateUserRoles': insertAndUpdateUserRoles,
    'deleteUserRoles': deleteUserRoles,
    'insertUserTags': insertUserTags,
    'deletedUserTags': deletedUserTags
};