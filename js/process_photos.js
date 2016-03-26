var fs = require('fs');

var photos = [];

/*
fs.readdirSync('../images/', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
        // do something with each file HERE!
        console.log(file);

        if (file.abm_latLong) {
          console.log(file.abm_latLong);
  				var position = file.abm_latLong[0].split(',');
  				photos.push({
  					lat: position[0],
  					lng: position[1]
  				});
  			}
    });
});

//module.exports = photos;
*/

fs.readdir("/photos", function(err, items) {
    for (var i=0; i<items.length; i++) {
        var file = path + '/' + items[i];
        console.log("Start: " + file);

        fs.stat(file, function(err, stats) {
            console.log(file);
            console.log(stats["size"]);
        });
    }
});
