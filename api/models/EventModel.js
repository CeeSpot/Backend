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
        console.log(user.id);
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
        console.log(req.user);
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
                    reject({
                        success: false,
                        message: "Failed to remove from the event"
                    })
                } else {
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
            console.log(req.body.event_id);
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
    }
};