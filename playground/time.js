const moment = require('moment');



/*
var date = new Date();
var months = ['Jan','Feb'];
console.log(date.getMonth());*/

var createdAt = new Date();

var date = moment(createdAt);
/*date.add(100,'year').subtract(9,'months');
console.log(date.format('MMM Do, YYYY'));
*/
console.log(date.format('hh:mm a'))