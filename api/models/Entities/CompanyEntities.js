
let config = require('../../config');
let entities = require('./Entities');
let bcrypt = require('bcryptjs');

/**
 * Gets a user by username
 * @param username
 * @param toRemove
 * @returns {Promise}
 */
function getCompanyByUsername(username, toRemove = null) {
    console.log(username)
    return new Promise(function (resolve, reject) {
        config.con.query("SELECT * from companies WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results) {
            if (err) reject({userFound: null, data: "Failed to authenticate user"});

            if (typeof results === 'undefined' || results.length === 0) {
                console.log("hi")
                resolve({userFound: false, data: "Username and password do not match"});
            } else {
                let company = !toRemove ? entities.getJsonObjectFromDatabaseObject(results[0]) : entities.getJsonObjectFromDatabaseObject(results[0], toRemove);
                resolve({
                    success: true,
                    userFound: true,
                    company: company
                });
            }
        });
    });
}

function authenticate(body) {
    return new Promise( (resolve, reject) => {
        getCompanyByUsername(body.username).then(function (data) {
            if (!data.userFound) {
                reject({success: false, data: data.data.toString()});
            } else {
                entities.comparePassword(body.password, data.company.password).then(function (passwordData) {
                    if (!passwordData.isMatch) {
                        reject({success: false, data: passwordData.data.toString()});
                    } else {
                        let company = entities.getJsonObjectFromDatabaseObject(data.company, {password: true});
                        resolve({
                            success: true,
                            token: entities.signToken(company)
                        });
                    }
                }).catch(function (err) {
                    console.log(err.toString())
                    reject({success: false, data: err.data.toString()});
                });
            }
        }).catch(function (err) {
            console.log(err)
            reject({success: false, data: err.data.toString()});
        });
    });
}

function updateCompany(data, id, me = false) {
    console.log(data)
    let username = data.username;
    delete data.username;
    delete data.social_media_sites;
    delete data.tags;
    delete data.isCompany;
    delete data.isAdmin;

    return new Promise(function (resolve, reject) {
        config.con.query("UPDATE companies SET ? where id = ?", [data, id], function (err, res) {
            if (err) {
                console.log(err.toString())
                reject({success: false, data: err.toString()});
            }
            if (me) {
                getCompanyByUsername(username, {password: true}).then(userData => {
                    let token = entities.signToken(userData.company)
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

function changePassword (req) {
    return new Promise((resolve, reject) => {

        getCompanyByUsername(req.company.username).then(function (data) {
            if (!data.userFound) {
                reject({success: false, data: data.data.toString()}); // no user found, should probably logout?
            } else {
                entities.comparePassword(req.body.password, data.company.password).then(function (pwdata) {
                    if (!pwdata.isMatch) {
                        reject({success: false, data: pwdata.data.toString()});
                    } else {
                        bcrypt.genSalt(config.encryptRounds, function (err, salt) { //generate a salt with rounds
                            bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
                                if (err) {
                                    reject({success: false, data: err.toString()});
                                } else {
                                    updateCompany({
                                        password: hash,
                                        username: req.company.username
                                    }, req.company.id, true).then(function (data) {
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
    })
}

function updateWebsite(userId, username, website) {
    return new Promise((resolve, reject) => {
        config.con.query("UPDATE companies SET website = ? WHERE id = ?", [website, userId], function (err, res) {
            getCompanyByUsername(username, {password: true}).then(companyData => {
                resolve({success: true, token: entities.signToken(companyData.company)})
            });
        })
    })
}

module.exports = {
    'getCompanyByUsername': getCompanyByUsername,
    'authenticate': authenticate,
    'updateWebsite': updateWebsite,
    'updateCompany': updateCompany,
    'changePassword': changePassword
};