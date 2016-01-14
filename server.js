
var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express');
    bodyParser = require('body-parser');

var port = 61322;

var options = {
    key: fs.readFileSync('bar/certs/localhost.key'),
    cert: fs.readFileSync('bar/certs/localhost.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

var app = express();

app.use(bodyParser.json())

var server = https.createServer(options, app).listen(port, function(){
  fs.writeFileSync("bar/playing/log", "Express server listening on port" + port + "\n\n");
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

var updateTimeouts = {
  "soundcloud": null,
  "youtube": null
}
app.get('/', function (req, res) {

  clearTimeout(updateTimeouts[req.query.host])
  updateTimeouts[req.query.host] = setTimeout(function(){
    fs.writeFileSync("bar/playing/" + req.query.host, "");
  }, 5000);

  if(req.query.playing){
    fs.writeFileSync("bar/playing/" + req.query.host, req.query.track);
  } else {
    fs.writeFileSync("bar/playing/" + req.query.host, "");
  }
  res.writeHead(200);
  res.end("hello world");
});
