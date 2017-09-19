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
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	$('#messages').append(li);
});


$('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		from: "user",
		text: $('[name=message]').val()
	},function(){

	});
});