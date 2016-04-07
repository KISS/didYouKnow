var Twitter    = require('twitter-node-client').Twitter;
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var https      = require('https');

// Callback functions
var error = function (err, response, body) {
  console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
  console.log('Data [%s]', data);
};

// Oauth details
var config = {
  "consumerKey": "XXX",
  "consumerSecret": "XXX",
  "accessToken": "XXX",
  "accessTokenSecret": "XXX"
}

var twitter = new Twitter(config);

// App Config
app.use(bodyParser.json()); // support for` JSON-encoded bodies
app.use(bodyParser.urlencoded({ // support for URL-encoded bodies
  extended: true
}));
app.use(express.static('../public')); // folder angular app is in


// App Endpoints
// send search request (depends on TwitterSearch):
app.post('/twitter/search', function (req, res) {
  if (req.body.filterQ) {
    var searchEntered = '-RT%20%23'+req.body.filterQ;
    var data = twitter.getSearch({ q: searchEntered, count: '1'}, function(error, response, body){
      res.status(404).send({
        "error" : "Search Not Found"
      });
    }, function(data){
      res.send({
        result : {
          "userData" : data
        }
      });
    });
  }
});

// Server
var port   = process.env.PORT || 8085;
var server = app.listen(port, function() {
  console.log('Server running on port: ' + port);
});