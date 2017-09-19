var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
	it('should generate the correct message object',()=>{
		var from = 'me';
		var text = 'some message';
		var message = generateMessage(from,text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from: from,
			text: text
		});
		//expect(message.from).toBe(from);
		//expect(message.text).toBe(text);
	});
});

describe('generateLocationMessage',()=>{
	it('should generate correct location object',()=>{
		var from = 'me';
		var lat = 1;
		var long =1;
		var message = generateLocationMessage(from,lat,long);

		expect(message.from).toBe(from);
		expect(message.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);

	});
});