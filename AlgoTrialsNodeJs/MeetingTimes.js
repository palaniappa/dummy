'use strict';
main();

function main() {
    let user1Cal = [['9:00', '10:30'], ['12:00', '13:00'], ['16:00', '18:00']];
    let user1Bound = ['9:00', '20:00'];
    let user2Cal = [['10:00', '11:30'], ['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']];
    let user2Bound = ['10:00', '18:30'];

    let requestedTimeInMins = 30;

    //[['11:30','12:00'],['15:00','16:00'],['18:00','18:30']]

    let overLappingFreeTimes = [];
    let u1Idx = 0;
    let u2Idx = 0;
    let u1CalWithBounds = getCalInMinutes(getCalendarWithBounds(user1Cal, user1Bound));
    let u2CalWithBounds = getCalInMinutes(getCalendarWithBounds(user2Cal, user2Bound));
    let u1FreeSlot = null;
    let u2FreeSlot = null;
    while (u1Idx < u1CalWithBounds.length && u2Idx < u2CalWithBounds.length) {
        //find the free period for user 1
        if (u1FreeSlot == null) {
            while (u1Idx + 1 < u1CalWithBounds.length && u1CalWithBounds[u1Idx][1] >= u1CalWithBounds[u1Idx + 1][0]) {
                u1Idx++;
            }
            if (u1Idx + 1 < u1CalWithBounds.length && u1CalWithBounds[u1Idx][1] < u1CalWithBounds[u1Idx + 1][0])
                u1FreeSlot = [u1CalWithBounds[u1Idx][1], u1CalWithBounds[u1Idx + 1][0]];
            else {
                u1Idx++;
            }
        }

        if (u2FreeSlot == null) {
            while (u2Idx + 1 < u2CalWithBounds.length && u2CalWithBounds[u2Idx][1] >= u2CalWithBounds[u2Idx + 1][0]) {
                u2Idx++;
            }
            if (u2Idx + 1 < u2CalWithBounds.length && u2CalWithBounds[u2Idx][1] < u2CalWithBounds[u2Idx + 1][0])
                u2FreeSlot = [u2CalWithBounds[u2Idx][1], u2CalWithBounds[u2Idx + 1][0]];
            else {
                u2Idx++;
            }
        }

        if (u1FreeSlot != null && u2FreeSlot != null) {

            if (u1FreeSlot[1] < u2FreeSlot[0]) {
                u1FreeSlot = null;
                u1Idx++;
            }
            else if (u1FreeSlot[0] > u2FreeSlot[1]) {
                u2FreeSlot = null;
                u2Idx++;
            }
            else {

                let overlappingStartTime = Math.max(u1FreeSlot[0], u2FreeSlot[0]);
                let overlappingEndTime = Math.min(u1FreeSlot[1], u2FreeSlot[1]);
                if (overlappingEndTime - overlappingStartTime >= requestedTimeInMins) {
                    overLappingFreeTimes.push([overlappingStartTime, overlappingEndTime]);
                }

                if (u1FreeSlot[1] < u2FreeSlot[1]) {
                    u1FreeSlot = null;
                    u1Idx++;
                } else if (u1FreeSlot[1] > u2FreeSlot[1]) {
                    u2FreeSlot = null;
                    u2Idx++;
                }
                else {
                    u1FreeSlot = null;
                    u1Idx++;
                    u2FreeSlot = null;
                    u2Idx++;
                }
            }
        }

    }

    let result = convertMinsToTime(overLappingFreeTimes);
    process.stdout.write(JSON.stringify(result));
}

function convertMinsToTime(minsArray){
    let time = [];
    minsArray.forEach( m=>{
        time.push([getValInTime(m[0]), getValInTime(m[1])]);
    });
    return time;
}

function getValInTime(minVal) {
    let h = Math.floor(minVal / 60);
    let m = minVal % 60;
    var time = ("0" + h).slice(-2) + ":" +  (m + "0").slice(0,2);
    return time;
}

function getValInMins(timeVal) {
    let elements = timeVal.split(':');
    let h = parseInt(elements[0], 10);
    let mins = parseInt(elements[1], 10);
    return h * 60 + mins;
}

function getCalInMinutes(cal) {
    let newCal = [];
    cal.forEach(item => {
        let start = getValInMins(item[0]);
        let end = getValInMins(item[1]);
        newCal.push([start, end]);
    });
    return newCal;
}

function getCalendarWithBounds(calendar, bound) {
    let calendarWithBounds = [['00:00', bound[0]]];
    calendarWithBounds = calendarWithBounds.concat(calendar);
    calendarWithBounds.push([bound[1], '23:59']);
    return calendarWithBounds;
}