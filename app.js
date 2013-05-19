var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var chat;

var tvs = {};

server.listen(8000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/bacon', function (req, res){
	chat.emit("bacon", {'tasty' : true});
	res.sendfile(__dirname + '/index.html');
});

app.get('/tv/:tv_id', function (req, res){
	//req.params.tv_id
	var tv_id = req.params.tv_id;
	//create the socket if it doesn't exist
	if (!(tv_id in tvs)) {
		tvs[tv_id] = io.of('/tv/' + tv_id);
	}
});

chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });