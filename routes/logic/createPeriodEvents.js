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
						// special case: if period is a teacher advisory, set startTime to 15 mins
						// before what is written in periodTimes, to compensate for different
						// advisory times
						allEvents.push([period[0].replace(' 1819',''),
							formatJSONToDate(jsonDay),
							checkIfIsTeacherAdvisory(period, periodTimes[periodIndex][0], periodIndex),
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

function checkIfIsTeacherAdvisory(period, startTime, periodIndex) {
	// teacher periods have 2 fields; students have 3
	// regex match to see if period name matches an advisory name (e.g. 11Y2)
	// check if periodIndex is of a period 4 class
	// if so, add time by 15 minutes
	var st = startTime.slice();
	if (period.length == 2 && period[0].match('^[0-9]{2}[A-Z][0-9]$') !== null && periodIndex == 3) {
		st[1] += 15;
		if (st[1] >= 60) {
			st[0] += 1;
			st[1] -= 60;
		}
	}

	return formatJSONToTime(st);
}

function formatJSONToDate(dateJSON) {
	var dateObj = new Date(dateJSON);

	var year = dateObj.getFullYear();
	var month = (1 + dateObj.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	var day = (1+dateObj.getDate()).toString();
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
