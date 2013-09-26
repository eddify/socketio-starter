
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    path = require('path');



app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser())
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next){
    res.status(404).send('404 Resource Not Found')
  });
});


io.sockets.on('connection', function (socket) {
  console.log('Socket IO Started')
  socket.on('ping', function(data) {
      console.log('got ping, sending back pong')
      socket.emit('pong')
  })
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


