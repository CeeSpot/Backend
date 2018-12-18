'use strict';
let config = require('../config');
let Enums = require('../Enums');
let Entities = require('./Entities/Entities');
let SocialMediaEntities = require("./Entities/SocialMediaEntities");
module.exports = {
    getSites: function () {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM social_media", function (err, res) {
                if (err) reject({success: false, message: "Something went wrong"})
                else resolve({success: true, message: res});
            })
        });
    },
    addSite: function (req) {
        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin) {
                let post = {
                    site: req.body.site
                };
                config.con.query("INSERT INTO social_media SET ?", post, function (err, res) {
                    if (err) reject({success: false, message: "Failed to insert new site"});
                    resolve({success: true, message: "Successfully inserted new social media site"});

                })
            } else reject({success: false, auth: false, message: "You are not authorized to use this function"});

        });
    },
    addResourceSite: function (req) {
        console.log(req.body);
        return new Promise((resolve, reject) => {
            let type = parseInt(req.body.type);
            if (type !== Enums.socialMediaRoles.SOCIAL_MEDIA_USER &&
                type !== Enums.socialMediaRoles.SOCIAL_MEDIA_COMPANY &&
                type !== Enums.socialMediaRoles.SOCIAL_MEDIA_EVENT) {
                reject({success: false, message: "Incorrect type given"});
            } else {
                let sites = req.body.sites;
                let smrs = req.body.social_media_resource_sites;
                let resource_id = req.body.resource_id;

                let errors = {};
                let insertedRecords = 0;
                let updatedRecords = 0;
                SocialMediaEntities.insertResourceRecords(resource_id, type, sites).then((insertedData) => {
                    if (insertedData.success === true) {
                        errors.insert = insertedData.errors;
                        insertedRecords += insertedData.insertedRecords;
                    }
                    SocialMediaEntities.updateResourceRecords(resource_id,type, smrs).then((updatedData) => {
                        if (updatedData.success === true) {
                            errors.update = updatedData.errors;
                            updatedRecords += updatedData.updatedRecords;
                        }
                        resolve({
                            success:true,
                            errors : errors,
                            insertedRecords : insertedRecords,
                            updatedRecords: updatedRecords
                        })
                    })
                })
            }
        });

    }
};