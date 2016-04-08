var express = require('express');
var path = require('path');
var _ = require('lodash');
var consolidate = require('consolidate'); // 'consolidate' supports multiple templating engines; we'll use handlebars below (just need to be sure to `npm install` it first!)

var app = express();


// APP SETTINGS

// handle views & templates
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// set asset paths
app.use('/photos', express.static(__dirname + '/photos'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));


// CONFIG - load user-defined settings from config.js

var config = require('./config.json');

// then set the app title
app.set('title', config.title);


// JSON DATA for PHOTO TOURS - load this data into app.locals to pass as JSON into the views

app.locals.photo_tours = require("./js/photo_tour_data.json");


// ROUTES

app.get('/', function (req, res) {
  var data = JSON.stringify(req.app.locals.photo_tours);
  res.render('map', {
    photo_tour_json: data,
    lat: config.defaultLat,
    long: config.defaultLong,
    zoom: config.defaultZoomLevel,
    title: config.title,
    subtitle: config.subtitle,
    backgroundColor: config.backgroundColor
  });
});

app.get('/:tour', function (req, res) {
  var data = JSON.stringify(req.app.locals.photo_tours);
  res.render('map', {
    photo_tour_json: data,
    lat: config.defaultLat,
    long: config.defaultLong,
    zoom: config.defaultZoomLevel,
    title: config.title,
    subtitle: config.subtitle,
    primaryFont: config.primaryFont,
    tour_id: req.params.tour
  });
});

app.get('/:tour/photosphere/:image', function (req, res) {
  // Filter with lodash to find image-specific data in the JSON,
  // then get rotation from that to pass to the view.
  // This feels like overkill, but eh.
  var tour_data = _.find(req.app.locals.photo_tours, { tour_id: req.params.tour });
  var photo_data = _.find(tour_data.photos, { filename: req.params.image });
  var photo_rotation = photo_data.rotation;

  res.render('photosphere', {
    src: config.photoPath + req.params.image,
    tour_id: req.params.tour,
    rotation: photo_rotation,
    title: config.title
  });
});

// plan photosphere route for showing un-rotated images outside of tours
app.get('/photosphere/:image', function (req, res) {
  res.render('photosphere', {
    src: config.photoPath + req.params.image,
    title: config.title
  });
});

app.listen(8081, function () {
  console.log('App listening on port 8081!');
});
