const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{
	var users;

	beforeEach(()=>{
		users = new Users();
		users.users = [{
			id: '1',
			name: 'mike',
			room: 'node'
		},
		{
			id: '2',
			name: 'hello',
			room: 'bankai'
		},
		{
			id: '3',
			name: 'byakyua',
			room: 'node'
		}];
	});

	it('should add new user',()=>{
		var users = new Users();
		var user = {
			id: '123',
			name: 'Travis',
			room: 'The office'
		};

		var res = users.addUser(user.id,user.name,user.room);
		expect(users.users).toEqual([user]);
	});
	it('should return names for node',()=>{
		var userlist = users.getUserList('node');
		expect(userlist).toEqual(['mike','byakyua']);
	});
	it('should return names for bankai',()=>{
		var userlist = users.getUserList('bankai');
		expect(userlist).toEqual(['hello']);
	});
	it('should remove a user',()=>{
		var id = '1';
		var user = users.removeUser(id);
		expect(users.users.length).toBe(2);
		expect(user.id).toBe(id);
	});
	it('should not remove a user',()=>{
		var id = '4';
		var user = users.removeUser(id);
		expect(users.users.length).toBe(3);
		expect(user).toNotExist();
	});
	it('should get a user',()=>{
		var id = '2';
		var user = users.getUser(id);
		expect(users.users.length).toBe(3);
		expect(user.id).toBe(id);
	});
	it('should not get a user',()=>{
		var id = '4';
		var user = users.getUser(id);
		expect(user).toNotExist();
	});


});