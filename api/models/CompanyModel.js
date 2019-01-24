'use strict';
let bcrypt = require('bcryptjs');
let config = require('../config');
let enums = require('../Enums');
let SocialMediaEntities = require('./Entities/SocialMediaEntities');
let SocialMediaModel = require('./SocialMediaModel');
let CompanyEntities = require('./Entities/CompanyEntities');
let entities = require('./Entities/Entities');

var authorisationModel = require('../models/AuthorisationModel');

let encryptRounds = config.encryptRounds;

module.exports = {
    getCompanies: function() {
        return new Promise(function (resolve, reject) {
            config.con.query("SELECT * FROM companies", function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: 'Failed to get companies'
                    })
                } else {
                    let companies = [];

                    res.forEach(function (i) {
                        companies.push(entities.getJsonObjectFromDatabaseObject(i, {password: true, username: true}))
                    });
                    resolve({
                        success: true,
                        data: companies
                    });
                }
            })
        })
    },
    getCompany: function (req) {
        return new Promise(function (resolve, reject) {
            // console.log('hello');
            // console.log(req.params.company_id);
            config.con.query(`SELECT * FROM companies WHERE id = ?`, [req.params.company_id], function (err, companyRes) {

                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get company"
                    })
                } else {
                    config.con.query(`SELECT  u.id, CONCAT_WS(' ', u.first_name, u.last_name) as name, uc.role FROM user_companies uc
                                      INNER JOIN users u ON uc.user_id = u.id
                                      WHERE uc.company_id = ?`, [req.params.company_id], (err, userCompanyRes) => {
                        if(err) {
                            reject({
                                success: false,
                                data: 'Failed to get employees for this company'
                            })
                        } else {
                            let company = companyRes[0];
                            company = entities.getJsonObjectFromDatabaseObject(company, {password: true, username: true})
                            company.users = userCompanyRes;
                            SocialMediaEntities.getResourceSocialMediaSites(req.params.company_id, enums.socialMediaRoles.SOCIAL_MEDIA_COMPANY).then((data) => {
                                company.social_media_sites = data;

                                config.con.query(`SELECT cts.id, cts.description FROM company_tags ct
                                                    INNER JOIN companies_tags cts
                                                    ON ct.tag_id = cts.id
                                                    WHERE ct.company_id = ?`, [req.params.company_id], (err, res) => {
                                    if (err) {
                                        reject({
                                            success: false,
                                            data: 'Failed to get tags for this company'
                                        })
                                    } else {
                                        company.tags = res;
                                        resolve({
                                            success: true,
                                            company: company,
                                            type: enums.socialMediaRoles.SOCIAL_MEDIA_COMPANY
                                        });
                                    }
                                });
                            });
                        }
                    });
                }
            })
        });
    },
    createCompany: function(req) {
        return new Promise((resolve, reject) => {
            authorisationModel.allowCreateCompanyPage(req.user).then((data) => {
                if (data.success && data.authorised) {

                    let username = req.body.username;
                    config.con.query("SELECT username from `companies` WHERE username = ? ORDER BY username LIMIT 1", [username], function (err, results) {
                        if (err) {
                            reject({
                                success: false,
                                data: 'Something went wrong'
                            }) // Something went wrong
                        }
                        if (results.length > 0) {
                            reject({success: false, data: "Company username already exists"}); // User exists
                        } else {
                            bcrypt.genSalt(encryptRounds, function (err, salt) {
                                bcrypt.hash(req.body.password, salt, function (err, hash) {
                                    if (err) {
                                        reject({success: false, data: err.toString()});
                                    } else {

                                        // Store hash in your password DB.
                                        let post = {
                                            name: req.body.name,
                                            email: req.body.email,
                                            username: username,
                                            password: hash,
                                        };

                                        config.con.query(`INSERT INTO companies SET ?`, post, function (err, res) {
                                            if (err) {
                                                reject({success:false, data: err.toString()})
                                            } else {
                                                resolve({success:true, data: 'Successfully added your company account'})
                                            }
                                        })
                                    }
                                })
                            })
                        }
                    })

                } else {
                    resolve(data)
                }
            })
        })
    },
    me: function (req) {
        return new Promise((resolve, reject) => {
            config.con.query(`SELECT cts.id, cts.description FROM company_tags ct
                                INNER JOIN companies_tags cts
                                ON ct.tag_id = cts.id
                                WHERE ct.company_id = ?`, [req.company.id], (err, res) => {
                if(err) {
                    reject({
                        success: false,
                        data: 'Failed to get company tags'
                    })
                }else {
                    req.company.tags = res;
                    SocialMediaEntities.getResourceSocialMediaSites(req.company.id, enums.socialMediaRoles.SOCIAL_MEDIA_COMPANY)
                        .then((data) => {
                            req.company.social_media_sites = data;

                            SocialMediaModel.getSites().then((socialMediaSites) => {
                                resolve({
                                    success: true,
                                    company: req.company,
                                    sites: socialMediaSites.data,
                                    type: enums.socialMediaRoles.SOCIAL_MEDIA_COMPANY
                                });
                            });
                        })
                }
            })
        })
    },
    updateCompany: function (req) {
        return new Promise(function (resolve, reject) {
            if (req.company.id === req.body.company.id || (req.user !== null && req.user.isAdmin)) {
                CompanyEntities.getCompanyByUsername(req.body.company.username).then((resp) => {
                    if (!resp.success) reject(resp);
                    CompanyEntities.updateCompany(req.body.company, req.company.id, req.company.id === req.body.company.id).then((updatedUserResp) => {
                        resolve(updatedUserResp);
                    }).catch((err) => {
                        reject(err)
                    });
                }).catch((err) => {
                    reject(err);
                })
            } else {
                reject({
                    success: false,
                    data: 'You are not authorised to update this account',
                    authorised: false
                })
            }
        })
    }
};