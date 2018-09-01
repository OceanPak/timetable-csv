module.exports = function(activities, activitiesTimes, dates, dateRange) {
	// array to store activities, organised by day
	// weekDayActivites: contains 5 arrays, each containing the activities occuring on that day
	// cycleDayActivities: contains 12 arrays, each containing the activities occuring on that day
	var weekDayActivities = [];
	var cycleDayActivities = [];
	for (var i = 0; i < 5; i++) {
		weekDayActivities.push([]);
	}
	for (var i = 0; i < 12; i++) {
		cycleDayActivities.push([]);
	}

	// iterate through activities to populate weekDayActivities and cycleDayActivities
	activities.forEach(function(activity) {
		// check if activity recurs on weekday or cycleday
		if (isNaN(activity.day)) {
			if (activity.day.substr(0, 1) === 'a') {
				cycleDayActivities[parseInt(activity.day.substring(1)) * 2 - 2].push(activity);
			} else {
				cycleDayActivities[parseInt(activity.day.substring(1)) * 2 - 1].push(activity);
			}
		} else {
			weekDayActivities[parseInt(activity.day) - 1].push(activity);
		}
	});

	// array to store all events
	// outer layer: array of events
	// middle layer: array of event properties (in order: subject, startDate,
	// startTime, endDate, endTime, allDayEvent, description, location)
	var allEvents = [];

	// iterate through each JSON value in dates.json, checking which cycle day it is by matching the
	// corresponding index in timetableObj, and which week day it is, and creating its corresponding
	// events
	dates.forEach(function(cycleDayOfDates, cycleDayIndex) {
		cycleDayOfDates.forEach(function(jsonDay) {
			// check if jsonDay falls within dateRange
			if (jsonDay >= dateRange[0] && jsonDay <= dateRange[1]) {
				// check weekday of jsonDay and create corresponding events
				var d = new Date(jsonDay);
				weekDayActivities[d.getDay() - 1].forEach(function(activity) {
					allEvents.push([activity.name,
						formatJSONToDate(jsonDay),
						formatJSONToTime(activitiesTimes[parseInt(activity.startTime)][0]),
						formatJSONToDate(jsonDay),
						formatJSONToTime(activitiesTimes[parseInt(activity.endTime)][1]),
						'False',
						'',
						activity.location
					]);
				});

				// check cycleday and create corresponding events
				cycleDayActivities[cycleDayIndex].forEach(function(activity) {
					allEvents.push([activity.name,
						formatJSONToDate(jsonDay),
						formatJSONToTime(activitiesTimes[parseInt(activity.startTime)][0]),
						formatJSONToDate(jsonDay),
						formatJSONToTime(activitiesTimes[parseInt(activity.endTime)][1]),
						'False',
						'',
						activity.location
					]);
				});
			}
		});
	});

	return allEvents;
};

function formatJSONToDate(dateJSON) {
	var dateObj = new Date(dateJSON);

	var year = dateObj.getFullYear();
	var month = (1 + dateObj.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	var day = (1 + dateObj.getDate()).toString();
	day = day.length > 1 ? day : '0' + day;
	return month + '/' + day + '/' + year;
}

function formatJSONToTime(timeJSON) {
	var hour = timeJSON[0].toString();
	hour = hour.length > 1 ? hour : '0' + hour;
	var minute = timeJSON[1].toString();
	minute = minute.length > 1 ? minute : '0' + minute;
	var suffix = timeJSON[0] >= 12 ? 'PM' : 'AM';
	return hour + ':' + minute + ' ' + suffix;
}
