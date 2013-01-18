
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , mongoose = require('mongoose');

var db = mongoose.createConnection('DB Host', 'DB Name');

var schema = new mongoose.Schema({payload:'string', jobid:'string'});
var Jobs = db.model('Jobs', schema);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.post('/gridvid', function(req, res) {  
  var newJob = new Jobs();
  newJob.payload = JSON.stringify(req.body);
  newJob.jobid = newJob._id;
  newJob.save();
  
  res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
