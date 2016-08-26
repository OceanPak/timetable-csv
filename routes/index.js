var express = require('express');
var router = express.Router();

var cycledates = require('../controllers/cycledates.js');
var convertjson = require('../controllers/convertjson.js');
var generatecsv = require('../controllers/generatecsv.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Moongate timetable converter' });
});

router.post('/getcsv', function(req, res, next) {
	var cdates;

	if (req.body.cycledays != '') {
		cdates = cycledates(req.body.cycledays);
	} else {
		cdates = convertjson();
	}

  var masterstr = generatecsv(req.body.timetable, cdates, req.body.activities, req.body.role);

  res.set({'Content-Disposition': 'attachment; filename=\'timetable.csv\''});
  res.send(masterstr);
});

module.exports = router;
