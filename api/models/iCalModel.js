var moment = require('moment');
let path = '././static/ical/';

module.exports = {
    /** Update ICS-file with all events */
    updateICSfile: function(){
        return createEventsICS();
    },
    getICSfromEvent: function(req){
        let event_id = req.params.event_id;

        if (parseInt(event_id) > 0 ){
            const fs = require('fs');
            const p = path + `event-` + event_id + `.ics`;
            let fileExists = false;

            // Check if file exists, if not create new ICS file
            try {
                if (fs.existsSync(p)) {
                    fileExists = true;
                }
                else{
                    fileExists = createNewEventICS(event_id);
                }
            } catch(err) {
                console.error(err)
            }

            if (fileExists){
                return p;
            }
        }

        return "";
    },
    getICSAllEvents: function(){
        const fs = require('fs');
        const p = path + `events.ics`;
        let fileExists = false;

        // Check if file exists, if not create new ICS file
        try {
            if (fs.existsSync(p)) {
                fileExists = true;
            }
            else{
                fileExists = createEventsICS();
            }

            if (fileExists){
                return p;
            }
        } catch(err) {
            console.error(err)
        }

        return "";
    }
};

function createEventsICS(){
    let eventModel = require('../models/EventModel');

    eventModel.getEvents().then(function (data) {
        let events = data.data;
        events.forEach(event => {
            event = editEventForICS(event);
        });

        const ics = require('ics');
        const { writeFileSync } = require('fs');

        const { error, value } = ics.createEvents(data.data);

        if (error) {
            console.log(error);
            return false;
        }
        //console.log(value);

        writeFileSync(path + `events.ics`, value);
        return true;

    }).catch(function (err) {
        console.log(err);
        return false;
    });
}

function createNewEventICS(event_id){
    let eventModel = require('../models/EventModel');
    eventModel.getEventFromID(event_id).then(function (data) {
        if (data.data.length > 0){
            let event = editEventForICS(data.data[0]);

            const ics = require('ics');
            const { writeFileSync } = require('fs');

            ics.createEvent(event, (error, value) => {
                if (error) {
                    console.log(error);
                    return false;
                }

                writeFileSync(path + `event-` + event_id + `.ics`, value);
                return true;
            });
        }

        return false;
    }).catch(function (err) {
        console.log(err);
        return false;
    });
}

function convertTimeToIntArray(dateObject){
    let dateArray = [parseInt(moment(dateObject).format('YYYY')), parseInt(moment(dateObject).format('MM')), parseInt(moment(dateObject).format('DD')),
        parseInt(moment(dateObject).format('HH')), parseInt(moment(dateObject).format('mm'))];

    return dateArray;
}

function editEventForICS(event){
    event.start = convertTimeToIntArray(event.start);
    event.end = convertTimeToIntArray(event.end);
    event.description = event.small_description;

    delete event.small_description;
    delete event.show_attendees;
    delete event.location_name;
    delete event.location_address;
    delete event.location_postalcode;
    delete event.location_city;
    delete event.id;
    delete event.approved;
    delete event.picture;
    delete event.category;

    return event;
}