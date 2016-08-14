var express = require('express');
var router = express.Router();

var cycledates = require('../logic/cycledates.js');
var generatecsv = require('../logic/generatecsv.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Moongate timetable converter' });
});

router.post('/getcsv', function(req, res, next) {
  var cdates = cycledates(req.body.cycledays);
  var masterstr = generatecsv(req.body.timetable, cdates);
  
  res.set({'Content-Disposition': 'attachment; filename=\'timetable.csv\''});
  res.send(masterstr);
});

module.exports = router;
