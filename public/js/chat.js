var socket = io();


function scrollToBottom(){
	//selectors
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');
	//heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();


	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}

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
	var formattedTime = moment(message.createdAt).format('h:mm a');

	var template = $('#message-template').html();
	var html = Mustache.render(template,{
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	$('#messages').append(html);
	scrollToBottom();
	/*
	console.log("New Message: ",message);
	var li = $('<li></li>');
	li.text(`${formattedTime} ${message.from}: ${message.text}`);

	$('#messages').append(li);*/
});

socket.on('newLocationMessage',function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');

	var template = $('#location-message-template').html();
	var html = Mustache.render(template,{
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	});

	$('#messages').append(html);
	scrollToBottom();
	/*var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');
	li.text(`${formattedTime} ${message.from}: `);
	a.attr('href',message.url);

	li.append(a);
	$('#messages').append(li);*/
});

$('#message-form').on('submit',function(e){
	e.preventDefault();

	var messageTextbox = $('[name=message]');
	socket.emit('createMessage',{
		from: "user",
		text: messageTextbox.val()
	},function(){
		messageTextbox.val('');
	});
});

var locationButton = $('#send-location');
locationButton.on('click',function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser');
	}

	locationButton.attr('disabled','disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	},function(){
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
	});
});


