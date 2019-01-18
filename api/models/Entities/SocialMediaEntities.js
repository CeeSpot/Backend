let entities = require('./Entities');
let config = require('../../config');
let Enums = require('../../Enums');


function getResourceSocialMediaSites(resourceId, type, excluded = {}) {
    return new Promise((resolve, reject) => {
        config.con.query(`SELECT smr.social_media_id, smr.resource_id, smr.url, sm.site
                          from social_media_resources as smr
                            INNER JOIN social_media as sm ON smr.social_media_id = sm.id
                          WHERE smr.resource_id = ?
                            AND smr.type = ?`, [resourceId, type], function (err, res) {
            if (err) resolve([]);
            else resolve(res)
        });
    });
}

/**
 * Check if a resouce site exists given the type, social media id and resourceid
 * @param socialMediaId
 * @param resourceId
 * @returns {Promise<any>}
 */
function checkIfResourceSiteExists(socialMediaId, resourceId, type) {
    return new Promise((resolve, reject) => {
        console.log(socialMediaId,resourceId,type);
        config.con.query(`SELECT resource_id
                          FROM social_media_resources
                          WHERE resource_id = ?
                            AND social_media_id = ?
                            AND type = ?`, [resourceId, socialMediaId, type], function (err, res) {
            if (err) reject(false);
            else {
                if (res.length > 0) resolve(true);
                else resolve(false);
            }
        })
    });
}

/**
 * Check if the url is somewhat correct
 *
 * @param site
 * @param urlToMatch
 * @returns {boolean}
 */
function socialMediaUrlMatches(site, urlToMatch) {
    return typeof urlToMatch !== 'undefined' && typeof site !== 'undefined';
}

/**
 * Insert a single record into the database
 *
 * @param resourceId
 * @param record
 * @param type
 * @returns {Promise<any>}
 */
function insertResourceRecord(resourceId, type, record) {
    return new Promise((resolve, reject) => {
        console.log(record);
        console.log(record.url.length);
        if (record.url.length > 0) {
            checkIfResourceSiteExists(record.id, resourceId, type).then((data) => {
                if (data === false) {
                    config.con.query("SELECT site FROM social_media WHERE id = ?", [record.id], function (err, res) {
                        // Check if there is an error
                        if (err) reject({success: false, data: "Something went wrong with inserting the site"});
                        else {
                            // Check if there is any data
                            if (res.length === 0) reject({success: false, data: "Site doesn't exist"});
                            else {
                                let post = {
                                    social_media_id: record.id,
                                    resource_id: resourceId,
                                    type: type,
                                    url: record.url
                                };

                                config.con.query("INSERT INTO social_media_resources SET ?", post, function (err, res) {
                                    if (err) reject({
                                        success: false,
                                        data: "Something went wrong with inserting the site"
                                    });
                                    else {
                                        resolve({
                                            success: true,
                                            data: "Successfully added the social media link"
                                        });
                                    }
                                });
                            }
                        }
                    });
                } else {
                    reject({
                        success: false,
                        data: "Social media site " + record.site + " has already been added to this profile"
                    });
                }
            }).catch((err) => reject({success: true, data: "Something went wrong"}))
        }else{
            resolve(deleteResourceRecord(record,type));
        }
    })
}

/**
 * Updates a single record in the database
 *
 * @param record
 * @returns {Promise<any>}
 */
function updateResourceRecord(record, type) {
    return new Promise((resolve, reject) => {
        if (record.url.length > 0) {
            checkIfResourceSiteExists(record.social_media_id, record.resource_id, type).then((data) => {
                if (data === true) {
                    config.con.query("UPDATE social_media_resources SET url = ? WHERE social_media_id = ? AND resource_id = ? AND type = ?",
                        [record.url, record.social_media_id, record.resource_id, type],
                        function (err, res) {
                            if (err) reject({success: false, data: "Failed to update URL for " + record.site});
                            else resolve({success: true, data: "Successfully updated record"});
                        });
                } else {
                    reject({success: false, data: "Can't update URL for " + record.site + ". Site doesn't exist"});
                }
            }).catch((err) => reject(err));
        } else {
            resolve(deleteResourceRecord(record,type));
        }
    });
}
function deleteResourceRecord(record, type) {
    return new Promise((resolve,reject) => {
        checkIfResourceSiteExists(record.social_media_id, record.resource_id,type).then((data) => {
            if(data === true) {
                config.con.query("DELETE FROM social_media_resources WHERE social_media_id = ? AND resource_id = ? AND type = ?",
                    [record.social_media_id, record.resource_id, type],
                    function (err, res) {
                        if (err) {
                            console.log(err.toString());
                            reject({success: false, data: "Failed to remove URL for " + record.site});
                        }
                        else resolve({success: true, data: "Successfully removed record"});
                    });
            }
        }).catch((err) => {
            reject({success:false, data: "Something went wrong"})
        });
    });
}

function insertResourceRecords(resourceId, type, socialMediaResourceSites) {
    return new Promise((resolve, reject) => {
        if (socialMediaResourceSites.length === 0) resolve({success: false, data: "No sites given to update"});
        else {
            let listOfErrors = [];
            let successCounter = 0;
            for (let i = 0; i < socialMediaResourceSites.length; i++) {
                let smr = socialMediaResourceSites[i];
                if (!socialMediaUrlMatches(smr.site, smr.url)) {
                    listOfErrors.push("URL does not match for " + smr.site);
                }

                insertResourceRecord(resourceId, type, smr).then((data) => {
                    successCounter++;
                    if (i === socialMediaResourceSites.length - 1) {
                        resolve({
                            success: true,
                            updatedRecords: successCounter,
                            errors: listOfErrors
                        });
                    }
                }).catch((err) => {
                    listOfErrors.push(err.data);
                    if (i === socialMediaResourceSites.length - 1) {
                        resolve({
                            success: true,
                            updatedRecords: successCounter,
                            errors: listOfErrors
                        });
                    }
                });
            }
        }
    })
}

/**
 * Updates the social_media_resource table with a list of sites
 *
 * @param resourceId user/company/event id
 * @param socialMediaResourceSites the sites
 * @returns {Promise<any>} badabing
 */
function updateResourceRecords(resourceId, type, socialMediaResourceSites) {
    return new Promise((resolve, reject) => {
        if (socialMediaResourceSites.length === 0) resolve({success: false, data: "No sites given to update"});
        else {
            let listOfErrors = [];
            let successCounter = 0;
            for (let i = 0; i < socialMediaResourceSites.length; i++) {
                let smr = socialMediaResourceSites[i];
                if (!socialMediaUrlMatches(smr.site, smr.url)) {
                    listOfErrors.push("URL does not match for " + smr.site);
                }

                updateResourceRecord(smr, type).then((data) => {
                    successCounter++;
                    if (i === socialMediaResourceSites.length - 1) {
                        resolve({
                            success: true,
                            updatedRecords: successCounter,
                            errors: listOfErrors
                        });
                    }
                }).catch((err) => {
                    listOfErrors.push(err.data);
                    if (i === socialMediaResourceSites.length - 1) {
                        resolve({
                            success: true,
                            insertedRecords: successCounter,
                            errors: listOfErrors
                        });
                    }
                });
            }
        }
    });
}

module.exports = {
    'insertResourceRecords': insertResourceRecords,
    'updateResourceRecords': updateResourceRecords,
    'getResourceSocialMediaSites': getResourceSocialMediaSites
};