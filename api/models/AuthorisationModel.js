let companyEntities = require('./Entities/CompanyEntities');
let userEntities = require('./Entities/UserEntities');
module.exports = {
    isLoggedIn: function(user) {
        return new Promise((resolve, reject) => {
            resolve({
                success:true,
                authorised: true
            })
        })
    },
    isAdminLoggedIn: function (user) {
        return new Promise((resolve, reject) => {
            if(user.isAdmin) {
                resolve({
                    success: true,
                    authorised: true
                })
            } else {
                resolve({
                    success: true,
                    authorised: false
                })
            }
        })
    },
    allowProfileManagement: function (user) {
        return new Promise((resolve, reject) => {
            resolve({
                success: true,
                authorised: false
            })
        });
    },
    allowSpaceBookingNoConfirm: function (user) {
        return new Promise((resolve, reject) => {
            // Can do without a confirmation
            if(user.isAdmin || user.isStandardUser || user.isPartner || user.isFellow) {
                resolve({
                    success: true,
                    authorised: true,
                    allowed: true,
                    noconfirm: true
                });
            } else {
                // Can do with a confirmation
                if (user.isGuestUser) {
                    resolve({
                        success: true,
                        authorised: true,
                        allowed: true,
                        noconfirm: false
                    });
                }else{
                    reject({
                        success: false,
                        authorised: false,
                        allowed: false,
                        noconfirm: false
                    });
                }
            }
        });
    },
    allowEventBookingNoConfirm: function (user) {
        return new Promise((resolve, reject) => {
            // Can do without a confirmation
            if (user.isAdmin) {
                resolve({
                    success: true,
                    authorised: true,
                    allowed: true,
                    noconfirm: true
                });
            } else {
                // Can do with a confirmation
                if (user.isPartner || user.isFellow || user.isGuestUser || user.isStandardUser) {
                    resolve({
                        success: true,
                        authorised: true,
                        allowed: true,
                        noconfirm: false
                    });
                } else {
                    reject({
                        success: false,
                        authorised: false,
                        allowed: false,
                        noconfirm: false
                    });
                }
            }
        });
    },
    allowCreateCompanyPage: function (user) {
        return new Promise((resolve, reject) => {
            if(user.isAdmin || user.isStandardUser || user.isPartner || user.isFellow) {
                resolve({
                    success: true,
                    authorised: true
                });
            } else {
                resolve({
                    success: true,
                    authorised: false
                });
            }
        });
    },
    authenticate: function (req) {
        return new Promise((resolve, reject) => {
            if(req.params.type === '1') {
                resolve(userEntities.authenticate(req))
            }else if (req.params.type === '2') {
                resolve(companyEntities.authenticate(req.body))
            }else {
                reject({
                    success: false,
                    data: 'Incorrect login type'
                })
            }
        })
    },
    changePassword: function (req) {
        return new Promise((resolve, reject) => {
            console.log(req.params.type)
            if(req.params.type === '1') {
                resolve(userEntities.changePassword(req))
            }else if (req.params.type === '2') {
                resolve(companyEntities.changePassword(req))
            }else {
                reject({
                    success: false,
                    data: 'Incorrect login type'
                })
            }
        })
    }
};