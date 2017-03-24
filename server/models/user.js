console.log('users model');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name:  { type: String, required: true, minlength: 2, trim: true},
}, {timestamps: true });

var User = mongoose.model('User', UserSchema);