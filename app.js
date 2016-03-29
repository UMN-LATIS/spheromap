var express = require('express');
var path = require('path');
var _ = require('lodash');
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
app.use('/node_modules', express.static(__dirname + '/node_modules'));


// app.locals

app.locals.photo_tours = require("./js/photo_tour_data.json");
//var photo_tours = require("./js/parse_tours.js");
//console.log(photo_tours);


// Express Router info: https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4

app.get('/', function (req, res) {
  var data = JSON.stringify(req.app.locals.photo_tours);
  res.render('map', { photo_tour_json: data, lat: 39.9457, long: 116.4112 });
});

/*
app.get('/tour/:lat\::long', function (req, res) {
  var lat = parseFloat(req.params.lat);
  var long = parseFloat(req.params.long);
  var data = JSON.stringify(req.app.locals.photo_tours);
  res.render('map', { photo_tour_json: data, lat: lat, long: long });
});
*/

app.get('/:tour', function (req, res) {
  var tour_data = _.find(req.app.locals.photo_tours, { "tour_id": req.params.tour });
  console.log(tour_data);
  var data = JSON.stringify(req.app.locals.photo_tours);
  res.render('map', { photo_tour_json: data, lat: 39.9457, long: 116.4112 });
});

app.get('/photosphere/:image', function (req, res) {
  res.render('photosphere', { src: '/photos/' + req.params.image });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
