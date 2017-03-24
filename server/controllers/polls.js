var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var PollVote = mongoose.model('PollVote');

module.exports = {
	// Data.find( { $query: { user: req.user }, $orderby: { dateAdded: -1 } } function ( results ) {
	index: function(req,res){
		console.log("Polls.Index");
		Poll.find({}).sort('-createdAt').exec(function ( err, data ) {
			console.log("Index Data:", data);
			res.json(data);
		});
	},
	getPoll: function(req,res){
		console.log("Polls.getPoll");
		Poll.findOne({_id: req.params.id}, function ( err, data ) {
			console.log("getPoll Data:", data);
			res.json(data);
		});
	},
	create: function(req,res){
		console.log("Received create request:", req.body);
		var poll = new Poll(req.body);
		poll.option1_vote = 0;
		poll.option2_vote = 0;
		poll.option3_vote = 0;
		poll.option4_vote = 0;
		poll.save( function ( err ) {
			if(err)
			{
				console.log('something went wrong');
				console.log(err.message);
				res.json(err);
			}
			else
			{
				res.json(poll);
			}
		});
	},
	vote: function(req,res){
		console.log("Received Vote request:", req.params, req.body);
		var OPT = "option" + req.body.data.option + "_vote";
		Poll.findOne({_id: req.params.id}, function ( err, data ) {
			console.log(err, data);
			if(err)
			{
				console.log('something went wrong');
				console.log(err.message);
				res.json(err);
			}
			else
			{
				
				PollVote.findOne({_user: req.body.data._user, _poll: req.body.data._poll}, function ( err, voteRecord ) {
					console.log(err, voteRecord);
					if( voteRecord ){
						res.json({errors: {pollVote: { message: "You have already voted! You picked #" + voteRecord.option}}})
					}
					else {
						console.log(data[OPT]);
						if( !data[OPT] ){
							data[OPT] = 1;
						}
						else{
							data[OPT] += 1;
						}
						data.save();
						var pv = new PollVote(req.body.data);
						pv.save();
						res.json(data);
					}
				});
				
			}
		});
	},
	delete: function(req,res){
		Poll.remove({_id:req.params.id}, function(err, data) {
			console.log("Error:", err);
			res.json(err);
		});
	},
};