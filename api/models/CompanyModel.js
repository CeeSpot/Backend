'use strict';
var config = require('../config');
let entities = require('./Entities/Entities');
let enums = require('../Enums');
let SocialMediaModel = require('./SocialMediaModel');
let SocialMediaEntities = require('./Entities/SocialMediaEntities');

module.exports = {
    getCompanies: new Promise(function (resolve, reject) {
        config.con.query("SELECT * FROM companies", function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res);
            }
        })
    }),
    getCompany: function (req) {
        return new Promise(function (resolve, reject) {
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
                                data: 'Failed to get users for this company'
                            })
                        } else {
                            let company = companyRes[0];
                            company.users = userCompanyRes;
                            SocialMediaEntities.getResourceSocialMediaSites(req.params.company_id, enums.socialMediaRoles.SOCIAL_MEDIA_COMPANY).then((data) => {
                                company.social_media_sites = data;

                                config.con.query(`SELECT cts.id, cts.name FROM company_tags ct
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
    }
};