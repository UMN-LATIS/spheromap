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
  res.render('map');
});

app.get('/photosphere/:image', function (req, res) {
  res.render('photosphere', { js: '/js/scripts.min.js', src: '/photos/' + req.params.image, portkey_texture: '/assets/china-pattern-design.jpg' });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
