const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
/*
console.log(__dirname + '/../public');
console.log(publicPath);*/

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('new user connected');

	/*socket.emit('newEmail',{
		from: 'mike@example.com',
		text: 'Hello ',
		createAt: 123
	});
	
	socket.on('createEmail',(newEmail)=>{
		console.log('createEmail',newEmail);
	});*/

/*	socket.emit('newMessage',{
			from: 'hello@example.com',
			text:"bankai",
			createdAt: 123
		});*/
	
	
	socket.on('disconnect',()=>{
		console.log('client disconnected');
		var user = users.removeUser(socket.id);

		if(user){
			io.to(user.room).emit('updateUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the chat`));
		}
	});

	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room))
		{
			return callback('Name and room name are required');
		}

		socket.join(params.room);
		//socket.leave
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.room);

		io.to(params.room).emit('updateUserList',users.getUserList(params.room));
		socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined the chat`));

		callback();
	});


	socket.on('createMessage',(message,callback)=>{
		var user = users.getUser(socket.id);
		/*socket.broadcast.emit('newMessage',{
			from:message.from,
			text:message.text,
			createdAt:new Date().getTime()
		});*/
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));	
		}
		callback();
	});

	socket.on('createLocationMessage',(coords)=>{
		
		var user = users.getUser(socket.id);
		if(user){
			io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));	
		}
		
	});
});




server.listen(port,()=>{
	console.log(`Server up on port: ${port}`);
});