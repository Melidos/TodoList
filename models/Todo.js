const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
	name      : {
		type     : String,
		required : true
	},
	user      : {
		type     : String,
		required : true
	},
	completed : {
		type    : Boolean,
		default : false
	},
	date      : {
		type    : Date,
		default : Date.now
	},
	animated  : {
		type    : Boolean,
		default : true
	}
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
