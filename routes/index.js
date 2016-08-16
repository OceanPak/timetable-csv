var express = require('express');
var router = express.Router();

var cycledates = require('../public/javascripts/cycledates.js');
var generatecsv = require('../public/javascripts/generatecsv.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Moongate timetable converter' });
});

router.post('/getcsv', function(req, res, next) {
  var cdates = cycledates(req.body.cycledays);
  var masterstr = generatecsv(req.body.timetable, cdates);

  // res.set({'Content-Disposition': 'attachment; filename=\'timetable.csv\''});
  res.send(masterstr);
});

module.exports = router;
