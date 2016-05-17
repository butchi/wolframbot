var express = require('express');
var http = require('http');
var path = require('path');
var url = require('url');

var app = expres();
var server = http.createServer(app);

var _ = require('lodash');
var shortid = require('shortid');
var Puid = require('puid');
var cookie = require('cookie');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');

var mongo_builder = require('./lib/mongo_builder');

var cookiePuid = new Puid();
var hiddenKeyPuid = new Puid();

const host = '127.0.0.1';
const dbName = 'nodedb';
const dbPath = `mongodb://${host}/${dbName}`;

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

mongo_builder.ready(dbName, function(db){
  console.log('db: ', db);
  db.collection('users', (err, collection) => {
    collection.find().toArray((err, items) => {
      console.log('items: ', items);
    });
  });
});

server.listen(app.get('port'), process.env.HOST, function(){
  console.log("Express server listening on port " + app.get('port'));
});
