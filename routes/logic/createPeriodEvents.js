module.exports = function(timetableObj, periodTimes, dates, dateRange) {
	// array to store all events
	// outer layer: array of events
	// middle layer: array of event properties (in order: subject, startDate,
	// startTime, endDate, endTime, allDayEvent, description, location)
	var allEvents = [];

	// iterate through each JSON value in dates.json, checking which cycle day
	// it is by matching the corresponding index in timetableObj, and creating
	// its corresponding events
	dates.forEach(function(cycleDayOfDates, cycleDayIndex) {
		cycleDayOfDates.forEach(function(jsonDay) {
			// check if jsonDay falls within dateRange
			if (jsonDay >= dateRange[0] && jsonDay <= dateRange[1]) {
				timetableObj[cycleDayIndex].forEach(function(period, periodIndex) {
					// check if period is free
					if (period[0] !== '') {
						// get corresponding periodTime using periodIndex
						allEvents.push([period[0],
							formatJSONToDate(jsonDay),
							formatJSONToTime(periodTimes[periodIndex][0]),
							formatJSONToDate(jsonDay),
							formatJSONToTime(periodTimes[periodIndex][1]),
							'False',
							period[2] == undefined ? '' : period[1],
							period[2] == undefined ? period[1] : period[2]
						]);
					}
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
	var day = dateObj.getDate().toString();
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
