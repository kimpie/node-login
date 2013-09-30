var express = require('express');
var fs = require('fs');
var http = require('http');
var htmlfile = "test2.html";
var app = express();
//var server = require('http').createServer(app)
//var io = require('socket.io').listen(server);

app.get('/', function(request, response) {
  var html = fs.readFileSync(htmlfile).toString();
  response.send(html);
});

// beginning of app.js
app.configure('development', function(){
	app.set('port', 8080);
	app.set('views', __dirname + '/app/server/views');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
//	app.use(express.favicon());
//	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'super-duper-secret-secret' }));
	app.use(express.methodOverride());
	app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
	app.use(express.static(__dirname + '/app/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

require('./app/server/router')(app);

// end of app.js

var htmlfilelogin = "login.html";

app.get('/login.html', function (request,response) {
	var launchthis = "app.js";
	app.get('.app/server/router', function (req, res) {
		res.send(launchthis);
	});
	var html = fs.readFileSync(htmlfilelogin).toString();
	response.send(html);
});

var htmlfileabout = "testabout.html";

app.get('/testabout.html', function(request,response) {
	var html = fs.readFileSync(htmlfileabout).toString();
	response.send(html);	
});


http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
})