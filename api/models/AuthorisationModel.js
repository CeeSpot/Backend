module.exports = {
    isLoggedIn: function(user) {
        return new Promise((resolve, reject) => {
            resolve({
                success:true,
                authorised: true
            })
        })
    },
    isAdmin: function (user) {
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
    }
};