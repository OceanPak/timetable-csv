var express = require('express');
var router = express.Router();

var cycledates = require('../controllers/cycledates.js');
var convertjson = require('../controllers/convertjson.js');
var generatecsv = require('../controllers/generatecsv.js');

var parseTeacherTimetable = require('./logic/parseTeacherTimetable.js');
var createDays = require('./logic/createDays.js');
var createChoices = require('./logic/createChoices.js')
var convertToCSV = require('./logic/convertToCSV.js');
var teacherTimes = require('./resources/teacherTimes.json');
var teacherChoicesTimes = require('./resources/teacherChoicesTimes.json');
var dates = require('./resources/dates.json');
var choicesDates = require('./resources/choicesDates.json');
var cycleDayLabels = require('./resources/cycleDayLabels.json');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Moongate timetable converter' });
});

router.post('/getcsv', function(req, res, next) {
	if (req.body.role === 'teacher') {
		var timetableObj = parseTeacherTimetable(req.body.timetable);
		var eventsNormal = createDays(timetableObj, teacherTimes, dates, cycleDayLabels);
		var eventsChoicesDays = createDays(timetableObj, teacherChoicesTimes, choicesDates, cycleDayLabels);
		var eventsChoices = createChoices(teacherChoicesTimes, choicesDates);
		var masterstr = 'Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location\n';
		masterstr += convertToCSV(eventsNormal) + '\n' + convertToCSV(eventsChoices) + '\n' + convertToCSV(eventsChoicesDays);
	} else {
		var cdates;

		if (req.body.cycledays != '') {
			cdates = cycledates(req.body.cycledays);
		} else {
			cdates = convertjson();
		}

		var masterstr = generatecsv(req.body.timetable, cdates, req.body.activities, req.body.role);
	}


	res.set({'Content-Disposition': 'attachment; filename=\'timetable.csv\''});
	res.send(masterstr);
});

module.exports = router;
