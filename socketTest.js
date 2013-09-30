var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
  var htmlfile = "socketT.html";


server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socketT.html');
});

app.get('/', function(request, response) {
  var html = fs.readFileSync(htmlfile).toString();
  response.send(html);
});


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});