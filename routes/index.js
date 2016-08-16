var express = require('express');
var router = express.Router();

var cycledates = require('../public/javascripts/cycledates.js');
var convertjson = require('../public/javascripts/convertjson.js');
var generatecsv = require('../public/javascripts/generatecsv.js');

var jdates = require('../public/json/cdates.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Moongate timetable converter' });
});

router.post('/getcsv', function(req, res, next) {
	var cdates;

	if (req.body.cycledays != '') {
		cdates = cycledates(req.body.cycledays);
	} else {
		cdates = convertjson(jdates);
	}

  var masterstr = generatecsv(req.body.timetable, cdates);

  res.set({'Content-Disposition': 'attachment; filename=\'timetable.csv\''});
  res.send(masterstr);
});

module.exports = router;
