const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
/*
console.log(__dirname + '/../public');
console.log(publicPath);*/

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('new user connected');

	socket.on('disconnect',()=>{
		console.log('client disconnected');
	});
});


server.listen(port,()=>{
	console.log(`Server up on port: ${port}`);
});