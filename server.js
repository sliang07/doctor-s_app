var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var server = app.listen(9001, function(){
	console.log("LISTENING ON PORT OVER 9000 + 1");
});
var mongoose = require('mongoose');
//mongodb://heroku_9db2c9n0:8ba0iab6vlenq24tt5brjd3n2p@ds027483.mongolab.com:27483/heroku_9db2c9n0
var uri = 'mongodb://heroku_9db2c9n0:8ba0iab6vlenq24tt5brjd3n2p@ds027483.mongolab.com:27483/heroku_9db2c9n0'
mongoose.createConnection(uri);
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
