'use strict';
var config = require('../config');
var authorisationModel = require('../models/AuthorisationModel');
var moment = require('moment');

module.exports = {
    getEvents: function () {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM events WHERE approved = 1 ORDER BY start ASC", function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get events."
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
    getEventCategories: function () {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM event_categories ORDER BY value ASC", function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get event categories."
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },getUpcomingEvents: function () {
        let today = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');

        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM events WHERE start > ? ORDER BY start ASC LIMIT 3", [today], function (err, res) {
                if (err) {
                    console.log(err)
                    reject({
                        success: false,
                        data: "Failed to get events."
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    }, getUserEvents: function (user) {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM user_events WHERE user_id = ?", [user.id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "failed to get user event"
                    });
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        });
    },
    addUserEvent: function (req) {
        return new Promise(function (resolve, reject) {
            let user_id = req.user.id;
            let event_id = req.body.event_id;

            con.query("INSERT INTO user_events SET ?", {
                user_id: user_id,
                event_id: event_id
            }, function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to assign you to this event!"
                    })
                } else {
                    resolve({
                        success: true,
                        data: res
                    });
                }
            })
        })
    },
    removeUserEvent: function (req) {
        return new Promise(function (resolve, reject) {
            let user_id = req.body.user_id;
            let event_id = req.body.event_id;

            if (user_id === undefined)
                user_id = req.user.id;

            con.query("DELETE FROM user_events WHERE user_id = ? AND event_id = ?", [user_id, event_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to remove from the event"
                    })
                } else {
                    console.log(res);
                    resolve({
                        success: true,
                        data: "Successfully removed from the event"
                    });
                }
            })
        })
    },
    addEvent: function (req) {
        return new Promise(function (resolve, reject) {
            authorisationModel.allowEventBookingNoConfirm(req.user).then((resp) => {
                if (typeof req.body.event.start !== 'undefined' && typeof req.body.event.end !== 'undefined') {
                    if (moment(req.body.event.start).isBefore(moment(req.body.event.end))) {
                        config.con.query("INSERT INTO events SET ?", [req.body.event], function (err, res) {
                            if (err) {
                                console.log(err.toString())
                                reject({
                                    success: false,
                                    authorised: true,
                                    data: 'Failed to insert event'
                                })
                            } else {
                                resolve({
                                    success: true,
                                    authorised: true,
                                    insertId: res.insertId,
                                    data: 'Succesfully added your event'
                                });
                            }
                        })
                    } else {
                        reject({
                            success: false,
                            authorised: true,
                            data: "Start must be before end"
                        })
                    }
                } else {
                    reject({
                        success: false,
                        authorised: true,
                        data: "Please fill in the required form correctly"
                    })
                }
            }).catch(() => {
                reject({
                    success: false,
                    authorised: false
                })
            })
        })
    },
    deleteEvent: function (req) {
        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin) {
                con.query("DELETE FROM `events` WHERE id = ?", [
                    req.params.event_id
                ], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to remove from the event",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            event_id: req.params.event_id,
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
        })
    },
    deleteAllEventUsers: function (req, event_id) {
        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin) {
                config.con.query("DELETE FROM user_events WHERE event_id = ?", [
                    event_id
                ], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Successfully deleted the event, failed to delete the users",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: "Successfully deleted the event and it's users",
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
        })
    },
    updateEvent: function (req) {
        // Clone object and delete participants (not a column in db)
        let clone = req.body.event;
        delete clone.participants;

        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin) {
                config.con.query(`UPDATE events
                                  SET ?
                                  where id = ?`, [clone, clone.id], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to update event.",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: "Successfully updated event.",
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
        })
    },
    getEvent: function (req) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT *
                       FROM events
                       WHERE id = ?`, [req.params.event_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get event"
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
    getEventFromID: function (event_id) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT *
                       FROM events
                       WHERE id = ?`, [event_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get event"
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
    getParticipants: function (event_id) {
        return new Promise(function (resolve, reject) {
            con.query(`SELECT u.username AS username,
                              u.id       AS user_id,
                              e.id       AS event_id,
                              u.first_name,
                              u.insertions,
                              u.last_name
                       FROM events e
                              INNER JOIN user_events ue ON ue.event_id = e.id
                              LEFT JOIN users u ON u.id = ue.user_id
                       WHERE e.id = ?`, [event_id], function (err, res) {
                if (err) {
                    reject({
                        success: false,
                        data: "Failed to get event participants."
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
    getRequestsEvents: function (req) {
        return new Promise(function (resolve, reject) {;
            if (req.user.isAdmin) {
                con.query("SELECT * FROM events WHERE approved = 0 ORDER BY start ASC", function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to get events."
                        })
                    } else {
                        resolve({
                            success: true,
                            data: res
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
    updateRequestState: function (req) {
        return new Promise(function (resolve, reject) {
            if (req.user.isAdmin) {
                config.con.query(`UPDATE events
                                  SET approved = 1
                                  where id = ?`, [req.params.event_id], function (err, res) {
                    if (err) {
                        reject({
                            success: false,
                            data: "Failed to update request state.",
                            authorised: true
                        })
                    } else {
                        resolve({
                            success: true,
                            data: "Successfully updated request state.",
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
        })
    }
};