// Convert cycle dates to dictionary

module.exports = function(cycledays) {
  var stod = {
    Jan: [0, 2017],
    Feb: [1, 2017],
    Mar: [2, 2017],
    Apr: [3, 2017],
    May: [4, 2017],
    Jun: [5, 2017],
    Jul: [6, 2017],
    Aug: [7, 2016],
    Sep: [8, 2016],
    Oct: [9, 2016],
    Nov: [10, 2016],
    Dec: [11, 2016]
  };
  
  var lines = cycledays.split("\r\n");
  
  var cycledates = {};
  
  for (var i = 0; i < lines.length; i++) {
    var s = lines[i].split("\t");
    
    var day = s[0].split(" ")[1];
    
    var dates = s[1].split("   ");
    
    for (var j = 0; j < dates.length; j++) {
      if (dates[j] == "") {
        dates.splice(j, 1);
      }
    }
    
    var odatearr = [];
    
    for (var j = 0; j < dates.length; j++) {
      var comps = dates[j].split(" ");
      var y = stod[comps[2]][1];
      var m = stod[comps[2]][0];
      var d = parseInt(comps[1], 10);
      var odate = new Date(y, m, d);
      
      odatearr.push(odate);
    }
    
    cycledates[day] = odatearr;
  }
  
  return cycledates;
};