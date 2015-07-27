var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var server = app.listen(9001, function(){
	console.log("LISTENING ON PORT OVER 9000 + 1");
});
var mongoose = require('mongoose');
// mongodb://heroku_qr70rcj2:sbfv0lihbd101cbdq3vgtqk1fa@ds061751.mongolab.com:61751/heroku_qr70rcj2
var uri = 'mongodb://heroku_qr70rcj2:sbfv0lihbd101cbdq3vgtqk1fa@ds061751.mongolab.com:61751/heroku_qr70rcj2'
mongoose.connect(uri)
var io = require('socket.io').listen(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./client")));
app.set('view engine', 'html');
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

var users = {};
io.sockets.on('connection', function (socket){
	console.log('USING TEH SOCKETS NAO');
	// console.log(socket.id);
	socket.on('chat_connect', function(data){
		users[socket.id] = data;
	socket.broadcast.emit('user_joined', {name: data});
	io.sockets.emit('user_list', {list: users});
	})
	socket.on('disconnect',function(data){
		data = users[socket.id];
		delete users[socket.id];
		socket.broadcast.emit('user_left', {name: data});
		console.log("STOPPED USING TEH SOCKETS");
		io.sockets.emit('user_list', {list: users});
	})
	socket.on('msg_sent', function(data){
		io.emit('msg_display', {name: users[socket.id], msg: data});	
	})
});
