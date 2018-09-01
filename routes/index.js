var express = require('express');
var router = express.Router();

var cycledates = require('../controllers/cycledates.js');
var convertjson = require('../controllers/convertjson.js');
var generatecsv = require('../controllers/generatecsv.js');

var convertToCSV = require('./logic/convertToCSV.js');
var createActivityEvents = require('./logic/createActivityEvents.js');
var createDayLabelEvents = require('./logic/createDayLabelEvents.js');
var createPeriodEvents = require('./logic/createPeriodEvents.js');
var parseStudentTimetable = require('./logic/parseStudentTimetable.js');
var parseTeacherTimetable = require('./logic/parseTeacherTimetable.js');

var activitiesTimes = require('./resources/activitiesTimes.json');
var choicesDates = require('./resources/choicesDates.json');
var choicesTime = require('./resources/choicesTime.json');
var choicesTimetable = require('./resources/choicesTimetable.json');
var cycleDayLabels = require('./resources/cycleDayLabels.json');
var dateRange = require('./resources/dateRange.json');
var dates = require('./resources/dates.json');
var dpChoicesTimes = require('./resources/dpChoicesTimes.json');
var dpTimes = require('./resources/dpTimes.json');
var mypChoicesTimes = require('./resources/mypChoicesTimes.json');
var mypTimes = require('./resources/mypTimes.json');
var teacherChoicesTimes = require('./resources/teacherChoicesTimes.json');
var teacherTimes = require('./resources/teacherTimes.json');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Moongate timetable converter' });
});

router.post('/getcsv', function(req, res, next) {

	// console.log(JSON.stringify(req.body.timetable));
	if (req.body.timetable === '') {

		var allEvents = [
			createActivityEvents(req.body.activities, activitiesTimes, dates, dateRange),
			createActivityEvents(req.body.activities, activitiesTimes, choicesDates, dateRange)
		];

	} /*else if (req.body.role === 'teacher') {

		var timetableObj = parseTeacherTimetable(req.body.timetable);

		var allEvents = [
			createDayLabelEvents(timetableObj, dates, cycleDayLabels, dateRange),
			createDayLabelEvents(timetableObj, choicesDates, cycleDayLabels, dateRange),
			createPeriodEvents(timetableObj, teacherTimes, dates, dateRange),
			createPeriodEvents(timetableObj, teacherChoicesTimes, choicesDates, dateRange),
			createPeriodEvents(choicesTimetable, choicesTime, choicesDates, dateRange),
			createActivityEvents(req.body.activities, activitiesTimes, dates, dateRange),
			createActivityEvents(req.body.activities, activitiesTimes, choicesDates, dateRange)
		];

	}*/ else if (req.body.role === 'dp') {

		var timetableObj = parseStudentTimetable(req.body.timetable);

		var allEvents = [
			createDayLabelEvents(timetableObj, dates, cycleDayLabels, dateRange),
			createDayLabelEvents(timetableObj, choicesDates, cycleDayLabels, dateRange),
			createPeriodEvents(timetableObj, dpTimes, dates, dateRange),
			createPeriodEvents(timetableObj, dpChoicesTimes, choicesDates, dateRange),
			createPeriodEvents(choicesTimetable, choicesTime, choicesDates, dateRange),
			//createActivityEvents(req.body.activities, activitiesTimes, dates, dateRange),
			//createActivityEvents(req.body.activities, activitiesTimes, choicesDates, dateRange)
		];

		// var cdates;

		// if (req.body.cycledays != '') {
		// 	cdates = cycledates(req.body.cycledays);
		// } else {
		// 	cdates = convertjson();
		// }

		// var masterstr = generatecsv(req.body.timetable, cdates, req.body.activities, req.body.role);

	} /*else if (req.body.role === 'myp') {

		var timetableObj = parseStudentTimetable(req.body.timetable);

		var allEvents = [
			createDayLabelEvents(timetableObj, dates, cycleDayLabels, dateRange),
			createDayLabelEvents(timetableObj, choicesDates, cycleDayLabels, dateRange),
			createPeriodEvents(timetableObj, mypTimes, dates, dateRange),
			createPeriodEvents(timetableObj, mypChoicesTimes, choicesDates, dateRange),
			createPeriodEvents(choicesTimetable, choicesTime, choicesDates, dateRange),
			createActivityEvents(req.body.activities, activitiesTimes, dates, dateRange),
			createActivityEvents(req.body.activities, activitiesTimes, choicesDates, dateRange)
		];

	}*/

	var masterstr = 'Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location\n';
	allEvents.forEach(function(i) {
		masterstr += convertToCSV(i) + '\n';
	});

	res.set({'Content-Disposition': 'attachment; filename=\'timetable.csv\''});
	res.send(masterstr);
});

module.exports = router;
