console.log('polls model');
var mongoose = require('mongoose');

var PollVoteSchema = new mongoose.Schema({
	_user: { type: mongoose.Schema.ObjectId, ref:"User"},
	_poll: { type: mongoose.Schema.ObjectId, ref:"Poll"},
	option: { type: String}
});

var PollSchema = new mongoose.Schema({
	question: { type: String, required: true, minlength: 8, trim: true },
	option1: { type: String, required: true, minlength: 3, trim: true },
	option2: { type: String, required: true, minlength: 3, trim: true },
	option3: { type: String, required: true, minlength: 3, trim: true },
	option4: { type: String, required: true, minlength: 3, trim: true },
	option1_vote: { type: Number },
	option2_vote: { type: Number },
	option3_vote: { type: Number },
	option4_vote: { type: Number },
	name: {type: String},
}, { timestamps: true });

var Poll = mongoose.model('Poll', PollSchema);
var PollVote = mongoose.model('PollVote', PollVoteSchema);