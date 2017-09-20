//addUser(id,name,room)

//removeUser(id)

//getUser(id)

//getUserList(room)

class Users{
	constructor(){
		this.users = [];
	}

	addUser(id,name,room){
		
		var user = {
			id: id,
			name: name,
			room:room
		}
		this.users.push(user);
		return user;
	}
	removeUser(id){
		var user = this.users.filter((user,index)=>{
			if(user.id === id)
			{
					this.users.splice(index,1);
					return user;
			}
		});

		return user[0];
	}
	getUser(id){
		
		var user = this.users.filter((user)=>{
			return user.id === id;
		});
		return user[0];
	}
	getUserList(room){

		var users = this.users.filter((user)=>{
			return user.room === room;
		});

		var namesArray = users.map((user)=>{
			return user.name;
		});
		return namesArray;
	}

}


module.exports = {
	Users: Users
};
/*
class Person {

	constructor(name,age){
		this.name = name;
		this.age = age;
	}

	getUserDescription(){
		return `${this.name} am ${this.age} year old`;
	}
}

var me = new Person('hello',25);
var description = me.getUserDescription();
console.log(description);*/
