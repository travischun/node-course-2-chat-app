var socket = io();

socket.on('connect',function(){
	console.log("connected to server");

	/*socket.emit('createEmail',{
		to: 'jen@example.com',
		text:'Hello world'
	});*/

	/*socket.emit('createMessage',{
		from: 'hello@example.com',
		text: 'bankai senbonzakura'
	});*/
});

socket.on('disconnect',function(){
	console.log("disconnected from server");
});
/*
socket.on('newEmail',function(email){
	console.log("new email",email);
});
*/
socket.on('newMessage',function(message){
	console.log("New Message: ",message);
});