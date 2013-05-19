var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

var hbs = require('hbs');

var tvs = {};

server.listen(8000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


app.get('/tv/', function (req, res){
	//input the tv code
	res.render('enter_tv_id');
});

app.get('/tv/:tv_id', function (req, res){
	//req.params.tv_id
	var tv_id = req.params.tv_id;
	//create the socket if it doesn't exist
	if (!(tv_id in tvs)) {
		tvs[tv_id] = io.of('/tv/' + tv_id);
	}
	//need to pass params to template, 
	res.locals = {'tv_id': tv_id};
	res.render('tv');
});

app.get('/tv/:tv_id/item/:item_id', function (req, res){
	//req.params.tv_id
	var tv_id = req.params.tv_id;
	//create the socket if it doesn't exist
	if (!(tv_id in tvs)) {
		console.log('bad tv_id: ', tv_id)
		res.render('enter_tv_id');
		return;
	}
	//fetch item info some how
	var item_details  = {"stuff":""}
	tvs[item_id].emit('show_item', item_details)
	//need to pass params to template, 
	res.render('item_sent')
});

