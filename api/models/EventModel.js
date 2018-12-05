'use strict';
var config = require('../config');

module.exports = {
    getEvents: new Promise(function (resolve, reject) {
        con.query("SELECT * FROM events", function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res);
            }
        })
    }),
    getUserEvents: new Promise(function (resolve, reject) {
        con.query("SELECT * FROM user_events WHERE user_id = 1", function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res);
            }
        })
    }),
    addUserEvent: function (req) {
        return new Promise(function (resolve, reject) {
            var user_id = 1;
            var event_id = req.body.event_id;
            con.query("INSERT INTO user_events SET ?", {
                user_id: user_id,
                event_id: event_id
            }, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            })
        })
    },
    removeUserEvent: function (req) {
        return new Promise(function (resolve, reject) {
            var user_id = 1;
            var event_id = req.body.event_id;
            console.log(event_id);
            con.query("DELETE FROM user_events WHERE user_id = "+ user_id +" AND event_id = " + event_id, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            })
        })
    }
};