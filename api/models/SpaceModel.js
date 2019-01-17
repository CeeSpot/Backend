'use strict';
var config = require('../config');

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
        return new Promise(function (resolve, reject) {
            con.query("UPDATE spaces SET ? where id = ?", [req.body.data, req.body.data.id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to update space"
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
    deleteSpace: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("DELETE FROM spaces WHERE id = ?", [req.body.space_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to delete space"
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
    addRequest: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("INSERT INTO space_reservations SET ?", [req.body.data], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to add reservation"
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
    addSpace: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("INSERT INTO spaces SET ?", [req.body.data], function (err, res) {
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
    getAvailable: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM space_reservations WHERE space_id = ? AND date = ?", [req.body.data.space_id, req.body.data.date], function (err, res) {
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
        var approved = {approved: 0};
        return new Promise(function (resolve, reject) {
            con.query("INSERT INTO space_reservations SET ?, ?", [req.body.data, approved], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to add booking"
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
    getSpaceRequests: function(req){
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM space_reservations WHERE approved = 0", function (err, res) {
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
    }
    ,
    appDecReservation: function(req, space_id){
        return new Promise(function (resolve, reject) {
            con.query("UPDATE space_reservations SET approved = ? where id = ?", [req.body.data.approved, req.body.data.id], function (err, res) {
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
    }
};