var choices = require('./choices.json');
var periodtimes = require('./periodtimes.json');

module.exports = function(timetable, cdates, activities, role) {

  var masterstr = '';
  masterstr += 'Subject,Start Date,Start Time,End Date,End Time,Location,Description,All Day Event\n';

	if (timetable != '') {
		var splitday = genSplitDay(timetable);

		for (i = 0; i < splitday.length; i++) {
			var day = splitday[i];
			var sday = day[0].split(' ')[1].slice(0, 2);
			var dates = cdates[sday];

			day.splice(0, 1);

			if (role == 'teacher') {
				var classes = genClassesOfDayTeacher(day);
			} else {
				masterstr += genFullDayEvents(dates, sday);
				var classes = genClassesOfDayStudent(day);
			}

			masterstr += genClassEvents(dates, classes, role);
		}
	}

	for (i = 0; i < activities.length; i++) {
		var activity = activities[i];

		if (isNaN(activity.day)) {
			masterstr += genCycleDayActivity(cdates, activity, role);
		} else {
			masterstr += genWeekDayActivity(cdates, activity, role);
		}
	}

  return masterstr;
};

var genSplitDay = function(timetable) {
	var raw = timetable.split('\n');

	var splitday = [];

	var c = 0;
	for (var i = 1; i < raw.length; i++) {
		if (raw[i].indexOf('\t') > -1) {
			splitday.push(raw.slice(c, i));
			c = i;
		}
	}
	splitday.push(raw.slice(c, raw.length));

	return splitday;
};

var genClassesOfDayStudent = function(day) {
	var classes = [];

	var k = 0;
	for (j = 0; j < 6; j++) {
		if (day[k] != '') {
			classes[j] = day.slice(k, k + 3);
			k += 3;
		} else {
			k += 2;
		}
	}

	return classes;
};

var genClassesOfDayTeacher = function(day) {
	classes = [[''], [''], [''], [''], [''], ['']];

	var c = 0;
	for (var j = 0; j < day.length; j++) {
		if (day[j] == '') {
			c++;
			continue;
		}
		if (day[j].length == 3 || day[j].length == 4 && !isNaN(day[j].slice(0, 3))) {
		// if (!isNaN(day[j]) || day[j] == 'TBC' || !isNaN(day[j].slice(0, 3))) {
			classes[c][2] = day[j];
			classes[c][1] = '';
			c++;
		} else {
			classes[c][0] += day[j] + ' ';
		}
	}

	return classes;
};

var genClassEvents = function(dates, classes, role) {
	var masterstr = '';

	for (var j = 0; j < dates.length; j++) {
		var times;

		if (!isChoices(dates[j])) {
			times = periodtimes['normal'][role];
		} else {
			times = periodtimes['choices'][role];
			var d = dates[j];

			var subject = 'CHOICES';
			var startDate = '' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
			var startTime = times[9][0];
			var endDate = startDate;
			var endTime = times[9][1];
			var location = '';
			var description = '';
			var allDayEvent = 'False';

			var s = subject + ',' + startDate + ',' + startTime + ',' + endDate + ',' + endTime + ',' + location + ',' + description + ',' + allDayEvent + '\n';
			masterstr += s;
		}

		for (var k = 0; k < classes.length; k++) {
			var d = dates[j];
			var c = classes[k];

			if (c != undefined && c[0] != '') {
				var subject = c[0];
				var startDate = '' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
				var startTime = times[k][0];
				var endDate = startDate;
				var endTime = times[k][1];
				var location = c[2];
				var description = c[1];
				var allDayEvent = 'False';

				var s = subject + ',' + startDate + ',' + startTime + ',' + endDate + ',' + endTime + ',' + location + ',' + description + ',' + allDayEvent + '\n';
				masterstr += s;
			}
		}
	}

	return masterstr;
};

var genFullDayEvents = function(dates, sday) {
	var masterstr = '';

	for (var j = 0; j < dates.length; j++) {
		var d = dates[j];

		var subject = 'Day ' + sday;
		var startDate = '' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
		var startTime = '';
		var endDate = startDate;
		var endTime = '';
		var location = '';
		var description = '';
		var allDayEvent = 'True';

		var s = subject + ',' + startDate + ',' + startTime + ',' + endDate + ',' + endTime + ',' + location + ',' + description + ',' + allDayEvent + '\n';
		masterstr += s;
	}

	return masterstr;
};

var genCycleDayActivity = function(cdates, activity, role) {
	var masterstr = '';

	var dates = cdates[activity.day.toUpperCase()];

	for (var j = 0; j < dates.length; j++) {
		d = dates[j];

		var times;
		if (isChoices(d)) {
			times = periodtimes['choices'][role];
		} else {
			times = periodtimes['normal'][role];
		}

		var subject = activity.name;
		var startDate = '' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
		var startTime = times[activity.startPeriod][0];
		var endDate = startDate;
		var endTime = times[activity.endPeriod][1];
		var location = activity.location;
		var description = '';
		var allDayEvent = 'False';

		var s = subject + ',' + startDate + ',' + startTime + ',' + endDate + ',' + endTime + ',' + location + ',' + description + ',' + allDayEvent + '\n';
		masterstr += s;
	}

	return masterstr;
};

var genWeekDayActivity = function(cdates, activity, role) {
	var masterstr = '';
	var keys = Object.keys(cdates);

	for (var j = 0; j < keys.length; j++) {
		var dates = cdates[keys[j]];

		for (var k = 0; k < dates.length; k++) {
			var d = dates[k];

			if (d.getDay() == activity.day) {
				var times;
				if (isChoices(d)) {
					times = periodtimes['choices'][role];
				} else {
					times = periodtimes['normal'][role];
				}

				var subject = activity.name;
				var startDate = '' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
				var startTime = times[activity.startPeriod][0];
				var endDate = startDate;
				var endTime = times[activity.endPeriod][1];
				var location = activity.location;
				var description = '';
				var allDayEvent = 'False';

				var s = subject + ',' + startDate + ',' + startTime + ',' + endDate + ',' + endTime + ',' + location + ',' + description + ',' + allDayEvent + '\n';
				masterstr += s;
			}
		}
	}

	return masterstr;
}

var isChoices = function(date) {
	return choices.indexOf(date.valueOf()) != -1
};
