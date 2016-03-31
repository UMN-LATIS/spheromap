var express = require('express');
var path = require('path');
var _ = require('lodash');
var consolidate = require('consolidate'); // 'consolidate' supports multiple templating engines; we'll use handlebars below (just need to be sure to `npm install` it first!)

var app = express();


// APP SETTINGS

app.set('title', 'China 2016');

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/photos', express.static(__dirname + '/photos'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));


// CONFIG - to load user-defined settings from config.js

var config = require('./config.json');


// JSON DATA for PHOTO TOURS - load into app.locals to pass as JSON into the views

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
    backgroundColor: config.backgroundColor,
    tour_id: req.params.tour
  });
});

/*
app.get('/photosphere/:image', function (req, res) {
  res.render('photosphere', { src: '/photos/' + req.params.image });
});
*/

app.get('/:tour/photosphere/:image', function (req, res) {
  res.render('photosphere', { src: '/photos/' + req.params.image, tour_id: req.params.tour });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
