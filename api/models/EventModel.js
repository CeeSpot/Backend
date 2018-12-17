'use strict';
var config = require('../config');

module.exports = {
    getEvents: function () {
            return new Promise(function (resolve, reject) {
                con.query("SELECT * FROM events", function (err, res) {
                    if (err) {
                        reject({
                            success:false,
                            message: "Failed to get events."
                        })
                    } else {
                        resolve({
                            success: true,
                            message: res
                        });
                    }
                })
            });
    },
    getUserEvents: function (user) {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM user_events WHERE user_id = ?", [user.id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        message: "failed to get user event"
                    });
                } else {
                    // console.log(res);
                    resolve({
                        success: true,
                        message: res
                    });
                }
            })
        });
    },
    addUserEvent: function (req) {
        return new Promise(function (resolve, reject) {
            var user_id = req.user.id;
            var event_id = req.body.event_id;
            con.query("INSERT INTO user_events SET ?", {
                user_id: user_id,
                event_id: event_id
            }, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        message: "Failed to assign you to this event!"
                    })
                } else {
                    resolve({
                        success: true,
                        message: res
                    });
                }
            })
        })
    },
    removeUserEvent: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("DELETE FROM user_events WHERE user_id = ? AND event_id = ?", [req.user.id, req.body.event_id], function (err, res) {
                if (err) {
                    console.log(err);
                    reject({
                        success: false,
                        message: "Failed to remove from the event"
                    })
                } else {
                    console.log(res);
                    resolve({
                        success: true,
                        message: "Successfully removed from the event"
                    });
                }
            })
        })
    },
    addEvent: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("INSERT INTO events SET ?", {
                title: req.body.title,
                description: req.body.description,
                start: req.body.start,
                end: req.body.end
            }, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            })
        })
    },
    deleteEvent: function (req) {
        return new Promise(function (resolve, reject) {
            con.query("DELETE FROM events WHERE id = ?", [
                req.body.event_id
            ], function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    console.log(res);
                    resolve(res);
                }
            })
        })
    },
    updateEvent: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`UPDATE events SET title = ?, description = ?, start = ?, end = ?,
                small_description = ?, location_name = ?, location_street = ?, location_postalcode = ?,
                 location_number = ?, location_city = ? WHERE id = ?`, [
                req.body.title,
                req.body.description,
                req.body.start,
                req.body.end,
                req.body.small_description,
                req.body.location_name,
                req.body.location_street,
                req.body.location_postalcode,
                req.body.location_number,
                req.body.location_city,
                req.body.id
            ], function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    console.log(res);
                    resolve(res);
                }
            })
        })
    },
    getParticipants: function (event_id) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT u.username AS username, u.id AS user_id, e.id AS event_id, u.first_name, u.insertions, u.last_name FROM events e
            INNER JOIN user_events ue ON ue.event_id=e.id
            LEFT JOIN users u ON u.id=ue.user_id
            WHERE e.id = ?`, [event_id], function (err, res) {
                if (err) {
                    reject({
                        success:false,
                        message: "Failed to get event participants."
                    })
                } else {
                    resolve({
                        success: true,
                        message: res
                    });
                }
            })
        });
    },
    getEvent: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT * FROM events WHERE id = ?`, [req.params.event_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        message: "Failed to get event"
                    })
                } else {
                    resolve({
                        success: true,
                        message: res
                    });
                }
            })
        });
    }
};