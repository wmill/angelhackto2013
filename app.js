var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


var express = require('express');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use(express.bodyParser());

var hbs = require('hbs');

//hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/boiler_plate.hbs', 'utf8'));

var items = require('./items.js');

var tvs = {};

server.listen(80);

app.get('/', function (req, res) {
	res.writeHead(302, {
		'Location': '/tv/'
	});
	res.end();
});


app.get('/tv/', function (req, res){
	//input the tv code
	res.locals = {'ids': Object.keys(tvs)};
	console.log(res.locals);
	res.render('enter_tv_id');
});

app.post('/tv/', function (req, res){
	var tv_id = req.body.tv_id;
	res.writeHead(302, {
		'Location': '/tv/' + tv_id
	});
	res.end();
});

app.get('/tv/:tv_id', function (req, res){
	//req.params.tv_id
	var tv_id = req.params.tv_id;
	//create the socket if it doesn't exist
	if (!(tv_id in tvs)) {
		tvs[tv_id] = io.of('/tv_sockets/' + tv_id);
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
		console.log('bad tv_id: ', tv_id);
		res.render('enter_tv_id');
		return;
	}
	//fetch item info some how
	var item_details  = items.items[parseInt(req.params.item_id, 10)];
	tvs[tv_id].emit('show_item', item_details);

	res.render('item_sent');
});

