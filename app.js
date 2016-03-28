var express = require('express');
var path = require('path');
var consolidate = require('consolidate'); // 'consolidate' supports multiple templating engines; we'll use mustache below (just need to be sure to `npm install` it first!)

var app = express();

// App settings

app.set('title', 'China 2016');

app.engine('html', consolidate.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/photos', express.static(__dirname + '/photos'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js', express.static(__dirname + '/js'));

// Express Router info: https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4

app.get('/', function (req, res) {
  var photo_tour_data = require("./photo_tour_data.json");
  var photo_tour_data = JSON.stringify(photo_tour_data);
  res.render('map', { photo_tour_json: photo_tour_data });
});

app.get('/photosphere/:image', function (req, res) {
  res.render('photosphere', { src: '/photos/' + req.params.image });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
