const expect = require('expect');
const {isRealString} = require('./validation');
//import isRealString

describe('isREalString',()=>{
	it('should reject non string',()=>{
		var notStr = 123;
		var res = isRealString(notStr);
		expect(res).toBe(false);
	
	});
	it('should reject only spaces',()=>{
		var spaces = '   ';
		var res = isRealString(spaces);
		expect(res).toBe(false);
	});
	it('should accept a valid string',()=>{
		var str = 'hello';
		var res = isRealString(str);
		expect(res).toBe(true);	
	})
	

});