'use strict';
var config = require('../config');
var authorisationModel = require('../models/AuthorisationModel');

module.exports = {
    getSpaces: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM spaces ORDER BY title ASC`, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get spaces"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },
    getSpace: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM spaces WHERE id = ?`,[req.params.space_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get space"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },

    updateSpace: function (req) {
        // Clone object and delete reservations (not a column in db)
        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin) {
                let clone = req.body.space;
                delete clone.reservations;
                con.query("UPDATE spaces SET ? where id = ?", [clone, clone.id], function (err, res) {
                    if (err) {
                        console.log(err);
                        reject({
                            success: false,
                            data: "Failed to update space",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: res,
                            authorised: true
                        });
                    }
                })
            } else {
                reject({
                    success: false,
                    authorised: false
                })
            }
        });
    },
    deleteSpace: function (req) {
        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin) {
                con.query("DELETE FROM spaces WHERE id = ?", [req.body.space_id], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to delete space",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: res,
                            authorised: true
                        });
                    }
                })
            } else {
                reject({
                    success: false,
                    authorised: false
                })
            }
        });
    },
    addSpace: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("INSERT INTO spaces SET ?", [req.body.space], function (err, res) {
                if (req.user.isAdmin) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to get spaces",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: res,
                            authorised: true
                        });
                    }
                } else {
                    reject({
                        success: false,
                        authorised: false
                    })
                }
            })
        });
    },
    getAvailable: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM space_reservations WHERE space_id = ? AND date = ?", [req.body.reservation.space_id, req.body.reservation.date], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get spaces"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },
    addBooking: function (req) {
        return new Promise(function (resolve, reject) {
            authorisationModel.allowSpaceBookingNoConfirm(req.user).then((resp) => {
                req.body.reservation.approved = resp.noconfirm ? 1 : 0
                con.query("INSERT INTO space_reservations SET ?", [req.body.reservation], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to add booking",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: res,
                            authorised: true
                        });
                    }
                })
            }).catch(() => {
                reject({
                    success:false,
                    authorised: false
                })
            })
        });
    },
    getSpaceRequests: function(req){
        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin) {
                con.query("SELECT * FROM space_reservations WHERE approved = 0", function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to get spaces",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: res,
                            authorised: true
                        });
                    }
                })
            } else {
                reject({
                    success: false,
                    authorised: false
                })
            }
        });
    },
    getSpaceReservations: function(req, space_id){
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM space_reservations WHERE space_id = ?",[space_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get spaces"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },
    updateReservationState: function(req, space_id){
        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin) {
                con.query("UPDATE space_reservations SET approved = ? where id = ?", [req.body.reservation.approved, req.body.reservation.id], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to get spaces",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: res,
                            authorised: true
                        });
                    }
                })
            } else {
                reject({
                    success:false,
                    authorised: true
                })
            }
        });
    }
};