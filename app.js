var express = require('express');
var http = require('http');
var path = require('path');
var url = require('url');

var app = express();
var server = http.createServer(app);

var _ = require('underscore');
var parseString = require('xml2js').parseString;
var request = require('request');
var readConfig = require('read-config');

// var mongo_builder = require('./lib/mongo_builder');

// const host = '127.0.0.1';
// const dbName = 'nodedb';
// const dbPath = `mongodb://${host}/${dbName}`;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.static(path.join(__dirname, 'public')));

// mongo_builder.ready(dbName, function(db){
//   console.log('db: ', db);
//   db.collection('users', (err, collection) => {
//     collection.find().toArray((err, items) => {
//       console.log('items: ', items);
//     });
//   });
// });

config = readConfig('./config.json');

var input;
input = 'pi';
// input = '18782 + 18782';
// input = 'Fibonacci[10]';

var url = `http://api.wolframalpha.com/v2/query?input=${encodeURIComponent(input)}&appid=${config.appid}`;

request.get(url, function (err, res, body) {
  if (!err && res.statusCode == 200) {
    parseString(body, function (err, res) {
      var decimalApproximation;
      var result;
      res.queryresult.pod.forEach((elm) => {
        if(elm.$.id === 'DecimalApproximation') {
          decimalApproximation = elm.subpod[0].plaintext[0];
        }
        if(elm.$.id === 'Result') {
          result = elm.subpod[0].plaintext[0];
        }
      });

      console.log(result || decimalApproximation);
    });
  }
});

server.listen(app.get('port'), process.env.HOST, function(){
  console.log("Express server listening on port " + app.get('port'));
});
